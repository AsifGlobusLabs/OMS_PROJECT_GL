const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// inserting user details

exports.addUserDetails = async (req, res) => {
  const { EmployeeID, Role, Username, Password, confirm_password } = req.body;

  if (Password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const query =
      "INSERT INTO tb_userdetails (EmployeeID, Role, Username, Password) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [EmployeeID, Role, Username, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        console.log("User registered successfully");
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

exports.updateUserDetails = async (req, res) => {
  const employeeId = req.params.EmployeeID;
  const updatedUserDetails = req.body;

  // Hash the password if it is provided in the request body
  if (updatedUserDetails.Password) {
    updatedUserDetails.Password = await bcrypt.hash(
      updatedUserDetails.Password,
      10
    );
  }

  const query = "UPDATE tb_userdetails SET ? WHERE EmployeeID = ?";

  db.query(query, [updatedUserDetails, employeeId], (err, results) => {
    if (err) {
      console.error("Error executing query : ", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
        return;
      } else if (results.affectedRows > 0 && results.changedRows === 0) {
        res
          .status(200)
          .json({ message: "Employee's Data is up to date already" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Employee details updated successfully" });
      }
    }
  });
};

// Deleting user details

exports.deleteUserDetails = (req, res) => {
  const employeeId = req.params.EmployeeID;
  const query = "DELETE FROM tb_userdetails WHERE EmployeeID = ?";
  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Employee details not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Selected employee details deleted successfully" });
      }
    }
  });
};

exports.loginUser = async (req, res) => {
  const { EmployeeID, Password } = req.body;

  // Fetch user from the database based on the email
  const query = "SELECT * FROM tb_userdetails WHERE EmployeeID = ?";

  db.query(query, [EmployeeID], async (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length > 0) {
        const user = results[0];

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(Password, user.Password);

        if (passwordMatch) {
          // Passwords match, generate JWT token
          const token = jwt.sign(
            {
              Username: user.Username,
              EmployeeID: user.EmployeeID,
              Role: user.Role,
            },
            process.env.SECRET_KEY || SECRET_KEY,
            { expiresIn: "1h" }
          );
          res.cookie("token", token, { httpOnly: true });

          // Avoid logging sensitive information
          console.log("User authenticated successfully");

          res.json({
            message: "Login successful",
            user: {
              EmployeeID: user.EmployeeID,
              Username: user.Username,
              Role: user.Role,
            },
            token,
          });
        } else {
          // Passwords do not match
          console.log("Invalid password");
          res.status(401).json({ error: "Invalid password" });
        }
      } else {
        // User not found
        console.log("Employee not found");
        res.status(404).json({ error: "Employee not found" });
      }
    }
  });
};

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
