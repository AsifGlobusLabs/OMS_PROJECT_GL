const express = require("express");
const router = express.Router();
const employeeGroupController = require("../controllers/employeeGroupDetailsController");

// Get all employee groups
router.get("/", employeeGroupController.getAllEmployeeGroups);

// Add a new employee group
router.post("/", employeeGroupController.addEmployeeGroup);

// Update employee group's data
router.patch(
  "/update/:EmployeeGroupID",
  employeeGroupController.updateEmployeeGroup
);

// Deleting a employee group
router.delete(
  "/delete/:EmployeeGroupID",
  employeeGroupController.deleteEmployeeGroup
);

module.exports = router;
