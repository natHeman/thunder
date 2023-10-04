const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCont = require("../controller/user-controller");

router.route("/register").post(userCont.createRegister);

router.route("/login").post(userCont.createlogin);
router.route("/welcome").post(auth, userCont.welcome);
module.exports = router;
