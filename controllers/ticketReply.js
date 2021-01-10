const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const TicketReply = require("../model/TicketReply.model");
const bcrypt = require("bcrypt");
const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require('moment');


//Ticket Reply
exports.TicketReply = async(req,res) => {
    try {
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => { 
            if (err) {
                res.send(err)
            } else {
                const createreplyticket = new TicketReply ()
                const {replytoticketID,replyMsg,Replytime,replydate} = req.body;
                createreplyticket.ByUserID = data.completeUser._id
                createreplyticket.replytoticketID = replytoticketID
                createreplyticket.replyMsg = replyMsg
                createreplyticket.Replytime = moment().format('h:mm:ss a')
                createreplyticket.replydate = moment().format("MMM Do YY")

                createreplyticket.save(async(error1,data1) => {
                    if (error1) {
                        res.send(error1)
                    } else {
                        console.log(data1)
                    }
                })
            }
        })
        
    } catch(error) {
        console.log(error)        
    }

}