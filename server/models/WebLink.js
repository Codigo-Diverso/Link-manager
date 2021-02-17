const mongoose = require("mongoose");

const WebLinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [75, "Name can not be more than 75 characters"],
    slug: String,
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  tags: [String],
  description: {
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
    slug: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WebLink", WebLinkSchema);