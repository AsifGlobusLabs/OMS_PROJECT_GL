const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentControllers");

// get all Assignment
router.get("/", assignmentController.getAllAssignments); 

// add Assignment
router.post("/", assignmentController.addAssignment);

// add Assignment Data (Mitesh)
router.post("/data", assignmentController.addAssignmentData );

// all data show with name(Mitesh)
router.get('/allData', assignmentController.getAssigmentEmployeesData);

// get last assignment id
router.get("/lastAssignmentId", assignmentController.getLastAssignmentId);

// update assignment
router.patch("/update/:AssignmentID", assignmentController.updateAssignment);

// update assignment status to progress
router.patch("/:AssignmentID/progress", assignmentController.progressAssignmentStatus);

// update assignment status to completed
router.patch("/:AssignmentID/completed", assignmentController.completedAssignmentStatus);

// delete assignment
router.delete("/delete/:AssignmentID", assignmentController.deleteAssignment);


module.exports = router;
