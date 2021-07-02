const mongoose = require("mongoose");
const { data } = require("../helpers/responseHandler");
const Schema = mongoose.Schema;


const ticketReplySchema = new mongoose.Schema({
    replytoticketID: [{type: Schema.Types.ObjectId, ref:'Ticket'}],
    replyMsg: {
      type: String,      
      required: true
    },
    isReplyByAdmin : {
      type : Boolean,
      default : false
    },
    isReplyByUser : {
      type : Boolean,
      default : false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
  },
  isDeleted: {
    type : Boolean,
    default : false
  }
  }, {
    timestamps: true
});

const TicketReply = mongoose.model("TicketReply", ticketReplySchema);

module.exports = TicketReply;
