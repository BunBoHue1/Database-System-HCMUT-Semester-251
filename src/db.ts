import sql, { ConnectionPool, config as SqlConfig } from "mssql";

const config: SqlConfig = {
  user: "Kien",
  password: "12345678",
  server: "localhost",
  database: "QL_SHOPEE_BTL",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function connectToDB(): Promise<ConnectionPool> {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Đã kết nối SQL Server thành công!");
    return pool;
  } catch (err) {
    console.log("❌ Lỗi kết nối CSDL:", err);
    throw err;
  }
}

export { sql };
