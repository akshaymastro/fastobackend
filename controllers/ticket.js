const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const Ticket = require("../model/Ticket.model");
const bcrypt = require("bcrypt");
const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require('moment');


//Create Ticket
exports.CreateTicket = async(req,res) => {
    try {
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                res.send(err)
            }else{
                //res.send(data)
                const createticket = new Ticket();
                const {RideID,Subject,Message,CreatedAt,Time,Status,ReplyID,Satisfied} = req.body;
                createticket.ByUserID = data.completeUser._id
                createticket.RideID = RideID
                createticket.Subject = Subject
                createticket.Message = Message
                createticket.CreatedAt = moment().format("MMM Do YY")
                createticket.Time = moment().format('h:mm:ss a')
                createticket.Status = Status
                createticket.ReplyID = ReplyID
                createticket.Satisfied = Satisfied

                createticket.save(async(error1,data1) => {
                      if(error1){
                          res.send(error1)
                      }else{
                          //res.send(data1)
                          const saveTickettoUser = await User.findByIdAndUpdate(data.completeUser._id, {
                            $push: {userTicket:data1._id}
                          })
                          res.send(saveTickettoUser)
                      }
                })
            }
        }) 
    } catch(error) {
        console.log(error)
    }
}

//Delete Ticket
exports.DeleteTicket = async(req,res) => {
    try{
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if (err) {
                res.send(err)
            } else {
                const deleteticket = await Ticket.findByIdAndDelete({_id:req.body.ticketid})
                      console.log(deleteticket)
                      console.log('Next')
                      console.log(data.completeUser)
                const deleteticketfromuser = await User.findByIdAndUpdate(data.completeUser._id, {
                    $pull: {userTicket:deleteticket._id}
                })
                res.send(deleteticketfromuser)
            }

        })

    } catch(error) {
        console.log(error)
    }
}

//Reply Ticket
exports.ReplyTicket = async(req,res) => {
    try{
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if (err) {
                res.send(err)
            } else {
                const {ReplyMsg} = req.body;
                var ReplyToTicket = {
                    ByUser: data.completeUser._id,
                    ByUserAvatar: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
                    ReplyMsg: ReplyMsg,
                    ReplyTime: moment().format('h:mm:ss a'),
                    RelpyDate: moment().format("MMM Do YY")
                }
                const replyticket = await Ticket.findByIdAndUpdate({_id:req.body.ticketid},{
                    $push: {
                       ReplyToTicket: ReplyToTicket
                    }
                })
                      res.send(replyticket)
            }

        })

    } catch(error) {
        console.log(error)
    }
}


//Get Ticket
exports.GetTicket = async(req,res) => {
    try{
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if (err) {
                res.send(err)
            } else {
                const getticket = await Ticket.find({ByUserID:data.completeUser._id})
                      res.send(getticket)
            }

        })

    } catch(error) {
        console.log(error)
    }
}

//Get Ticket
exports.GetTicketReplies = async(req,res) => {
    try{
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if (err) {
                res.send(err)
            } else {
                const getticketreplies = await Ticket.find({ByUserID:data.completeUser._id})
                      res.send(getticketreplies[0].ReplyToTicket)
                      console.log(getticketreplies[0].ReplyToTicket)
            }

        })

    } catch(error) {
        console.log(error)
    }
}


//Close Ticket
exports.CloseTicket = async(req,res) => {
    try{
        const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if (err) {
                res.send(err)
            } else {
                const closeticket = await Ticket.findByIdAndUpdate({_id:req.body.ticketid},{
                    Status: 'closed'
                })
                      res.send(closeticket)
            }

        })

    } catch(error) {
        console.log(error)
    }
}