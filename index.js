const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./settings/connectDB");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const rideRouter = require("./routes/ride");
const ticketRouter = require("./routes/ticket");
const ticketReplyRouter = require("./routes/ticketReply");
const authMiddleware = require("./middleware/auth");

const PORT = process.env.PORT;

connectDB()
  .then(() => console.log("Connected to Mongodb..."))
  .catch((error) => console.error(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));

app.use("/auth", authRouter);
app.use("/users", authMiddleware, userRouter);
app.use("/ride", authMiddleware, rideRouter);
app.use("/ticket", authMiddleware, ticketRouter);
app.use("/ticketReply", authMiddleware, ticketReplyRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
