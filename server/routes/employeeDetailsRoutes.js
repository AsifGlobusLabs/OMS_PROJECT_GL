const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeDetailsController');

// Define routes related to employees

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Add a new employee
router.post('/', employeeController.addEmployee);

// Update employee's data
router.patch('/update/:EmployeeID', employeeController.updateEmployee);

// Deleting employee's data
router.delete('/delete/:EmployeeID', employeeController.deleteEmployee);

module.exports = router;
