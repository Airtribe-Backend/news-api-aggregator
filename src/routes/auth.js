const express = require("express");
const app = express();
var bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var registeredUsers = require("../helpers/registeredUsers");

const preferences = require("./preference");
const apiNews = require("./apiNews");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/preferences", preferences);

app.use("/news", apiNews);

app.post(
  "/register",
  [
    // Validate and sanitize the 'username' field
    body("name").trim().escape().notEmpty(),

    // Validate and sanitize the 'email' field
    body("email").isEmail().normalizeEmail().notEmpty(),

    // Validate the 'password' field
    body("password").isLength({ min: 6 }).notEmpty(),

    //validate role not empty
    body("role").notEmpty(),
    body("preferences").notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If there are validation errors, respond with a 400 Bad Request status
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, preferences, created } = req.body;

    // Check if the user already exists
    const existingUser = registeredUsers.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).send("Bad Request: User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = {
      id: registeredUsers.length + 1,
      name,
      email,
      password: hashedPassword,
      role,
      preferences,
      created: Date.now,
    };

    registeredUsers.push(user);

    // Send a response
    res.status(201).send("User registered successfully");
  }
);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.post("/login", function (req, res) {
  let emailPassed = req.body.email;
  let passwordPassed = req.body.password;
  try {
    if (registeredUsers.length > 0) {
      const user = registeredUsers.find((val) => val.email === emailPassed);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      var passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
      if (!passwordIsValid) {
        return res.status(402).json({ message: "Invalid password!" });
      }

      var token = jwt.sign(
        {
          id: user.id,
        },
        "THIS IS SECRET",
        { expiresIn: 86400 }
      );

      return res.status(200).json({
        message: "Login successfull",
        user: { id: user.id },
        accessToken: token,
      });
    }
  } catch (e) {
    console.log(e);
  }
});
