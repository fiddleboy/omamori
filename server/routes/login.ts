import express from "express";
const router = express.Router();
import axios from "axios";
import keys from "../config/credential";
import bodyParser from "body-parser";
const userinfo = require("./api/userinfo").default;
import url from "url";
import qs from 'qs';

router.get("/test", (req, res) => {
  console.log("got here in test");
  res.json({ msg: "Login test Works" });
});

router.get("/callback", async (req, res) => {
  const authcode = req.query.code;
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
      "Accept": "application/json"
    }
  };
  try {
    const response = await axios.post(keys.tokenURL, qs.stringify(param), config);
    const accessToken = response.data;
    console.log(
      "Recieved Access Token from server. Access Token:",
      accessToken
    );
    global.currentAccessToken = accessToken.access_token;
    global.orgId = accessToken.metadata.orgId;
    // get user info
    try {
      const resp2 = await axios.get("https://localhost:3443/api/userinfo");
      console.log("Recieved User Info");
      console.log("Login Successfull. Redirecting to Dashboard");
      res.redirect(`http://${keys.hostURL}:3000/dashboard`);
    }
    catch (error) {
      console.log("****** Error ****** in GET api/login/callback2");
      console.log(error);
      res.send(error);
    }
  }
  catch (error) {
    console.log("****** Error ****** in GET api/login/callback1");
    console.log(error);
    res.send(error);
  }
});

export default router;
