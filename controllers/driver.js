const Driver = require("../model/Driver.model");
const jwtSecret = require("../config/jwtSecret");
const jwt = require("jsonwebtoken");


exports.getDriver = async (req, res) => {
    const driverFromDB = await Driver.find({});
    const driverWithoutPassword = driverFromDB.map(
        ({email, firstName, lastName}) => ({
            email,
            firstName,
            lastName       
    })
);
    return res.json({driverWithoutPassword});
}


  
//Update fields
exports.UpdateDriverFields = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                console.log(err)
            } else{
               const { firstName, lastName, email,address,state,city,pincode,driverAadhaar,driverPan,driverLic,driverRc} = req.body;
              await Driver.findOneAndUpdate({Mobile:data}, {
                  firstName:firstName,
                  lastName:lastName,
                  email:email,
                  address:address,
                  state:state,
                  city:city,
                  pincode:pincode,
                  driverAadhaar:driverAadhaar,
                  driverPan:driverPan,
                  driverLic:driverLic,
                  driverRc:driverRc

              }).then(data => res.send(data))
            }
        })
    }catch(error){
        console.log(error + 'Error from UpdateDriverFields API in driver.js file in controllers')
    }
}

//Delete user
exports.DeleteDriver = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
       console.log(authheader);
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                res.send('Error Occured From Delete Driver API');
                res.send(err);
            } else{
                await Driver.findByIdAndDelete({_id:data.completeDriver._id}).exec((err,data) => { // insted of data.completeDriver.id , we will use req.body
                    if(err){
                        res.send(err + '' + 'Error while deleting driver');
                    }else{
                        res.send(data)
                    }
                })
            }
        })
    }catch(error){
        console.log(error + 'Error from DeleteDriver API in driver.js file in controllers')
    }
}


//Update Current Location
exports.UpdateCurrentDriverLocation = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                console.log(err)
            } else{
               const {currentLocation} = req.body;
              await Driver.findOneAndUpdate({_id:data.completeDriver._id}, {
                  currentLocation: currentLocation
              }).then(data => res.send(data))
            }
        })
    }catch(error){
        console.log(error + 'Error from UpdateCurrentDriverLocation API in driver.js file in controllers')
    }
}


//Update Profile Picture
exports.UpdateDriverProfilePicture = async (req,res) => {
    try{
       const authheader = req.get("Authorization");
        jwt.verify(authheader, jwtSecret, async(err,data) => {
            if(err){
                console.log(err)
            } else{
               const {dp} = req.body;
              await Driver.findOneAndUpdate({_id:data.completeDriver._id}, {
                  dp: dp
              }).then(data => res.send(data))
            }
        })
    }catch(error){
        console.log(error + 'Error from UpdateDriverProfilePicture API in driver.js file in controllers')
    }
}