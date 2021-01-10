const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const Chat = require("../model/Ticket.model");
const bcrypt = require("bcrypt");
const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require('moment');



//Send msg to admin
exports.SendMsg = async(req,res) => {
    try {
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                res.send(err)
            }else{
                //res.send(data)
                const sendmsg = new Chat();
                const {ToUserID,Subject,Message,CreatedAt,Time,Status,ReplyID,Satisfied} = req.body;
                sendmsg.ByUserID = data.completeUser._id
                sendmsg.ToUserID = ToUserID
                sendmsg.Subject = Subject
                sendmsg.Message = Message
                sendmsg.CreatedAt = moment().format("MMM Do YY")
                sendmsg.Time = moment().format('h:mm:ss a')
                sendmsg.Status = Status
                sendmsg.Satisfied = Satisfied

                sendmsg.save(async(error1,data1) => {
                      if(error1){
                          res.send(error1)
                      }else{
                          //res.send(data1)
                          const saveMsgtoUser = await User.findByIdAndUpdate(data.completeUser._id, {
                            $push: {chatSupport:data1._id}
                          })
                          res.send(saveMsgtoUser)
                      }
                })
            }
        }) 
    } catch(error) {
        console.log(error)
    }
}

//Reply to msg
exports.ReplyToMsg = async(req,res) => {
    try{
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if (err) {
                res.send(err)
            } else {
                const {ReplyMsg} = req.body;
                var ReplyToChat = {
                    ByUser: data.completeUser._id,
                    ByUserAvatar: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                    ReplyMsg: ReplyMsg,
                    ReplyTime: moment().format('h:mm:ss a'),
                    RelpyDate: moment().format("MMM Do YY")
                }
                const chatreply = await Chat.findByIdAndUpdate({_id:req.body.msgid},{ //msgid is the message document id
                    $push: {
                        ReplyToChat: ReplyToChat
                    }
                })
                      res.send(chatreply)
            }

        })

    } catch(error) {
        console.log(error)
    }
}