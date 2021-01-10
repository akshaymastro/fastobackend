const User = require("../model/User.model");
const Ride = require("../model/Ride.model");
const bcrypt = require("bcrypt");
const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");



//Create Ride
exports.CreateRide = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                res.send('Error Occured From Create Ride API');
                res.send(err);
            } else{
                const ride = new Ride();
                ride.ByUserID = data.completeUser._id
                ride.fromLocation = req.body.fromLocation
                ride.toLocation = req.body.toLocation
                ride.Kms = req.body.Kms
                ride.save(async(err,response) => {
                    if(err){
                        res.send('Error occured creating a ride');
                        res.send(err)
                    }else{
                         var saverideintouser = await User.findByIdAndUpdate(data.completeUser._id,{
                                $push: {rideHistory:response._id}
                            })
                       res.send(saverideintouser)
                    }
                })
            }
        })
    }catch(error){
        console.log(error + 'Error from Create Ride API in ride.js file in controllers')
    }
}


//Delete Ride
exports.DeleteRide = async (req,res) => {
   try{
    const authheader = req.get("Authorization");
    jwt.verify(authheader, jwtSecret, async(err,data) => {
        if(err){
            res.send(err)
        }else{
          const deleteride = await Ride.findByIdAndDelete({_id:req.body.rideid})
        //   res.send(deleteride)
          const deleterideidfromuser = await User.findByIdAndUpdate(data.completeUser._id,{
            $pull: {rideHistory:deleteride._id}
          })
          res.send(deleterideidfromuser)
        }
    })  
   }catch(err){
       console.log(err)
   }
}