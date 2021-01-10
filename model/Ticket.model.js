const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ticketSchema = new mongoose.Schema({
    ByUserID: {
      type: String
    },
    RideID: {
      type: String
    },
    Subject: {
      type: String
    },
    Message: {
      type: String,
      required: true
    },
    CreatedAt: {
      type: String,
      required: true
    },
    Time: {
      type: String
    },
    Status: {
        type: String
      },
    ReplyToTicket: [
      {
       ByUser:{
        type: String,
        required: true
       },
       ByUserAvatar:{
        type: String
       },
       ReplyMsg:{
        type: String,
        required: true
       },
       ReplyTime:{
        type: String,
        required: true
       },
       RelpyDate:{
        type: String,
        required: true   
       }
    }
  ],
    Satisfied: {
        type: String
      }  
  });

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
