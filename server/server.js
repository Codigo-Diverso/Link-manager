const path = require("path");
require("dotenv").config({
  path: path.resolve("./server/config/config.env"),
});
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Link-manager API is running");
});

app.get("/api", (req, res) => {
  res.send("This is link-manager API");
});
app.get("/api/resources", (req, res) => {
  res.send("Fetching all resources");
});

app.get("api/resources/:id", (req, res) => {
  res.send("Fetching a resource");
});

app.listen(PORT, () => {
  console.log(`Super basic server listening at http://localhost:${PORT}`);
});
