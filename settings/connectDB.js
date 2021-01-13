const mongoose = require("mongoose");
const { DB_URL, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
};

module.exports = connectDB;
