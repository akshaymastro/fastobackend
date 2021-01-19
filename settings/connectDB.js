const mongoose = require("mongoose");
const { DB_USERNAME, DB_PASS, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    return error;
  }
};

module.exports = connectDB;
