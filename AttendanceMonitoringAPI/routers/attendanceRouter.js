const express = require("express");
const {
  attendanceController: {
    createAttendance,
    getAllData,
    deleteData,
    updateAttendance,
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

router.post("/", logEndpointCall, validateRequest, createAttendance);
router.put("/:id", logEndpointCall, validateRequest, updateAttendance);

router.delete("/:id", logEndpointCall, deleteData);

endpointLogger.on("endpointCalled", logRequest);

module.exports = router;
