const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ticketReplySchema = new mongoose.Schema({
    replytoticketID: [{type: Schema.Types.ObjectId, ref:'Ticket'}],
    replyMsg: {
      type: String,      
      required: true
    },
    Replytime: {
      type: String,      
      required: true
    },
    replydate: {
      type: String,      
      required: true
    }    
  });

const TicketReply = mongoose.model("TicketReply", ticketReplySchema);

module.exports = TicketReply;
