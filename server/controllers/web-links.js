const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const WebLink = require("../models/WebLink");

// @desc    Get all web-links
// @route   GET /api/v1/web-links
// @access  Public
exports.getWebLinks = asyncHandler(async (req, res, next) => {
  const webLinks = await WebLink.find();
  res.status(200).json({
    success: true,
    count: webLinks.length,
    data: webLinks,
  });
});

// @desc    Get single web-link
// @route   GET /api/v1/web-links/:id
// @access  Public
exports.getWebLink = asyncHandler(async (req, res, next) => {
  const webLink = await WebLink.findById(req.params.id);

  if (!webLink) {
    return new ErrorResponse(
      `Weblink not found with id of ${req.params.id}`,
      404
    );
  }

  res.status(200).json({ success: true, data: webLink });
});

// @desc    Create new web-link
// @route   POST /api/v1/web-links/:id
// @access  Private
exports.createWebLink = asyncHandler(async (req, res, next) => {
  try {
    const webLink = await WebLink.create(req.body);

    res.status(201).json({
      success: true,
      data: webLink,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update web-link
// @route   PUT /api/v1/web-links/:id
// @access  Private
exports.updateWebLink = asyncHandler(async (req, res, next) => {
  try {
    const webLink = await WebLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!webLink) {
      return new ErrorResponse(
        `Weblink not found with id of ${req.params.id}`,
        404
      );
    }
    res.status(200).json({ success: true, data: webLink });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete web-link
// @route   DELETE /api/v1/web-links/:id
// @access  Private
exports.deleteWebLink = asyncHandler(async (req, res, next) => {
  try {
    const webLink = await WebLink.findByIdAndDelete(req.params.id);
    if (!webLink) {
      return new ErrorResponse(
        `Weblink not found with id of ${req.params.id}`,
        404
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
});
