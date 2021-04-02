const express = require("express");
const {
  eventController: {
    getEvent,
    createEvent,
    getAllData,
    updateData,
    deleteEvent,
    searchEvent,
    exportToExcel,
  },
} = require("../controllers");
const {
  schemaValidator: { validateRequest },
} = require("../middlewares");
const { endpointLogger } = require("../middlewares");
const {
  loggingService: { logRequest },
} = require("../services");

const { logEndpointCall } = endpointLogger;

const router = express.Router();

router.get("/", logEndpointCall, getAllData);
router.get("/search", logEndpointCall, searchEvent);
router.get("/export", logEndpointCall, exportToExcel);
router.get("/:id", logEndpointCall, getEvent);

router.post("/", logEndpointCall, validateRequest, createEvent);
router.put("/:id", logEndpointCall, validateRequest, updateData);

router.delete("/:id", logEndpointCall, deleteEvent);

endpointLogger.on("endpointCalled", logRequest);

module.exports = router;
