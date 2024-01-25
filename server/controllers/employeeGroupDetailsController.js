const db = require("../db");

// inserting employee group data

exports.addEmployeeGroup = (req, res) => {
  const newEmployeeGroup = req.body;
  const query = "INSERT INTO tb_employeegroup SET ?";
  db.query(query, newEmployeeGroup, (err, result) => {
    if (err) {
      console.error("Error executing query : ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "Employee group added successfully" });
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
    res.json(results);
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
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Employee not found" });
          return;
        } else if (result.affectedRows > 0 && result.changedRows === 0) {
          res.status(200).json("Data is up to date already");
          return;
        } else {
          res.json({ message: "Employee updated successfully" });
          console.log(result);
        }
      }
    }
  );
};

// Deleting employee group's data

exports.deleteEmployeeGroup = (req, res) => {
  const employeeGroupId = req.params.EmployeeGroupID;
  const query = "DELETE FROM tb_employeegroup WHERE EmployeeGroupID = ?";
  db.query(query, [employeeGroupId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Employee group not found" });
        return;
      } else {
        res.json({ message: "Employee's data deleted successfully" });
      }
    }
  });
};
