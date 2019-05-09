const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/credential");

router.get("/test", (req, res) => {
  res.json({ msg: "Facilities Works" });
});

// @route   GET api/facilities
// @desc    Get Facs
// @access  Public
router.get("/", (req, res) => {
  console.log("********************************************");
  console.log("********** Inside GET api/facilities *******");
  let url = keys.resourceURL + global.orgId + "/facs";
  console.log("Getting facilities using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    }
  };
  axios
    .get(url, config)
    .then(response => {
      console.log("Recieved list of facilities from server");
      res.send(response.data);
    })
    .catch(error => {
      console.log("****** Error ****** in GET api/facilities");
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
