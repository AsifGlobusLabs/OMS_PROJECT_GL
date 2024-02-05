const express = require("express");
const router = express.Router();
const workGroupController = require("../controllers/workGroupController");

// Get all employee groups
router.get("/", workGroupController.getAllWorkGroups);


//get all data from employee table using join
router.get("/allData", workGroupController.getAllworkGroupEmployeesData);


// Get all data about a particular group
router.get("/:EmployeeID_Assigner", workGroupController.getAllDataOfGroup);

// Add a new employee group
router.post("/", workGroupController.addWorkGroup);

// Update employee group's data
router.patch("/update/:WorkGroupID", workGroupController.updateWorkGroup);

// Deleting a employee group
router.delete("/delete/:WorkGroupID", workGroupController.deleteWorkGroup);

module.exports = router;
