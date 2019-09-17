import { Router } from "express";
import axios from "axios";
import { clientId, clientSecrect, revokeURL, hostURL } from "../../config/credential";
import { stringify } from "qs";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Logout test Works" });
});

router.get("/", async (req, res) => {
  console.log("********************************************");
  console.log("********** Inside GET /api/logout **********");
  let buff = new Buffer(clientId + ":" + clientSecrect);
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
  console.log("Calling Revoke URL ", revokeURL);
  try {
    const response = axios.post(revokeURL, stringify(param), config);
    console.log("Access Token successfully revoked");
    console.log("Redirecting to Login Screen");
    res.redirect(`http://${hostURL}:3000`);
  }
  catch (error) {
    console.log("****** Error ****** in GET Error in GET /api/logout");
    console.log(error);
    res.send(error);
  }
  global.currentAccessToken = null;
  global.orgId = null;
});

export default router;
