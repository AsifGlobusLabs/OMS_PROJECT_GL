const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentControllers");

// get all Assignment
router.get("/", assignmentController.getAllAssignments); 

// get particular Assignment by their id
router.get("/:AssignmentID", assignmentController.getAssignmentById); 

// add Assignment
router.post("/", assignmentController.addAssignment);

// add Assignment with auto generated id
router.post("/withID", assignmentController.addAssignmentWithId);

// // add Assignment Data (Mitesh)
// router.post("/data", assignmentController.addAssignmentData );

// all data show with name(Mitesh)
router.get('/allData', assignmentController.getAssigmentEmployeesData);

// all data of assignment and tasks are clubbed together
router.get('/myTask', assignmentController.getAssigmentsAndTasksData);

// get last assignment id
router.get("/lastAssignmentId", assignmentController.getLastAssignmentId);

// get next assignment id
router.get("/nextAssignmentId", assignmentController.getNextAssignmentId);

// update assignment
router.patch("/update/:AssignmentID", assignmentController.updateAssignment);

// update assignment status to progress
router.patch("/:AssignmentID/progress", assignmentController.progressAssignmentStatus);

// update assignment status to completed
router.patch("/:AssignmentID/completed", assignmentController.completedAssignmentStatus);

// number of progress assignments
// router.get("/progress-assignments", assignmentController.numberOfProgressAssignments);

// number of progress assignments of an employee
// router.get("/:EmployeeID_AssignTo/progress-assignments", assignmentController.numberOfProgressAssignmentsOfAnEmployee);

// number of pending assignments
// router.get("/pending-assignments", assignmentController.numberOfPendingAssignments);

// number of pending assignments of an employee
// router.get("/:EmployeeID_AssignTo/pending-assignments", assignmentController.numberOfPendingAssignmentsOfAnEmployee);

// number of completed assignments
// router.get("/completed-assignments", assignmentController.numberOfCompletedAssignments);

// number of completed assignments of an employee
// router.get("/:EmployeeID_AssignTo/completed-assignments", assignmentController.numberOfCompletedAssignmentsOfAnEmployee);

// number of pending progress and completed assignments of an employee
router.get("/:EmployeeID_AssignTo/assignmentCounts", assignmentController.numberOfAssignmentsByStatus);

// delete assignment
router.delete("/delete/:AssignmentID", assignmentController.deleteAssignment);


module.exports = router;
