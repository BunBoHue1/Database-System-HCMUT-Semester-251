import sql, { ConnectionPool, config as SqlConfig } from "mssql";

const getConfig = (): SqlConfig => {
  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT || "1433"),
    options: {
      encrypt: false, // Tắt mã hóa nếu chạy localhost
      trustServerCertificate: true,
    },
  };
};

export async function connectToDB(): Promise<ConnectionPool> {
  try {
    const config = getConfig();

    if (
      !config.user ||
      !config.password ||
      !config.server ||
      !config.database
    ) {
      throw new Error("❌ Thiếu biến môi trường! Hãy kiểm tra file .env");
    }
    const pool = await sql.connect(config);
    console.log("✅ Đã kết nối SQL Server thành công!");
    return pool;
  } catch (err) {
    console.log("❌ Lỗi kết nối CSDL:", err);
    throw err;
  }
}

export { sql };
