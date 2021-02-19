const WebLink = require("../models/WebLink");

// @desc    Get all web-links
// @route   GET /api/v1/web-links
// @access  Public
exports.getWebLinks = async (req, res, next) => {
  try {
    const webLinks = await WebLink.find();
    res.status(200).json({
      success: true,
      count: webLinks.length,
      data: webLinks,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single web-link
// @route   GET /api/v1/web-links/:id
// @access  Public
exports.getWebLink = async (req, res, next) => {
  try {
    const webLink = await WebLink.findById(req.params.id);

    if (!webLink) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: webLink });
  } catch (error) {
    // res.status(400).json({ success: false });
    next(error);
  }
};

// @desc    Create new web-link
// @route   POST /api/v1/web-links/:id
// @access  Private
exports.createWebLink = async (req, res, next) => {
  try {
    const webLink = await WebLink.create(req.body);

    res.status(201).json({
      success: true,
      data: webLink,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};

// @desc    Update web-link
// @route   PUT /api/v1/web-links/:id
// @access  Private
exports.updateWebLink = async (req, res, next) => {
  try {
    const webLink = await WebLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!webLink) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: webLink });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

// @desc    Delete web-link
// @route   DELETE /api/v1/web-links/:id
// @access  Private
exports.deleteWebLink = async (req, res, next) => {
  try {
    const webLink = await WebLink.findByIdAndDelete(req.params.id);
    if (!webLink) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
