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
    res.status(200).json(results);
  });
};

// Getting all data of employees

exports.getAllDataOfEmployees = (req, res) => {
  const query = `SELECT
    e.*, u.Role, u.Username , d.DepartmentName, d2.DesignationName
    FROM
    tb_employee as e INNER JOIN tb_userdetails as u ON e.EmployeeID = u.EmployeeID INNER JOIN 
    tb_department as d ON e.DepartmentID = d.DepartmentID 
    INNER JOIN 
    tb_designation as d2 ON e.DesignationID = d2.DesignationID; `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const userEmployees = results.filter(
      (employee) => employee.Role === "User"
    );
    res.status(200).json(userEmployees);
  });
};

// Getting all data of employees by their employee id

exports.getAllDataOfEmployeesByEmployeeId = (req, res) => {
  const employeeId = req.params.EmployeeID;
  const query =
    "SELECT tb_employee.*, tb_userdetails.Role, tb_userdetails.Username FROM tb_employee INNER JOIN tb_userdetails ON tb_employee.EmployeeID = tb_userdetails.EmployeeID WHERE tb_employee.EmployeeID = ?";
  db.query(query, employeeId, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};




// // Getting data of employees with their department and designation name

// exports.getDataOfEmployeesWithTheirDNames = (req, res) => {
//   const employeeId = req.params.EmployeeID;
//   const query = "SELECT tb_employee.EmployeeID,tb_employee.FirstName,tb_employee.LastName,tb_employee.EmploymentStatus,tb_employee.DepartmentID,tb_department.DepartmentName,tb_employee.DesignationID,tb_designation.DesignationName FROM tb_employee JOIN tb_department ON tb_employee.DepartmentID = tb_department.DepartmentID JOIN tb_designation ON tb_employee.DesignationID = tb_designation.DesignationID WHERE tb_employee.EmployeeID = ?";
//   db.query(query, employeeId,(err, results) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }
//     res.status(200).json(results);
//   });
// };

// Getting data of employees with their department and designation name




exports.getDataOfEmployeesWithTheirDNames = (req, res) => {
  const query =
    "SELECT tb_employee.EmployeeID,tb_employee.FirstName,tb_employee.LastName,tb_employee.EmploymentStatus,tb_employee.Employee_Profile,tb_employee.DepartmentID,tb_department.DepartmentName,tb_employee.DesignationID,tb_designation.DesignationName FROM tb_employee JOIN tb_department ON tb_employee.DepartmentID = tb_department.DepartmentID JOIN tb_designation ON tb_employee.DesignationID = tb_designation.DesignationID";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(results);
  });
};

// Inserting employees data

exports.addEmployee = (req, res) => {
  const {
    FirstName,
    LastName,
    DateOfBirth,
    Gender,
    ContactNumber,
    Email,
    Address,
    JoinDate,
    EmploymentStatus,
    DepartmentID,
    DesignationID,
  } = req.body;
  const employeeProfile = req.file ? req.file.filename : null;

  const query =
    "SELECT MAX(SUBSTRING(EmployeeID, 4)) AS maxID FROM tb_employee";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error getting max EmployeeID: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    let nextID = 1;

    if (results && results[0].maxID !== null) {
      nextID = parseInt(results[0].maxID, 10) + 1;
    }

    const formattedID = `EMP${nextID.toString().padStart(3, "0")}`;

    EmployeeID = req.body.EmployeeID;
    EmployeeID = formattedID;

    const query = `INSERT INTO tb_employee 
  (EmployeeID, FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, JoinDate, Employee_Profile, EmploymentStatus, DepartmentID, DesignationID)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [
        EmployeeID,
        FirstName,
        LastName,
        DateOfBirth,
        Gender,
        ContactNumber,
        Email,
        Address,
        JoinDate,
        employeeProfile,
        EmploymentStatus,
        DepartmentID,
        DesignationID,
      ],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(201).json({ message: "Employee added successfully" });
        }
      }
    );
  });
};

// exports.addEmployee = (req, res) => {
//   const {
//     EmployeeID,
//     FirstName,
//     LastName,
//     DateOfBirth,
//     Gender,
//     ContactNumber,
//     Email,
//     Address,
//     JoinDate,
//     EmploymentStatus,
//     DepartmentID,
//     DesignationID
//   } = req.body;

//   // Ensure that a file was uploaded
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const employeeProfile = req.file.filename;

//   const query = `INSERT INTO tb_employee
//   (EmployeeID, FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, JoinDate, Employee_Profile, EmploymentStatus, DepartmentID, DesignationID)
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//   db.query(query, [EmployeeID, FirstName, LastName, DateOfBirth, Gender, ContactNumber, Email, Address, JoinDate, employeeProfile, EmploymentStatus, DepartmentID, DesignationID], (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       res.status(201).json({ message: "Employee added successfully" });
//     }
//   });
// };

// getting latest or last employee id

exports.getLastEmployeeId = (req, res) => {
  const query = "SELECT MAX(EmployeeID) AS maxID FROM tb_employee ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (results[0].maxID === null) {
      const EmployeeId = (results[0].maxID = "EMP000");
      res.status(200).json({ lastEmployeeId: EmployeeId });
      return;
    }
    const lastEmployeeId = results[0].maxID;
    res.status(200).json({ lastEmployeeId: lastEmployeeId });
  });
};

// getting next employee id

exports.getNextEmployeeId = (req, res) => {
  const query = "SELECT MAX(EmployeeID) AS maxID FROM tb_employee ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    let nextEmployeeId;
    if (results.length === 0 || results[0].maxID === null) {
      nextEmployeeId = "EMP001";
    } else {
      const lastEmployeeId = results[0].maxID;
      const numericPart = parseInt(lastEmployeeId.substr(3), 10) + 1;
      nextEmployeeId = "EMP" + numericPart.toString().padStart(3, "0");
    }

    res.status(200).json({ nextEmployeeId: nextEmployeeId });
  });
};

// updating employee's data

exports.updateEmployee = (req, res) => {
  const EmployeeID = req.params.EmployeeID;
  const updatedEmployee = req.body;
  // Check if a file is included in the request
  if (req.file) {
    updatedEmployee.Employee_Profile = req.file.filename;
  }
  const query = "UPDATE tb_employee SET ? WHERE EmployeeID = ?";

  db.query(query, [updatedEmployee, EmployeeID], (err, results) => {
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
      }
    }
  });
};

// Deleting employee's data

exports.deleteEmployee = (req, res) => {
  const employeeId = req.params.EmployeeID;
  const query = "DELETE FROM tb_employee WHERE EmployeeID = ?";
  db.query(query, [employeeId], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Employee not found" });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Employee's data deleted successfully" });
      }
    }
  });
};
