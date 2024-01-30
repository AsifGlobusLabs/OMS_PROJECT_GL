const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SECRET_KEY = 'GLOBUSLABS_RND_OMS_PROJECT'

// inserting user details

exports.addUserDetails = async (req, res) => {
  const { UserID, EmployeeID, Role, Username, Password, confirm_password } =
    req.body;

  if (Password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }
  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const query =
      "INSERT INTO tb_userdetails (UserID, EmployeeID, Role, Username, Password) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [UserID, EmployeeID, Role, Username, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          console.log("User registered successfully");
          res.status(201).json({ message: "User registered successfully" });
        }
      }
    );
  } catch (hashError) {
    console.error("Error hashing password:", hashError);
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
  const userId = req.params.UserID;
  const updatedUserDetails = req.body;

  // Hash the password if it is provided in the request body
  if (updatedUserDetails.Password) {
    updatedUserDetails.Password = await bcrypt.hash(
      updatedUserDetails.Password,
      10
    );
  }

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
      }
    }
  });
};

// Deleting user details

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

exports.loginUser = async (req, res) => {
  const { UserID, Password } = req.body;

  // Fetch user from the database based on the email
  const query = "SELECT * FROM tb_userdetails WHERE UserID = ?";

  db.query(query, [UserID], async (err, results) => {
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
              UserId: user.UserID,
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
              UserID: user.UserID,
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
        console.log("User not found");
        res.status(404).json({ error: "User not found" });
      }
    }
  });
};


// getting latest or last User id

exports.getLastUserId = (req, res) => {
  const query =
    "SELECT UserID FROM tb_userdetails ORDER BY UserID DESC LIMIT 1";

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
    const lastUserId = results[0].UserID;
    res.status(200).json({ lastUserId:lastUserId });
  });
};
