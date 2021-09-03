require("dotenv/config");
module.exports = {
  dialect: process.env.DB_DIALECT || "mysql",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "DEV1@jssolucoes",
  database: process.env.DB_DATABASE || "masseygame_dev",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    // logging: process.env.DEBUG || false,
  },
};
