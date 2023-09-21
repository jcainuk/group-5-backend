const express = require("express");
const endpointsRouter = express.Router();

const { getEndpoints } = require("../controllers/endpointsController");

endpointsRouter.get("/", getEndpoints);

module.exports = endpointsRouter;
