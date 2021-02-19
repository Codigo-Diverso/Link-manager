const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "../.env" });

// Load models
const WebLink = require("./models/WebLink");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const weblinks = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/web-links.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await WebLink.create(weblinks);
    console.log("Data imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await WebLink.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
