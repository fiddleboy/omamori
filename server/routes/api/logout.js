const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/credential");
const qs = require("qs");

const open = require("open");

router.get("/test", (req, res) => {
  res.json({ msg: "Logout test Works" });
});

router.get("/", (req, res) => {
  console.log("********************************************");
  console.log("********** Inside GET /api/logout **********");
  let buff = new Buffer(keys.clientId + ":" + keys.clientSecrect);
  let basicAuth = buff.toString("base64");
  let param = {
    token: global.currentAccessToken,
    token_type_hint: "access_token"
  };
  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
      Authorization: "Basic " + basicAuth
    }
  };
  console.log("Calling Revoke URL ", keys.revokeURL);
  axios
    .post(keys.revokeURL, qs.stringify(param), config)
    .then(response => {
      console.log("Access Token successfully revoked");
      console.log("Redirecting to Login Screen");
      res.redirect(`http://${keys.hostURL}:3000`);
    })
    .catch(error => {
      console.log("****** Error ****** in GET Error in GET /api/logout");
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
