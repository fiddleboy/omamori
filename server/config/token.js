const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");
const bodyParser = require("body-parser");
const keys = require("./credential");

router.get("/", (req, res) => {
  let param = {
    grant_type: "client_credentials",
    client_id: keys.clientId,
    client_secret: keys.clientSecrect
  };
  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  axios
    .post(keys.tokenURL, qs.stringify(param), config)
    .then(response => {
      const accessToken = response.data;
      global.currentAccessToken = accessToken.access_token;
      res.send(accessToken);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
