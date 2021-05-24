const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const Ticket = require("../model/Ticket.model");
const moment = require("moment");
const jwtToken = require("../helpers/jwt");
const responseHandler = require("../helpers/responseHandler");
//Create Ticket
exports.CreateTicket = async (req, res, next) => {
  try {
   // const authheader = req.get("Authorization");
     //const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    console.log(token,"token");
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const createticket = new Ticket();
    const {
      RideID,
      Subject,
      Message,
      CreatedAt,
      Time,
      Status,
      ReplyID,
      Satisfied,
    } = req.body;
    createticket.ByUserID = decoded._id;
    createticket.RideID = RideID;
    createticket.Subject = Subject;
    createticket.Message = Message;
    createticket.CreatedAt = moment().format("MMM Do YY");
    createticket.Time = moment().format("h:mm:ss a");
    createticket.Status = Status;
    createticket.ReplyID = ReplyID;
    createticket.Satisfied = Satisfied;

    const newTicket = await createticket.save();
    const saveTickettoUser = await User.findByIdAndUpdate(decoded._id, {
      $push: { userTicket: newTicket._id },
    });
    responseHandler.data(res, saveTickettoUser, 200);
  } catch (error) {
    next(error);
  }
};

//Delete Ticket
exports.DeleteTicket = async (req, res, next) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const deleteticket = await Ticket.findByIdAndDelete({
      _id: req.body.ticketid,
    });
    const deleteticketfromuser = await User.findByIdAndUpdate(decoded._id, {
      $pull: { userTicket: deleteticket._id },
    });
    responseHandler.data(res, deleteticketfromuser, 200);
  } catch (error) {
    next(error);
  }
};

//Reply Ticket
exports.ReplyTicket = async (req, res) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    // const token = req.headers["authorization"];
    // const decoded = await jwtToken
    //   .decryptToken(token)
    //   .then((result) => result.user)
    //   .catch((error) => error);
    const { ReplyMsg } = req.body;
    console.log(req.body);
    var ReplyToTicket = {
      ByUser: "5f1c574fe1fc1f3510683264",
      ByUserAvatar:
        "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      ReplyMsg: ReplyMsg,
      ReplyTime: moment().format("h:mm:ss a"),
      RelpyDate: moment().format("MMM Do YY"),
    };
    console.log(ReplyToTicket);
    const replyticket = await Ticket.findByIdAndUpdate(
      { _id: req.body.ticketid },
      {
        $push: {
          ReplyToTicket: ReplyToTicket,
        },
      }
    );
    
    responseHandler.data(res, replyticket, 200);
  } catch (error) {
    next(error);
  }
};

//Get Ticket
exports.GetTicket = async (req, res, next) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);

    const getticket = await Ticket.find({
      ByUserID: decoded._id,
    });
    responseHandler.data(res, getticket, 200);
  } catch (error) {
    next(error);
  }
};

//Get Ticket
exports.GetTicketReplies = async (req, res) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const getticketreplies = await Ticket.find({
      ByUserID: decoded._id,
    });
    responseHandler.data(res, getticketreplies[0].ReplyToTicket, 200);
  } catch (error) {
    next(error);
  }
};

//Close Ticket
exports.CloseTicket = async (req, res) => {
  try {
    // const authheader = req.get("Authorization");
    // const decoded = await jwtToken.decryptToken(authheader);
    const token = req.headers["authorization"];
    const decoded = await jwtToken
      .decryptToken(token)
      .then((result) => result.user)
      .catch((error) => error);
    const closeticket = await Ticket.findByIdAndUpdate(
      { _id: req.body.ticketid },
      {
        Status: "closed",
      }
    );
    responseHandler.success(res, closeticket, 200);
  } catch (error) {
    next(error);
  }
};
