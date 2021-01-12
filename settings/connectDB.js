const mongoose = require("mongoose");
const { DB_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
};

module.exports = connectDB;
