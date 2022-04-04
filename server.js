// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Require cors allows us to manage a Cross-origin resource sharing policy so that our front end can talk to the server.
const cors = require("cors");

// Require body-parser to allow the backend to access JSON data sent from the client
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable cors requisites
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Callback function to  getData
app.get("/getData", (req, res) => {
  res.send(projectData);
});

app.post("/sendData", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});

// setup the port and console.log the url to the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
