import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import path from "path";
import { connectToDB } from "./db";
import { sql } from "./db";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req: Request, res: Response) => {
  res.render("index", { message: "Hello World from TypeScript & Tailwind!" });
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const pool = await connectToDB();

    const result = await pool?.request().query("SELECT * FROM [USER]");

    res.render("users", {
      users: result?.recordset || [],
      message: "Fetch user successfully!",
    });
  } catch (err: any) {
    console.error("Error fetching user:", err);
    res.render("index", {
      message: "Error connecting Database:" + err.message,
    });
  }
});

app.get("/report/vip", async (req: Request, res: Response) => {
  const year = req.query.year ? parseInt(req.query.year as string) : 2025;
  const minSpend = req.query.minSpend
    ? parseFloat(req.query.minSpend as string)
    : 100;

  try {
    const pool = await connectToDB();

    const result = await pool
      ?.request()
      .input("Year", sql.Int, year)
      .input("Min_Spending", sql.Decimal(15, 2), minSpend)
      .execute("SP_Get_Potential_Vip_Users");

    res.render("vip-report", {
      results: result?.recordset || [],
      query: { year, minSpend },
      error: null,
    });
  } catch (err: any) {
    console.log("Error report:", err.message);
    res.render("vip-report", {
      results: [],
      query: { year, minSpend },
      error: err.message,
    });
  }
});

app.get("/recommendation", async (req: Request, res: Response) => {
  const customerId = req.query.customerId
    ? parseInt(req.query.customerId as string)
    : null;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

  let products = [];
  let error = null;

  if (customerId) {
    try {
      const pool = await connectToDB();

      const result = await pool
        ?.request()
        .input("customerID", sql.Int, customerId)
        .input("limitRange", sql.Int, limit)
        .query(
          "SELECT dbo.ProductRecommendationEngine(@customerID, @limitRange) AS JsonOutput"
        );

      const jsonString = result?.recordset[0].JsonOutput;

      if (jsonString) {
        const parsedData = JSON.parse(jsonString);

        if (parsedData.status === true) {
          products = parsedData.recommendedProducts;
        } else {
          error = parsedData.message || "Error not found (system).";
        }
      }
    } catch (err: any) {
      console.error("Error recommendation:", err.message);
      error = "Error: " + err.message;
    }
  }
  res.render("recommendation", {
    products,
    error,
    query: { customerId, limit },
  });
});

app.get("/user/add", (req, res) => {
  res.render("user-form", { user: {}, isEdit: false, error: null });
});

app.post("/user/add", async (req: Request, res: Response) => {
  const {
    ID_number,
    Phone_number,
    Email,
    Full_name,
    Gender,
    Birthday,
    Account_status,
  } = req.body;

  try {
    const pool = await connectToDB();

    await pool
      ?.request()
      .input("ID_number", sql.VarChar, ID_number)
      .input("Phone_number", sql.VarChar, Phone_number)
      .input("Email", sql.VarChar, Email)
      .input("Full_name", sql.VarChar, Full_name)
      .input("Gender", sql.VarChar, Gender)
      .input("BirthDay", sql.Date, Birthday ? new Date(Birthday) : null)
      .input("Account_status", sql.VarChar, Account_status)
      .input("Entity_ID", sql.Int, 1)
      .execute("usp_User_Insert");

    res.redirect("/users");
  } catch (err: any) {
    console.error("Error add new user:", err.message);
    res.render("user-form", {
      user: req.body,
      isEdit: false,
      error: err.message,
    });
  }
});

app.get("/user/edit/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const pool = await connectToDB();

    const result = await pool
      ?.request()
      .input("id", sql.Int, userId)
      .query("SELECT * FROM [USER] WHERE User_ID = @id");

    if (result.recordset.length === 0) {
      return res.send("User not found");
    }

    res.render("user-form", {
      user: result?.recordset[0],
      isEdit: true,
      error: null,
    });
  } catch (err: any) {
    res.send("Error: " + err.message);
  }
});

app.post("/user/edit/:id", async (req, res) => {
  const userId = req.params.id;
  const {
    ID_number,
    Phone_number,
    Email,
    Full_name,
    Gender,
    Birthday,
    Account_status,
  } = req.body;

  try {
    const pool = await connectToDB();

    await pool
      ?.request()
      .input("User_ID", sql.Int, userId)
      .input("ID_number", sql.VarChar, ID_number)
      .input("Phone_number", sql.VarChar, Phone_number)
      .input("Email", sql.VarChar, Email)
      .input("Full_name", sql.VarChar, Full_name)
      .input("Gender", sql.VarChar, Gender)
      .input("BirthDay", sql.Date, Birthday ? new Date(Birthday) : null)
      .input("Account_status", sql.VarChar, Account_status)
      .input("Entity_ID", sql.Int, 1)
      .execute("usp_User_Update");

    res.redirect("/users");
  } catch (err: any) {
    console.log(err);
    res.render("user-form", {
      user: { User_ID: userId, ...req.body },
      isEdit: true,
      error: err.message,
    });
  }
});

app.post("/user/delete/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const pool = await connectToDB();
    await pool
      ?.request()
      .input("User_ID", sql.Int, userId)
      .execute("usp_User_Delete");

    res.redirect("/users");
  } catch (err: any) {
    res.send(
      `<script>alert("${err.message}"); window.location.href="/users";</script>`
    );
  }
});

// Chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
