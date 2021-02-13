// @desc    Get all web-links
// @route   GET /api/v1/web-links
// @access  Public
exports.getWebLinks = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Get all web-links" });
};

// @desc    Get single web-link
// @route   GET /api/v1/web-links/:id
// @access  Public
exports.getWebLink = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Get single web-link ${req.params.id}` });
};

// @desc    Create new web-link
// @route   POST /api/v1/web-links/:id
// @access  Private
exports.createWebLink = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new web-link" });
};

// @desc    Update web-link
// @route   PUT /api/v1/web-links/:id
// @access  Private
exports.updateWebLink = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update web-link ${req.params.id}` });
};

// @desc    Delete web-link
// @route   DELETE /api/v1/web-links/:id
// @access  Private
exports.deleteWebLink = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete web-link ${req.params.id}` });
};
