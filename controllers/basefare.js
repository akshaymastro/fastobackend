const base=require('../model/basefare.model');
const responseHelper = require("../helpers/response");



  exports.createFuel = async (req, res, next) => {
    try {
      const FuelCharge = await new base(req.body).save();
      responseHelper.success(res, "FuelCharge Updated SuccessFully", 200);
    } catch (e) {
      next(e);
    }
  };

exports.createfare = async (req, res, next) => {
  try {
      console.log(req.body.class_name);
    let basefare=[]
    basefare.push({no_km:req.body.km,fare:req.body.fare})
    req.body.basefare=basefare
    console.log(basefare);
    const fare = await base.findOneAndUpdate({class_name:req.body.class_name},{$push:{basefare:req.body.basefare}});
    responseHelper.success(res, "Fare Added SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.updateFare = async (req, res, next) => {
  console.log(req.body.id,req.body);
  try {
    await base.updateOne({_id:req.params._id}, {
        $push: { basefare: [{no_of_km:req.body.no_of_km,Price:req.body.Price}] }
      });
    responseHelper.success(res, "Fare Updated SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.deleteFare = async (req, res, next) => {
  console.log(req.params._id);
  try {
    console.log("delete");
    await base.deleteOne({ _id: req.params._id });
    responseHelper.success(res, "Fare Deleted SuccessFully", 200);
  } catch (e) {
    next(e);
  }
};

exports.getfare = async (req, res, next) => {
  try {
if(req.body.km<=40){
    let farelist = await base.aggregate([
      {$match: {"class_name": req.body.class_name}}, // <-- match only the document which have a matching element
      {$project: {
      fuelcharge:{fuelcharge:"$fuelcharge"},
          basefare: {$filter: {
              input: "$basefare",
              as: "basefare",
              cond: {$eq: ["$$basefare.no_km", req.body.km]} //<-- filter sub-array based on condition
          }}
      }}
  ]);
    console.log(farelist);

//console.log(filter);
    responseHelper.data(res,farelist, 200);}
    else{

      let farelist = await base.aggregate([
        {$match: {"class_name": req.body.class_name}}, // <-- match only the document which have a matching element
        {$project: {
        fuelcharge:{fuelcharge:"$fuelcharge"},
            basefare: {$filter: {
                input: "$basefare",
                as: "basefare",
                cond: {$eq: ["$$basefare.no_km", 40]} //<-- filter sub-array based on condition
            }}
        }}
    ]);
      console.log(farelist);
  
  //console.log(filter);
      responseHelper.data(res,farelist, 200);


      

    }
  } catch (e) {
    next(e);
  }
};
exports.getAllfare = async (req, res, next) => {
  try {

    let Allfare = await base.find({});
    

//console.log(filter);
    responseHelper.data(res,Allfare, 200);
  } catch (e) {
    next(e);
  }
};