require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Connect to database
connectDB();

// Route files
const webLinks = require("./routes/web-links");

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/web-links", webLinks);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
