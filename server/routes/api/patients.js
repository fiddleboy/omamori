const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/credential");
const qs = require("qs");

router.get("/test", (req, res) => {
  res.json({ msg: "Patient Works" });
});

// @route   GET api/patients
// @desc    Get patients
// @access  Public
router.get("/", (req, res) => {
  console.log("******************************************");
  console.log("********** Inside GET api/patients *******");
  let url = keys.resourceURL + global.orgId + "/patients";
  console.log("Getting patients using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    },
    params: {
      facId: req.query.facId
    }
  };
  axios
    .get(url, config)
    .then(response => {
      console.log("Recieved list of patients from server");
      res.send(response.data);
    })
    .catch(error => {
      console.log("****** Error ****** GET api/patients");
      console.log(error);
      res.send(error);
    });
});

// @route   GET api/patient/:patientId
// @desc    Get patient Details
// @access  Public
router.get("/:patientId", (req, res) => {
  console.log("****************************************************");
  console.log("********** Inside GET api/patient/:patientId *******");
  let patientId = req.params.patientId;
  let facId = req.query.facId;
  Promise.all([callGetPatient(patientId, facId), callGetCalendar(patientId)])
    .then(result => res.send({ ...result[0], events: result[1].data }))
    .catch(error => {
      console.log("****** Error ****** GET api/patients/:patientId");
      console.log(error);
      res.send(error);
    });
});

function callGetPatient(patientId, facId) {
  let url = keys.resourceURL + global.orgId + "/patients/" + patientId;
  console.log("Getting Patient details using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    },
    params: {
      facId: facId
    }
  };
  return new Promise((approve, reject) => {
    axios
      .get(url, config)
      .then(response => {
        console.log("Recieved Patient's data from server");
        approve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

function callGetCalendar(patientId) {
  let url = keys.resourceURL + global.orgId + "/calendar-occurrences";
  console.log("Getting Patient's calendar events using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    },
    params: {
      patientId: patientId,
      fromDateTime: "2019-05-01T00:00:00.000Z"
    }
  };
  return new Promise((approve, reject) => {
    axios
      .get(url, config)
      .then(response => {
        console.log("Recieved Patient's calendar events from server");
        approve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}
module.exports = router;
