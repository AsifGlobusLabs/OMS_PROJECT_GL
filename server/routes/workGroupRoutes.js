const express = require("express");
const router = express.Router();
const workGroupController = require("../controllers/workGroupController");

// Get all employee groups
router.get("/", workGroupController.getAllWorkGroups);

// Add a new employee group
router.post("/", workGroupController.addWorkGroup);

// Update employee group's data
router.patch(
  "/update/:WorkGroupID",
  workGroupController.updateWorkGroup
);

// Deleting a employee group
router.delete(
  "/delete/:WorkGroupID",
  workGroupController.deleteWorkGroup
);

module.exports = router;
