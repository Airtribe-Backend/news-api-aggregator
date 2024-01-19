const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

let port = 3000;

var morgan = require("morgan");
var path = require("path");
var rfs = require("rotating-file-stream"); // version 2.x

const authRouter = require("./routes/auth");
const newsAggregatorRoutes = require("./routes/preference");

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
// setup the logger
app.use(
  morgan(
    ":remote-addr - :remote-user [:date[web]] ':method :url HTTP/:http-version' :status :res[content-length] ':referrer' ':user-agent",
    { stream: accessLogStream }
  )
);

//User login and register
app.use("/auth", authRouter);

//Preferences
app.use("/users", newsAggregatorRoutes);

app.listen(port, (err) => {
  if (!err) {
    console.log(`server is running on port ${port}`);
  } else {
    console.log("some error encountered");
  }
});
