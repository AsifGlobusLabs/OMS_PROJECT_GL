const express = require("express");
const router = express.Router();
const designationController = require("../controllers/designationController");

// Get all designation
router.get("/", designationController.getAllDesignations);

// Add a new designation
router.post("/", designationController.addDesignation);

// Get last designation Id
router.get("/lastDesignationId", designationController.getLastDesignationId);

// Update designation's data
router.patch("/update/:DesignationID", designationController.updateDesignation);

// Deleting designation's data
router.delete(
  "/delete/:DesignationID",
  designationController.deleteDesignation
);

module.exports = router;
