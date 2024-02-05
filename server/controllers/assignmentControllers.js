const db = require("../db");

// Getting all assignment

exports.getAllAssignments = (req, res) => {
  const query = "SELECT * FROM tb_assignment";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Inserting assignment

exports.addAssignment = (req, res) => {
  const newassignment = req.body;

  const query = "INSERT INTO tb_assignment SET ?";
  db.query(query, newassignment, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Assignment added successfully" });
    }
  });
};


// // getting latest or last department id

// exports.getLastDepartmentId = (req, res) => {
//   const query =
//     "SELECT MAX(DepartmentID) AS maxID FROM tb_department ";

//   db.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).json({ error: "There is not any department found" });
//       return;
//     }
//     const lastDepartmentId = results[0].maxID;
//     res.status(200).json({ lastDepartmentId: lastDepartmentId });
//   });
// };

// updating assignment's data

exports.updateAssignment = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const updatedAssignment = req.body;
  const query = "UPDATE tb_assignment SET ? WHERE AssignmentID = ?";

  db.query(query, [updatedAssignment, assignmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Assignment's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Assignment updated successfully" });
      }
    }
  });
};

// Deleting Assignment's data

exports.deleteAssignment = (req, res) => {
  const assignmentId = req.params.AssignmentID;
  const query = "DELETE FROM tb_assignment WHERE AssignmentID = ?";
  db.query(query, [assignmentId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Assignment not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Assignment deleted successfully" });
      }
    }
  });
};
