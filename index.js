const express = require("express");
const PORT = 4000;
const mongoose = require("mongoose");
const app = express();
const MongoDBConncetionString = require("./config/mongodb")
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const adminRouter = require('./routes/admin');
const rideRouter = require('./routes/ride');
const ticketRouter = require('./routes/ticket');
const ticketReplyRouter = require('./routes/ticketReply');
const authMiddleware = require("./middleware/auth");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/auth",authRouter);
app.use("/users",authMiddleware,userRouter);
app.use("/ride",authMiddleware,rideRouter)
app.use("/ticket",authMiddleware,ticketRouter)
app.use("/ticketReply",authMiddleware,ticketReplyRouter)
app.use("/admin",adminRouter);


mongoose.connect(MongoDBConncetionString, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false  }).then(result => {
    
    app.listen(PORT, () =>{
        console.log("server is listening on PORT:" + PORT);
    }); 
    console.log("Connected to Mongodb");
}).catch(
    err => {
        console.error(err);
    })
    



