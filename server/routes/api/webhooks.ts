import { Router } from "express";
import axios from "axios";
import { resourceURL } from "../../config/credential";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Webhooks Works" });
});

// @route   POST api/webhooks
// @desc    POST Webhooks
// @access  Public
router.post("/", async (req, res) => {
  console.log("**********************************************");
  console.log("********** Inside POST api/webhooks **********");
  const data = req.body;
  console.log(
    "Patient with id " + data.patientId + " triggered " + data.eventType
  );
  let url = resourceURL + global.orgId + "/calendar-events";
  console.log("Creating Calendar Event. ", url);
  let config = {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "Bearer " + global.currentAccessToken
    }
  };

  let startDateTime = getDate().setMinutes(0, 0, 0);
  let endDateTime = getDate().setMinutes(30, 0, 0);

  let body = {
    description: "Doctor's Appointment",
    participantIds: [data.patientId],
    eventType: "Appointment",
    notes: "Meet Doctor Urgently",
    startDateTime: new Date(startDateTime).toISOString(),
    endDateTime: new Date(endDateTime).toISOString(),
    rrule: "FREQ=DAILY;INTERVAL=1;COUNT=1"
  };
  try {
    const response = await axios.post(url, body, config);
    console.log(`Response for POST /calendar-events ${response.data}`);
  } catch (error) {
    console.log("****** Error ****** in GET api/webhooks");
    console.log(error);
    res.send(error);
  }
  console.log("Sending Success Response to acknowledge the webhook");
  res.send(200);
});

function getDate() {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
}

export default router;
