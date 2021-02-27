const express = require("express");
const router = express.Router();
const {
  getWebLinks,
  getWebLink,
  createWebLink,
  updateWebLink,
  deleteWebLink,
} = require("../controllers/web-links");

router.route("/").get(getWebLinks).post(createWebLink);
router.route("/:id").get(getWebLink).put(updateWebLink).delete(deleteWebLink);

module.exports = router;
