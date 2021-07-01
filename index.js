require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const DriverModel = require("./model/Driver.model");
const RideModel = require("./model/Ride.model");
const UserModel = require("./model/User.model");
const TicketReplyModel = require("./model/TicketReply.model");
const Jwt = require("./helpers/jwt");
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
  socket.on("updateRiderLocation", async (body) => {
    console.log(body, "bodydyd");
    const res = await DriverModel.updateOne(
      { _id: body.id },
      {
        currentLocation: {
          type: "Point",
          coordinates: [body.coordinates.long, body.coordinates.lat],
        },
      }
      // { "currentLocation.type": body.type }
    );
    const updatedDriver = await DriverModel.findById({ _id: body.id });
    const token = await Jwt.createNewToken(updatedDriver);
    io.emit("driverupdated", token);
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
  socket.on("getRidesForDriver", async (body) => {
    console.log(body.coordinates, "body coordinates");
    const res = await RideModel.aggregate(
      [
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: body.coordinates,
            },
            spherical: true,
            distanceField: "dis",
            maxDistance: 5000,
          },
        },
      ],
      function (err, shapes) {
        if (err) throw err;
        //console.log( shapes );

        // shapes = shapes.map(function (x) {
        //   delete x.dis;
        //   return new Shape(x);
        // });

        // Shape.populate(shapes, { path: "info" }, function (err, docs) {
        //   if (err) throw err;

        //   console.log(JSON.stringify(docs, undefined, 4));
        // });
      }
    );
    console.log(res, "Resss");
    io.emit("NearByRideList", res);
  });
  socket.on("getCurrentRide", async (body) => {
    const res = await RideModel.findById({
      _id: body.id,
    });
    io.emit("getUpdatedRide", res);
  });
  socket.on("acceptride", async (body) => {
    const res = await RideModel.updateOne({ _id: body.id }, { ...body });
    const res1 = await DriverModel.updateOne(
      { _id: body.driveId },
      { $push: { ongoingRide: body.id } }
    );
    console.log(res1, "resss");

    io.emit("RideAccepted", "Ride Accepted");
  });
  socket.on("updateRide", async (body) => {
    if (body.StartOpt || body.CompleteOtp) {
      const getRide = await RideModel.findOne({ _id: body.id });
      if (getRide.pickUpOtp == body.StartOpt) {
        const res = await RideModel.updateOne({ _id: body.id }, { ...body });
        console.log(res, "ride model reponse on start");
      } else if (getRide.recevierOtp == body.CompleteOtp) {
        const res = await RideModel.updateOne({ _id: body.id }, { ...body });
        console.log(res, "ride model reponse oncomplete");
      }
    } else {
      const res = await RideModel.updateOne({ _id: body.id }, { ...body });
      console.log(res, "ride model reponse intial update");
    }
  });
  socket.on("joinRoom", async (data) => {
    try {
      console.log(data, typeof (data), "joinRoomdata")
      if (data && data.replytoticketID) {
        console.log("user connection chat id:", data.replytoticketID, socket.id);
        socket.join(data.replytoticketID);
        io.to(socket.id).emit("joinRoomOk", {
          status: 200,
        });
      }
    } catch (error) {
      console.log(error,"error")
    }
  });
  socket.on("leaveRoom", async function (data) {
    try {
      console.log(data, typeof (data), "leaveRoomdata")
      if (data && data.replytoticketID) {
        console.log("leave connection chat id:", data.replytoticketID, socket.id);
        socket.leave(data.replytoticketID);
      }
    } catch (error) {
      console.log(error,"error")
    }
  });
  socket.on('send_message', async (data) => {
    try {
      console.log("chating", data)
      if(data && data.adminId && data.userId && data.replyMsg && data.replytoticketID){
        let payload = {
          replytoticketID : data.replytoticketID,
          replyMsg : data.replyMsg,
          isReplyByAdmin : data.isReplyByAdmin,
          isReplyByUser : data.isReplyByUser,
          userId : data.userId,
          adminId : data.adminId
        }
      let messageData = await TicketReplyModel(payload).save();
      io.to(data.replytoticketID).emit("receive_message", messageData);
      }
    } catch (error) {
      console.log(error,"error")
    }
  })
});

server.listen(PORT || 3000, () =>
  console.log("Server running on ..." + process.env.PORT || 3000)
);
