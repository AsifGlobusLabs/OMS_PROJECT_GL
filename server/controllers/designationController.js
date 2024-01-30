const db = require("../db");

// Getting all designations

exports.getAllDesignations = (req, res) => {
  const query = "SELECT * FROM tb_designation";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// Inserting designation

exports.addDesignation = (req, res) => {
  const newDesignation = req.body;

  const query = "INSERT INTO tb_designation SET ?";
  db.query(query, newDesignation, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Designation added successfully" });
    }
  });
};

// updating designation's data

exports.updateDesignation = (req, res) => {
  const designationId = req.params.DesignationID;
  const updatedDesignation = req.body;
  const query = "UPDATE tb_designation SET ? WHERE DesignationID = ?";

  db.query(query, [updatedDesignation, designationId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Designation not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json("Designation's data is up to date already");
        return;
      } else {
        res.status(200).json({ message: "Designation updated successfully" });
      }
    }
  });
};

// Deleting designation's data

exports.deleteDesignation = (req, res) => {
  const designationId = req.params.DesignationID;
  const query = "DELETE FROM tb_designation WHERE DesignationID = ?";
  db.query(query, [designationId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Designation not found" });
        return;
      } else {
        res.status(200).json({ message: "Designation's data deleted successfully" });
      }
    }
  });
};
