const db = require("../db");

// inserting work group data

exports.addWorkGroup = (req, res) => {
  const newWorkGroup = req.body;

  const getMaxWorkGroupIDQuery =
    "SELECT MAX(SUBSTRING(WorkGroupID, 3)) AS maxID FROM tb_workGroup";

  db.query(getMaxWorkGroupIDQuery, (err, results) => {
    if (err) {
      console.error("Error getting max WorkGroupID: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `WG${nextID.toString().padStart(3, "0")}`;

    newWorkGroup.WorkGroupID = formattedID;

    const insertQuery = "INSERT INTO tb_workGroup SET ?";

    db.query(insertQuery, newWorkGroup, (err, results) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(201).json({ message: "Work group added successfully" });
      }
    });
  });
};



//get all data form employees table

exports.getAllworkGroupEmployeesData = (req, res) => {
  const query = `
    SELECT 
        w.*, 
        e1.FirstName AS Assigner_FirstName, 
        e1.LastName AS Assigner_LastName,
        e2.FirstName AS Assignee_FirstName,
        e2.LastName AS Assignee_LastName,
        d.DepartmentName AS Department_Name
    FROM 
        tb_workGroup AS w
    INNER JOIN 
        tb_employee AS e1 ON w.EmployeeID_Assigner = e1.EmployeeID
    INNER JOIN
        tb_employee AS e2 ON w.EmployeeID_AssignTo = e2.EmployeeID
    INNER JOIN
        tb_department AS d ON w.DepartmentID_AssignTo = d.DepartmentID;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json(results);
  });
};






// Getting all work group's data

exports.getAllWorkGroups = (req, res) => {
  const query = "SELECT * FROM tb_workGroup ";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// Getting all data of a particular group

exports.getAllDataOfGroup = (req, res) => {
  const employeeIdAssigner = req.params.EmployeeID_Assigner;
  const query = "SELECT * FROM tb_workGroup WHERE EmployeeID_Assigner = ?";
  db.query(query, employeeIdAssigner, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};
// updating work group's data

exports.updateWorkGroup = (req, res) => {
  const workGroupId = req.params.WorkGroupID;
  const updatedWorkGroupData = req.body;
  const query = "UPDATE tb_workGroup SET ? WHERE WorkGroupID = ?";
  db.query(query, [updatedWorkGroupData, workGroupId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "work group not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "work group updated successfully" });
      }
    }
  });
};

// Deleting work group's data

exports.deleteWorkGroup = (req, res) => {
  const workGroupId = req.params.WorkGroupID;
  const query = "DELETE FROM tb_workGroup WHERE WorkGroupID = ?";
  db.query(query, [workGroupId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Working group not found" });
        return;
      } else {
        res.status(200).json({ message: "Desired group deleted successfully" });
      }
    }
  });
};
