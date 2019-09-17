import { Router } from "express";
import axios from "axios";
import { resourceURL } from "../../config/credential";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ msg: "Userinfo Works" });
});

// @route   GET api/userinfo
// @desc    Get user
// @access  Public
router.get("/", async (req, res) => {
  console.log("*********************************************");
  console.log("********** Inside GET api/userInfo **********");
  let url = resourceURL + global.orgId + "/userinfo";
  console.log("access token in userinfo: ", global.currentAccessToken);
  let config = {
    headers: {
      Authorization: "Bearer " + global.currentAccessToken
    }
  };
  try {
    const response = await axios.get(url, config);
    res.send(response.data);
  } catch (error) {
    console.log("****** Error ****** GET api/userInfo");
    res.send(error);
  }
});

export default router;
