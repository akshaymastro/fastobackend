const axios = require("axios");

const sendSMS = async (Mobile, GeneratedOtp) => {
  const res = await axios.get(
    `http://125.16.147.178/VoicenSMS/webresources/CreateSMSCampaignGet?ukey=OqdXRL50BekORDoAW8eCQH4uT&msisdn=${Mobile}&language=0&credittype=2&senderid=GOMRKT&templateid=0&message=${GeneratedOtp}&filetype=2`
  );
  return res;
};

module.exports = { sendSMS };
