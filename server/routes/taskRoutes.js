const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

// get all user details
router.get("/", taskController.getAllTasks);

// add user details
router.post("/", taskController.addTask);

// get all user details
router.get("/lastTaskId", taskController.getLastTaskId);

// update user details
router.patch("/update/:TaskID", taskController.updateTask);

// delete user details
router.delete("/delete/:TaskID", taskController.deleteTask);


module.exports = router;
