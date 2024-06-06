let express = require("express");
let app = express(); // Removed const keyword for consistency
const path = require("path");
require("dotenv").config();

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
app.get("/now");

module.exports = app;
