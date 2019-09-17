import express from "express";
import bodyParser from "body-parser";
import token from "./config/token";
import facilities from "./routes/api/facilities";
import login from "./routes/login";
import logout from "./routes/api/logout";
import userinfo from "./routes/api/userinfo";
import patients from "./routes/api/patients";
import webhooks from "./routes/api/webhooks";
import https from "https";
import fs from "fs";
import http from "http";

const options = {
  key: fs.readFileSync("./config/sslkeys/server.key"),
  cert: fs.readFileSync("./config/sslkeys/server.crt")
};

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const app = express();
const port = 8080;
const ssl_port = process.env.PORT || 3443;

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
http.createServer(app).listen(port);
https.createServer(options, app).listen(ssl_port);

console.log(`Listening on port ${ssl_port}`);
