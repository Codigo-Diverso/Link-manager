require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
// Route files
const webLinks = require("./routes/web-links");

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/web-links", webLinks);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Super basic server listening at http://localhost:${PORT}`);
});
