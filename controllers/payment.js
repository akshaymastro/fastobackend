const PaytmChecksum = require("../Paytm/checksum");
const responseHandler = require("../helpers/responseHandler");
const { v4: uuidv4 } = require("uuid");
const {
  PAYTM_MID,
  PAYTM_WEBSITE,
  PAYTM_CHANNEL_ID,
  PAYTM_INDUSTRY_TYPE_ID,
  PAYTM_MERCHANT_KEY,
} = process.env;

exports.Callback = async (req, res, next) => {
  form.parse(req, (err, fields, file) => {
    paytmChecksum = fields.CHECKSUMHASH;
    delete fields.CHECKSUMHASH;

    var isVerifySignature = PaytmChecksum.verifySignature(
      fields,
      PAYTM_MERCHANT_KEY,
      paytmChecksum
    );
    if (isVerifySignature) {
      var paytmParams = {};
      paytmParams["MID"] = fields.MID;
      paytmParams["ORDERID"] = fields.ORDERID;

      /*
       * Generate checksum by parameters we have
       * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
       */
      PaytmChecksum.generateSignature(paytmParams, PAYTM_MERCHANT_KEY).then(
        function (checksum) {
          paytmParams["CHECKSUMHASH"] = checksum;

          var post_data = JSON.stringify(paytmParams);

          var options = {
            /* for Staging */
            hostname: "securegw-stage.paytm.in",

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: "/order/status",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };

          var response = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              response += chunk;
            });

            post_res.on("end", function () {
              res.json(response);
            });
          });

          post_req.write(post_data);
          post_req.end();
        }
      );
    } else {
      console.log("Checksum Mismatched");
    }
  });
};

exports.Paytm = async (req, res, next) => {
  try {
    /* import checksum generation utility */
    // var PaytmChecksum = require("./PaytmChecksum");

    // var paytmParams = {};

    // /* initialize an array */
    // paytmParams["MID"] = "YOUR_MID_HERE";
    // paytmParams["ORDERID"] = "YOUR_ORDER_ID_HERE";

    // /**
    // * Generate checksum by parameters we have
    // * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
    // */
    // var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, "YOUR_MERCHANT_KEY");
    // paytmChecksum.then(function(checksum){
    // 	console.log("generateSignature Returns: " + checksum);
    // }).catch(function(error){
    // 	console.log(error);
    // });
    // const { amount, email, Mobile } = req.body;
    let paymentDetails = {
      amount: req.body.amount,
      customerId: req.body.name,
      customerEmail: req.body.email,
      customerPhone: req.body.Mobile,
    };
    if (
      !paymentDetails.amount ||
      !paymentDetails.customerId ||
      !paymentDetails.customerEmail ||
      !paymentDetails.customerPhone
    ) {
      responseHandler.failure(res, "Payment failed", 400);
    }
    /* import checksum generation utility */
    const totalAmount = JSON.stringify(paymentDetails.amount);
    let params = {};

    /* initialize an array */
    (params["MID"] = PAYTM_MID),
      (params["WEBSITE"] = PAYTM_WEBSITE),
      (params["CHANNEL_ID"] = PAYTM_CHANNEL_ID),
      (params["INDUSTRY_TYPE_ID"] = PAYTM_INDUSTRY_TYPE_ID),
      (params["ORDER_ID"] = uuidv4()),
      (params["CUST_ID"] = paymentDetails.customerId),
      (params["TXN_AMOUNT"] = totalAmount),
      (params["CALLBACK_URL"] = "http://localhost:4000/payment/callback"),
      (params["EMAIL"] = paymentDetails.email),
      (params["MOBILE_NO"] = paymentDetails.Mobile);

    const paytmChecksum = await PaytmChecksum.generateSignature(
      params,
      PAYTM_MERCHANT_KEY
    );
    paytmChecksum.then(function (checksum) {
      let paytmParams = {
        ...params,
        CHECKSUMHASH: checksum,
      };
      responseHandler.data(res, paytmParams, 200);
      // res.json(paytmParams);
    });
  } catch (error) {
    next(error);
  }
};
