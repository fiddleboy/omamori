const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/credential");

router.get("/test", (req, res) => {
  res.json({ msg: "Userinfo Works" });
});

// @route   GET api/userinfo
// @desc    Get user
// @access  Public
router.get("/", (req, res) => {
  console.log("*********************************************");
  console.log("********** Inside GET api/userInfo **********");
  let url = keys.resourceURL + global.orgId + "/userinfo";
  console.log("access token in userinfo: ", global.currentAccessToken);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    }
  };
  axios
    .get(url, config)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log("****** Error ****** GET api/userInfo");
      res.send(error);
    });
});

module.exports = router;
