const express = require("express");
const Router = express.Router();
const verifyToken = require("../middleware/authJWT");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("61432c925d0f488bb118b8c7e9ad605f");
const registeredUsers = require("../helpers/registeredUsers");
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

Router.get("/", verifyToken, (req, res) => {
  if (!req.user) {
    return res.status(403).send({ message: req.message });
  }

  const user = registeredUsers.find((user) => user.id == req.user);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const userPreferences = user.preferences;
  const promiseArray = [];
  userPreferences.forEach((preference) => {
    const promise = newsapi.v2.topHeadlines({
      category: preference,
      language: "en",
    });
    promiseArray.push(promise);
  });

  Promise.all(promiseArray).then((result) => {
    return res.status(200).send({
      preferencesNews: result,
      message: "fetch preferences news successfully",
    });
  });
});

module.exports = Router;
