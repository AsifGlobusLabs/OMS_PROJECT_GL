const db = require("../db");

// inserting employee group data

exports.addEmployeeGroup = (req, res) => {
  const newEmployeeGroup = req.body;
  const query = "INSERT INTO tb_employeegroup SET ?";
  db.query(query, newEmployeeGroup, (err, results) => {
    if (err) {
      console.error("Error executing query : ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json({ message: "Employee group added successfully" });
    }
  });
};

// Getting all employees data

exports.getAllEmployeeGroups = (req, res) => {
  const query = "SELECT * FROM tb_employeegroup ";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
    console.log(results);
  });
};

// updating employee group's data

exports.updateEmployeeGroup = (req, res) => {
  const employeeGroupId = req.params.EmployeeGroupID;
  const updatedEmployeeGroupData = req.body;
  const query = "UPDATE tb_employeegroup SET ? WHERE EmployeeGroupID = ?";
  db.query(
    query,
    [updatedEmployeeGroupData, employeeGroupId],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({ error: "Employee not found" });
          return;
        } else if (results.affectedRows > 0 && results.changedRows === 0) {
          res.status(200).json("Data is up to date already");
          return;
        } else {
          res.status(200).json({ message: "Employee updated successfully" });
          console.log(results);
        }
      }
    }
  );
};

// Deleting employee group's data

exports.deleteEmployeeGroup = (req, res) => {
  const employeeGroupId = req.params.EmployeeGroupID;
  const query = "DELETE FROM tb_employeegroup WHERE EmployeeGroupID = ?";
  db.query(query, [employeeGroupId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Employee group not found" });
        return;
      } else {
        res.status(200).json({ message: "Employee's data deleted successfully" });
      }
    }
  });
};
