const endpointsData = require("../endpoints.json");

// Get all endpoints
exports.getEndpoints = (req, res) => {
  try {
    res.status(200).json(endpointsData);
  } catch (err) {
    console.error("Error serving endpoints:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};
