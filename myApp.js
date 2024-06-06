let express = require("express");
let app = express(); // Removed const keyword for consistency
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// Corrected middleware for logging
app.use((req, res, next) => {
  const logString = `${req.method} ${req.path} - ${req.ip}`;

  // Log the formatted string to the console
  console.log(logString);

  next();
});

// Serve static files
app.use("/", express.static(path.join(__dirname, "public")));

// Route handler for the root URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Route for serving JSON
app.get("/json", (req, res) => {
  let message = { message: "Hello json" };
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = { message: "HELLO JSON" };
  }
  res.json(message);
});
//middleware chaining
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    // Corrected line
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", (req, res) => {
  const { first, last } = req.body;
  res.json({ name: first + " " + last });
});

module.exports = app;
