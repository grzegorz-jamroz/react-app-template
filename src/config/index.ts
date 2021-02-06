const env = process.env.NODE_ENV || "development";

const baseConfig = {
  isDev: env === "development" || env === "dev",
};

let envConfig = {};

switch (env) {
  case "prod":
  case "production":
    envConfig = require("./prod").config;
    break;
  case "dev":
  case "development":
  default:
    envConfig = require("./dev").config;
}

export default {
  ...baseConfig,
  ...envConfig,
};
