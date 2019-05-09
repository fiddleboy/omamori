const express = require("express");
const bodyParser = require("body-parser");
const token = require("./config/token");
const facilities = require("./routes/api/facilities");
const login = require("./routes/login");
const logout = require("./routes/api/logout");
const userinfo = require("./routes/api/userinfo");
const patients = require("./routes/api/patients");
const webhooks = require("./routes/api/webhooks");
const https = require("https");
const fs = require("fs");
const http = require("http");
//const cors = require("cors");

const options = {
  key: fs.readFileSync("config/sslkeys/client-key.pem"),
  cert: fs.readFileSync("config/sslkeys/client-cert.pem")
};

const app = express();
const port = process.env.PORT || 3443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
//app.use(cors());
app.use("/api/facilities", facilities);
app.use("/api/token", token);
app.use("/api/login", login);
app.use("/api/userinfo", userinfo);
app.use("/api/patients", patients);
app.use("/api/logout", logout);
app.use("/api/webhooks", webhooks);

// console.log that your server is up and running
http.createServer(app).listen(80);
https.createServer(options, app).listen(3443);

console.log(`Listening on port ${port}`);
