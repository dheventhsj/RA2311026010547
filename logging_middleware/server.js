console.log("SERVER FILE LOADED");
const express = require('express');
const Log = require('./logger');

const app = express();

// middleware test route
app.get('/', async (req, res) => {
  console.log("Route hit START");

  try {
    await Log("backend", "info", "route", "Home route hit");
    console.log("Log function DONE");
  } catch (err) {
    console.log("Log error:", err.message);
  }

  res.send("Server running");
});

// KEEP SERVER ALIVE
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
setInterval(() => {}, 1000);