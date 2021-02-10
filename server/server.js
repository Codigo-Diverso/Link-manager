const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Link-manager");
});

app.listen(port, () => {
  console.log(`Super basic server listening at http://localhost:${port}`);
});
