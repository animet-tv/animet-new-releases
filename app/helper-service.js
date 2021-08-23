const axios = require("axios");
const mainServerURL = process.env.MAIN_SERVER_URL;

let fetchRecentlyAdded = async (callback) => {
    try {
      let url = mainServerURL + `api/popular/recently-added`;
      console.log(url);
      axios
        .get(url)
        .then((res) => {
          callback(null, res.data);
        })
        .catch((error) => {
          console.error(error);
          callback(null, false);
        });
    } catch (error) {
      callback(null, false);
    }
  };

  
  module.exports = {
      fetchRecentlyAdded
  }