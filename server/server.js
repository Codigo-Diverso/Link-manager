const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Link-manager API is running");
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
