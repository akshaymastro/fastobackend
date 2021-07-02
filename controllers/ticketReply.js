const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const TicketReply = require("../model/TicketReply.model");
const bcrypt = require("bcrypt");
const { jwtsecret } = process.env;
// const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require("moment");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");

//Ticket Reply
// exports.TicketReply = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"];
//     const decoded = await jwtToken
//       .decryptToken(token)
//       .then((result) => result.user)
//       .catch((error) => error);
//     const createreplyticket = new TicketReply();
//     const { replytoticketID, replyMsg, Replytime, replydate } = req.body;
//     createreplyticket.ByUserID = decoded._id;
//     createreplyticket.replytoticketID = replytoticketID;
//     createreplyticket.replyMsg = replyMsg;
//     createreplyticket.Replytime = moment().format("h:mm:ss a");
//     createreplyticket.replydate = moment().format("MMM Do YY");

//     const response = await createreplyticket.save();
//     responseHandler.success(res, "New Ticket Created SuccessFully", 200);
//   } catch (error) {
//     next(error);
//   }
// };

exports.TicketReply = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const replytoticketID = req.body.replytoticketID;
    const page = req.body.page || 0;
    const limit = req.body.limit || 10;
    let msgData = await TicketReply.find({
      replytoticketID : replytoticketID,
      // userId: decoded._id,
      isDeleted : false
    }).limit(limit).skip(page * limit).sort({
      createdAt : -1
    })
    responseHandler.success(msgData, "New Ticket Created SuccessFully", 200);
  } catch (error) {
    next(error);
  }
};