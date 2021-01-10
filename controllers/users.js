const User = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");



exports.GetUser = async (req,res) => {
    try{
     const {Mobile} = req.body;
     await User.findOne({Mobile: Mobile}).then((Response) => {
         res.send(Response)
         console.log(Response)
     })
    }catch(err){
        console.log(err)
    }
}

//Update fields
exports.UpdateFields = async (req,res) => {
     try{
        const authheader = req.get("Authorization");
         jwt.verify(authheader, jwtSecret, async(err,data) => {
           
             
             if(err){
                 console.log(err)
             } else{
                console.log('data here' + data.completeUser.Mobile);
                const { firstName, lastName, email,address,state,city,pincode} = req.body;
               await User.findOneAndUpdate({Mobile:data.completeUser.Mobile}, {
                   firstName:firstName,
                   lastName:lastName,
                   email:email,
                   address:address,
                   state:state,
                   city:city,
                   pincode:pincode
               }).then(data => res.send(data))
               
             }
         })
     }catch(error){
         console.log(error + 'Error from UpdateFields API in user.js file in controllers')
     }
}

//Delete user
exports.DeleteUser = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
       console.log(authheader);
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                res.send('Error Occured From Delete User API');
                res.send(err);
            } else{
                res.send(data.completeUser._id)
                await User.findByIdAndDelete({_id:data.completeUser._id}).exec((err,data) => {
                    if(err){
                        res.send('Error while deleting user');
                        res.send(err)
                    }else{
                        res.send(data)
                    }
                })
            }
        })
    }catch(error){
        console.log(error + 'Error from DeleteUser API in user.js file in controllers')
    }
}

//Update Current Location
exports.UpdateCurrentLocation = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                console.log(err)
            } else{
               const {currentLocation} = req.body;
              await User.findOneAndUpdate({_id:data.completeUser._id}, {
                  currentLocation: currentLocation
              }).then(data => res.send(data))
            }
        })
    }catch(error){
        console.log(error + 'Error from UpdateCurrentLocation API in user.js file in controllers')
    }
}

//Update Profile Picture
exports.UpdateProfilePicture = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                console.log(err)
            } else{
               const {dp} = req.body;
              await User.findOneAndUpdate({_id:data.completeUser._id}, {
                  dp: dp
              }).then(data => res.send(data))
            }
        })
    }catch(error){
        console.log(error + 'Error from UpdateProfilePicture API in user.js file in controllers')
    }
}