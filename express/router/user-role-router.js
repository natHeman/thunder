const express = require("express");
const router = express.Router();
const authorize = require("../middleware/roleauth");

const userCont = require("../controller/user-role-controller");
const Role = require("../middleware/role");

router.route("/register").post(userCont.createRegister);

router.route("/login").post(userCont.createlogin);
router.route("/welcome").post(auth, userCont.welcome);

// router.post("/authenticate", userCont.authenticate); // public route
// router.get("/", authorize(Role.Admin), userCont.getAll); // admin only
// router.get("/:id", authorize(), userCont.getById);

router.route("/authenticate").post(userCont.authenticate);
router.route("/").get(authorize(Role.Admin), userCont.getAll);
router.route("/:id").get(authorize(), userCont.getById);
module.exports = router;
