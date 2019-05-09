const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../config/credential");
const qs = require("qs");
const bodyParser = require("body-parser");
const userinfo = require("./api/userinfo");
const url = require("url");

const open = require("open");

router.get("/test", (req, res) => {
  console.log("got here in test");
  res.json({ msg: "Login test Works" });
});

router.get("/callback", (req, res) => {
  authcode = req.query.code;
  console.log("***************************************************");
  console.log("********** Inside GET api/login/callback **********");
  console.log("Recieved Auth Code from server. Auth Code: ", authcode);
  console.log("Retrieving Access Token from Server");
  console.log("Calling ", keys.tokenURL);
  let param = {
    grant_type: "authorization_code",
    client_id: keys.clientId,
    client_secret: keys.clientSecrect,
    redirect_uri: `https://${keys.hostURL}:3443/api/login/callback`,
    code: authcode
  };
  let config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json"
    }
  };
  axios
    .post(keys.tokenURL, qs.stringify(param), config)
    .then(response => {
      const accessToken = response.data;
      console.log(
        "Recieved Access Token from server. Access Token:",
        accessToken
      );
      global.currentAccessToken = accessToken.access_token;
      global.orgId = accessToken.metadata.orgId;
      // get user info
      axios
        .get("/api/userinfo")
        .then(response => {
          console.log("Recieved User Info");
          console.log("Login Successfull. Redirecting to Dashboard");
          res.redirect(`http://${keys.hostURL}:3000/dashboard`);
        })
        .catch(error => {
          console.log("****** Error ****** in GET api/login/callback");
          console.log(error);
          res.send(error);
        });
    })
    .catch(error => {
      console.log("****** Error ****** in GET api/login/callback");
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
