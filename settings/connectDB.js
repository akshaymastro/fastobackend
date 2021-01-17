const mongoose = require("mongoose");
const { DB_USERNAME, DB_PASS, DB_NAME } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USERNAME}:${DB_PASS}@cluster0.ft1no.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    return error;
  }
};

module.exports = connectDB;
