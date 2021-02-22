const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const WebLink = require("../models/WebLink");

// @desc    Get all web-links
// @route   GET /api/v1/web-links
// @access  Public
exports.getWebLinks = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => {
    return `$${match}`;
  });

  // Finding resource
  query = WebLink.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await WebLink.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Excecuting query
  const webLinks = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: webLinks.length,
    pagination,
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
