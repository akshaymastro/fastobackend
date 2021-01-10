const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const chatSchema = new mongoose.Schema({
    ByUserID: {
      type: String
    },
    ToUserID: {
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
        type: String //Read/Unread
      },
    ReplyToChat: [
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

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
