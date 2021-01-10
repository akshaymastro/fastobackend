const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const notificationSchema = new mongoose.Schema({
    ByUserID: {
      type: String
    },
    ToUserID: {
      type: String
    },
    Icon: {
      type: String
    },
    Image: {
        type: String
    },
    Type: {
        type: String
    },  
    Title: {
      type: String
    },
    Subtitle: {
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
      }
  });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
