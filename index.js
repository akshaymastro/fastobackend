require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const DriverModel = require("./model/Driver.model");
const UserModel = require("./model/User.model");
var server = require("http").createServer(app);
var io = require("socket.io")(server);
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./settings/connectDB");
const JWT = require("./helpers/jwt");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const driverRouter = require("./routes/driver");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const rideRouter = require("./routes/ride");
const ticketRouter = require("./routes/ticket");
const ticketReplyRouter = require("./routes/ticketReply");
const authMiddleware = require("./middleware/auth");
const vehicalRouter = require("./routes/vehical");
const offerRouter = require("./routes/offer");
const categoryRouter = require("./routes/category");
const paymentRoute = require("./routes/payment");
const goodsRouter = require("./routes/category");
const imageRouter = require("./routes/image");
const cityRouter = require("./routes/city");
const errorHandler = require("./utils/globalErrorHandler");
const userController = require("./controllers/users");
const baseRouter = require("./routes/base");
const { PORT } = process.env;

connectDB()
  .then(() => console.log("Connected to Mongodb..."))
  .catch((error) => console.error(error));

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
//app.listen(5681);
app.set("socketio", io);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/drivers", driverRouter);
app.use("/verify", userController.Verification);
app.use("/rides", rideRouter);
//app.use("/ticket", authMiddleware, ticketRouter);
app.use("/ticket", ticketRouter);

app.use("/basefare", baseRouter);

app.use("/ticketReply", authMiddleware, ticketReplyRouter);
app.use("/admin", adminRouter);
app.use("/image", imageRouter);
app.use("/city", cityRouter);
app.use("/category", categoryRouter);
app.use("/vehical", vehicalRouter);
app.use("/offer", offerRouter);

app.use("/goodsType", goodsRouter);
app.use("/payment", authMiddleware, paymentRoute);
app.use(errorHandler);
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("updateRiderLocation", async (body) => {
    const decodedtoken = await JWT.decryptToken(body.token);
    console.log(decodedtoken);
    const res = await DriverModel.updateOne(
      { _id: body.id },
      {
        $set: {
          "currentLocation.coordinates": [
            body.coordinates.lat,
            body.coordinates.long,
          ],
        },
      }
      // { "currentLocation.type": body.type }
    );
    console.log(res, "Ressss");
    io.emit("driverupdated", "Driver Location Updated");
  });

  socket.on("getNearDrivers", async (body) => {
    const res = await DriverModel.find({
      currentLocation: {
        $near: {
          $geometry: { type: "Point", coordinates: body.coordinates },
          $minDistance: 1000,
          $maxDistance: 5000,
        },
      },
    });
    io.emit("NearByDriversList", res);
  });
});

server.listen(PORT || 3000, () =>
  console.log("Server running on ..." + process.env.PORT || 3000)
);
