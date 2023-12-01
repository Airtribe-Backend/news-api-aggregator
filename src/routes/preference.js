const express = require("express");
const Router = express.Router();

const verifyToken = require("../middleware/authJWT");
var registeredUsers = require("../helpers/registeredUsers");

Router.get("/", verifyToken, (req, res) => {
  if (req.user) {
    const user = registeredUsers.find((user) => user.id == req.user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({
      message: "Preferences fetch successfully",
      preferences: user.preferences,
    });
  } else {
    return res.status(403).send({
      message: req.message,
    });
  }
});

Router.put("/", verifyToken, (req, res) => {
  if (req.user) {
    const newRegisteredUsers = registeredUsers.map((user) => {
      if (user.id == req.user) {
        user.preferences = req.body.preferences;
      }
      return user;
    });
    registeredUsers = newRegisteredUsers;
    return res.status(200).send({
      message: "Preferences updated successfully",
    });
  } else {
    return res.status(403).send({
      message: req.message,
    });
  }
});

module.exports = Router;
