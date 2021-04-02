const express = require("express");
const {
  memberController: {
    createMember,
    getAllData,
    getMember,
    deleteMember,
    searchMember,
    updateData,
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
router.get("/search", logEndpointCall, searchMember);
router.get("/:id", logEndpointCall, getMember);

router.post("/", logEndpointCall, validateRequest, createMember);
router.put("/:id", logEndpointCall, validateRequest, updateData);

router.delete("/:id", logEndpointCall, deleteMember);

endpointLogger.on("endpointCalled", logRequest);

module.exports = router;
