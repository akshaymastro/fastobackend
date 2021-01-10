const User = require('../model/User.model');


exports.GetAllUsers = async(req,res) => {
      try{
         getallusers = await User.find({})
         return res.json({getallusers})
      }catch(error){
          console.log(error + 'From Admin Part (Api Name: GetAllUsers)')
      }
}