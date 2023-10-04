const express = require("express");
const userService = require("../controller/user.service");
const Role = require("../middleware/role");

// routes
// router.post("/authenticate", authenticate); // public route
// router.get("/", authorize(Role.Admin), getAll); // admin only
// router.get("/:id", authorize(), getById); // all authenticated users
// module.exports = router;

exports.authenticate = async (req, res, next) => {
  // function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
};
exports.getAll = async (req, res, next) => {
  // function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
};

exports.getById = async (req, res, next) => {
  // function getById(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id);

  // only allow admins to access other user records
  if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
};
