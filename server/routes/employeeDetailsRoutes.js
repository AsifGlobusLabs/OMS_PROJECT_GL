const express = require("express");
const router = express.Router();
const auth = require("../midderware/auth");
const employeeController = require("../controllers/employeeDetailsController");

// Define routes related to employees

// Get all employees
router.get("/", employeeController.getAllEmployees);

// Get all data of employees
router.get("/allData",employeeController.getAllDataOfEmployees);

// Get all data of employees by their employee id
router.get("/allData/:EmployeeID",employeeController.getAllDataOfEmployeesByEmployeeId);

// Add a new employee
router.post("/", employeeController.addEmployee);

// Get latest employee id
router.get("/lastEmployeeId", employeeController.getLastEmployeeId);

// Update employee's data
router.patch("/update/:EmployeeID", employeeController.updateEmployee);

// Deleting employee's data
router.delete("/delete/:EmployeeID", employeeController.deleteEmployee);

module.exports = router;
