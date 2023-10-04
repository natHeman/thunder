var dotenv = require("dotenv").config({ path: "./.env" });
var mongoose = require("mongoose");
const app = require("./app");
// console.log(process.env.NODE_ENV);
// this is to check the env path
// console.log(require('dotenv').config());
// for pipe you need to press altGR+shift+pipe

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("Connect to database !!");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;
app.listen(4000, () => {
  console.log("Port is running on 4000");
});
