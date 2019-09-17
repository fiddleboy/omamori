import { Router } from "express";
import axios from "axios";
import { resourceURL } from "../../config/credential";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Patient Works" });
});

// @route   GET api/patients
// @desc    Get patients
// @access  Public
router.get("/", async (req, res) => {
  console.log("******************************************");
  console.log("********** Inside GET api/patients *******");
  let url = resourceURL + global.orgId + "/patients?patientStatus=Current";
  console.log("Getting patients using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    },
    params: {
      facId: req.query.facId
    }
  };
  try {
    const response = await axios.get(url, config);
    console.log("Recieved list of patients from server");
    res.send(response.data);
  } catch (error) {
    console.log("****** Error ****** GET api/patients");
    console.log(error);
    res.send(error);
  }
});

// @route   GET api/patient/:patientId
// @desc    Get patient Details
// @access  Public
router.get("/:patientId", async (req, res) => {
  console.log("****************************************************");
  console.log("********** Inside GET api/patient/:patientId *******");
  let patientId = req.params.patientId;
  let facId = req.query.facId;
  try {
    const patient = await callGetPatient(patientId, facId);
    const calendar = await callGetCalendar(patientId);
    res.send({ ...patient, events: calendar.data });
  } catch (error) {
    console.log("****** Error ****** GET api/patients/:patientId");
    console.log(error);
    res.send(error);
  }
});

async function callGetPatient(patientId, facId) {
  let url = resourceURL + global.orgId + "/patients/" + patientId;
  console.log("Getting Patient details using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    },
    params: {
      facId: facId
    }
  };
  try {
    const response = await axios.get(url, config);
    console.log("Recieved Patient's data from server");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function callGetCalendar(patientId) {
  let url = resourceURL + global.orgId + "/calendar-occurrences";
  console.log("Getting Patient's calendar events using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    },
    params: {
      patientId: patientId,
      fromDateTime: "2019-05-12T00:00:00.000Z"
    }
  };
  try {
    const response = await axios.get(url, config);
    console.log("Recieved Patient's calendar events from server");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export default router;
