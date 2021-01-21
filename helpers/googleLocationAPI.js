const axios = require("axios");
const { GOOGLE_API_KEY } = process.env;

const googleAPI = (place, latitudes, longitudes, radius) => {
  try {
    const data = axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_API_KEY}&input=${place}&location=${latitudes},${longitudes}&radius=${radius}`
    );
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = { googleAPI };
