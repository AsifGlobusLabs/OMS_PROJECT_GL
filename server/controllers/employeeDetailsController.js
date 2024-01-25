const db = require("../db");

// Getting all employees data

exports.getAllEmployees = (req, res) => {
  const query = "SELECT * FROM tb_employee";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
    console.log(results);
  });
};

// Inserting employees data

exports.addEmployee = (req, res) => {
  const newEmployee = req.body;

  const query = "INSERT INTO tb_employee SET ?";
  db.query(query, newEmployee, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Employee added successfully" });
    }
  });
};

// getting latest or last employee id

exports.getLastEmployeeId = (req, res) => {
  const query =
    "SELECT EmployeeID FROM tb_employee ORDER BY EmployeeID DESC LIMIT 1";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: "No employees found" });
      return;
    }
    const lastEmployeeId = results[0].EmployeeID;
    // console.log(lastEmployeeId);
    // // res.json({ lastEmployeeId });
    res.status(200).json(lastEmployeeId);
  });
};

// updating employee's data

exports.updateEmployee = (req, res) => {
  const EmployeeID = req.params.EmployeeID;
  const updatedEmployee = req.body;
  const query = "UPDATE tb_employee SET ? WHERE EmployeeID = ?";

  db.query(query, [updatedEmployee, EmployeeID], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
        return;
      } else if (result.affectedRows > 0 && result.changedRows === 0) {
        res.status(201).json("Data is up to date already");
        return;
      } else {
        res.json({ message: "Employee updated successfully" });
        console.log(result);
      }
    }
  });
};

// Deleting employee's data

exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.EmployeeID;
  const query = "DELETE FROM tb_employee WHERE EmployeeID = ?";
  db.query(query, [employeeId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
        return;
      } else {
        res.json({ message: "Employee's data deleted successfully" });
      }
    }
  });
};
