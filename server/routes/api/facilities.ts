import { Router } from "express";
import axios from "axios";
import { resourceURL } from "../../config/credential";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Facilities Works" });
});

// @route   GET api/facilities
// @desc    Get Facs
// @access  Public
router.get("/", async (req, res) => {
  console.log("********************************************");
  console.log("********** Inside GET api/facilities *******");
  let url = resourceURL + global.orgId + "/facs";
  console.log("Getting facilities using ", url);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    }
  };
  try {
    const response = await axios.get(url, config);
    console.log("Recieved list of facilities from server");
    res.send(response.data);
  } catch (error) {
    console.log("****** Error ****** in GET api/facilities");
    console.log(error);
    res.send(error);
  }
});

export default router;
