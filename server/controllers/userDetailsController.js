const db = require("../db");

// inserting user details

exports.addUserDetails = (req, res) => {
  const newUserDetails = req.body;
  const query = "INSERT INTO tb_userdetails SET ?";
  db.query(query, newUserDetails, (err, results) => {
    if (err) {
      console.error("Error executing query : ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(201).json({ message: "User details added successfully" });
    }
  });
};

// getting all user details

exports.getAllUserDetails = (req, res) => {
  const query = "SELECT * FROM tb_userdetails";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query : ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
};

// updating user details

exports.updateUserDetails = (req, res) => {
  const userId = req.params.UserID;
  const updatedUserDetails = req.body;
  const query = "UPDATE tb_userdetails SET ? WHERE UserID = ?";
  db.query(query, [updatedUserDetails, userId], (err, results) => {
    if (err) {
      console.error("Error executing query : ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res.status(200).json({ message: "User Data is up to date already" });
        return;
      } else {
        res.status(200).json({ message: "User details updated successfully" });
        console.log(results);
      }
    }
  });
};

// Deleting employee group's data

exports.deleteUserDetails = (req, res) => {
  const userId = req.params.UserID;
  const query = "DELETE FROM tb_userdetails WHERE UserID = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "User details not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Selected user details deleted successfully" });
      }
    }
  });
};
