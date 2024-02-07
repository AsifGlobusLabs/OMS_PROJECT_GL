const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentControllers");

// get all user details
router.get("/", assignmentController.getAllAssignments); 

// add user details
router.post("/", assignmentController.addAssignment);


// add user details Data (Mitesh)
router.post("/data", assignmentController.addAssignmentData );


// all data show with name
router.get('/allData', assignmentController.getAssigmentEmployeesData);

// get all user details
router.get("/lastAssignmentId", assignmentController.getLastAssignmentId);

// update user details
router.patch("/update/:AssignmentID", assignmentController.updateAssignment);

// delete user details
router.delete("/delete/:AssignmentID", assignmentController.deleteAssignment);


module.exports = router;
