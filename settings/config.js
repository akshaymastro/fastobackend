const dotenv = require("dotenv");

dotenv.config();

module.children = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

// module.exports = {
//   endpoint: process.env.API_URL,
//   masterKey: process.env.API_KEY,
//   port: process.env.PORT,
// };
