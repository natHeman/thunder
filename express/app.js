const express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
const cors = require("cors");

// var tourRouters = require('./routers/tourrouter.js');
// var userRouters = require('./routers/userrouter.js');

var User = require("./router/user-router");
// var UserRole = require("./router/user-role-router");
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));
// app.use(logger());

// ourowm middlewar it will be added into all api request

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// this midle where is use to log  api request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/user", User);
// app.use("/api/v1/userrole", UserRole);
// app.use('/api/v1/users', userRouters);

module.exports = app;
