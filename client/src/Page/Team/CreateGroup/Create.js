// import React, { useEffect, useState } from "react";
// import {
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import profile from "./profilenn.png";
// import { Card } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import SideBar from "../../../Component/SideBar";
// import Box from "@mui/material/Box";
// import { Typography, TextField } from "@mui/material";
// import AddTeams from "./AddTeams";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// const Create = () => {
//   const { EmployeeID } = useParams();
//   const [item, setItem] = useState(null);
//   const [error, setError] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [departmentData, setDepartmentData] = useState(null);

//   const [assignedEmployees, setAssignedEmployees] = useState([]);

//   // Function to update assignedEmployees state
//   const updateAssignedEmployees = (employees) => {
//     setAssignedEmployees(employees);
//   };

//   useEffect(() => {
//     // Fetch departments from the backend when the component mounts
//     fetch("http://localhost:3306/api/department")
//       .then((response) => response.json())
//       .then((data) => setDepartments(data))
//       .catch((error) => console.error("Error fetching departments:", error));
//   }, []);

//   // Handle department selection
//   const handleDepartmentSelect = (department) => {
//     setSelectedDepartment(department);
//     fetch(
//       `http://localhost:3306/api/employee/dNames?department=${department.DepartmentName}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const filteredData = data.filter(
//           (employee) => employee.DepartmentID === department.DepartmentID
//         );
//         setDepartmentData(filteredData);
//       })
//       .catch((error) =>
//         console.error("Error fetching department data:", error)
//       );
//   };

//   // Add employee to the team
//   const handleAddToTeam = async (employeeID) => {
//     const selectedEmployee = departmentData.find(
//       (item) => item.EmployeeID === employeeID
//     );

//     const requestData = {
//       EmployeeID_Assigner: item.map((item) => item.EmployeeID),
//       EmployeeID_AssignTo: selectedEmployee.EmployeeID,
//       DepartmentID_AssignTo: selectedEmployee.DepartmentID,
//       CreatedDate: new Date().toISOString(),
//       CreatedBy: "Admin",
//     };

//     try {
//       const response = await fetch("http://localhost:3306/api/workGroup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       console.log("Employee added to the team successfully");
//     } catch (error) {
//       console.error("Error adding employee to the team:", error);
//     }
//   };

//   // who is assign his data is not show
//   const filteremployeData = departmentData
//     ? departmentData.filter(
//         (employee) =>
//           !assignedEmployees.some(
//             (assignedEmployee) =>
//               assignedEmployee.EmployeeID_AssignTo === employee.EmployeeID
//           )
//       )
//     : [];

//   // Data show in Table
//   const filteredDepartmentData = filteremployeData
//     ? filteremployeData.filter(
//         (employee) =>
//           !item.map((item) => item.EmployeeID).includes(employee.EmployeeID)
//       )
//     : [];

//   useEffect(() => {
//     // Fetch employee data based on EmployeeID from the URL parameter
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3306/api/employee/allData/${EmployeeID}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setItem(data);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, [EmployeeID]);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!item) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           <Typography variant="h5" sx={{ textAlign: "start" }}>
//             CREATE TEAM
//           </Typography>
//           <TextField
//             label="Search"
//             variant="outlined"
//             style={{ height: "10px" }} // Adjust the height value as needed
//           />
//         </div>

//         <br></br>

//         <Box
//           className="createTeam-container"
//           sx={{
//             display: "flex",
//             justifyContent: "flex-start",
//             marginTop: "10px",
//             padding: "10px",
//           }}
//         >
//           {item.map((items) => (
//             <Card
//               key={items.EmployeeID}
//               sx={{ width: 200, height: 200, margin: "10px", padding: "10px" }}
//             >
//               <CardActionArea>
//                 <Box sx={{ display: "flex", justifyContent: "center" }}>
//                   <CardMedia
//                     component="img"
//                     image={profile}
//                     alt="profile"
//                     sx={{ height: "100px", width: "100px" }}
//                   />
//                 </Box>
//                 <CardContent sx={{ textAlign: "center" }}>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {items.FirstName} {items.LastName}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {items.EmployeeID}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions
//                 sx={{ display: "flex", justifyContent: "center" }}
//               ></CardActions>
//             </Card>
//           ))}
//           <Box sx={{ marginLeft: "10px" }}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "flex-start",
//               }}
//             >
//               <div style={{ width: "30%" }}>
//                 <DropdownButton
//                   id="dropdown-basic-button"
//                   title={
//                     selectedDepartment
//                       ? selectedDepartment.DepartmentName
//                       : "Select Department"
//                   }
//                 >
//                   <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//                     {departments.map((department) => (
//                       <Dropdown.Item
//                         key={department.DepartmentID}
//                         onClick={() => handleDepartmentSelect(department)}
//                       >
//                         {department.DepartmentName}
//                       </Dropdown.Item>
//                     ))}
//                   </div>
//                 </DropdownButton>
//               </div>
//               <div style={{ width: "700px" }}>
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Employee ID</TableCell>
//                         <TableCell>Name</TableCell>
//                         <TableCell>Designation</TableCell>
//                         <TableCell>Status</TableCell>
//                         <TableCell>Add</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {filteredDepartmentData.map((employee) => (
//                         <TableRow key={employee.EmployeeID}>
//                           <TableCell>{employee.EmployeeID}</TableCell>
//                           <TableCell>
//                             {employee.FirstName} {employee.LastName}
//                           </TableCell>
//                           <TableCell>{employee.DesignationName}</TableCell>
//                           <TableCell>{employee.EmploymentStatus}</TableCell>
//                           <TableCell
//                             sx={{
//                               fontSize: "18px",
//                               color: "green",
//                               cursor: "pointer",
//                             }}
//                             onClick={() => handleAddToTeam(employee.EmployeeID)}
//                           >
//                             <AddCircleOutlineIcon />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </div>
//             </div>
//           </Box>
//         </Box>
//         <AddTeams
//           sdata={item}
//           updateAssignedEmployees={updateAssignedEmployees}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Create;
import React, { useEffect, useState } from "react";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import profile from "./profilenn.png";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import Box from "@mui/material/Box";
import { Typography, TextField } from "@mui/material";
import AddTeams from "./AddTeams";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Create = () => {
  const { EmployeeID } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // 1. State for Success Message

  // Function to update assignedEmployees state
  const updateAssignedEmployees = (employees) => {
    setAssignedEmployees(employees);
  };

  useEffect(() => {
    // Fetch departments from the backend when the component mounts
    fetch("http://localhost:3306/api/department")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    fetch(
      `http://localhost:3306/api/employee/dNames?department=${department.DepartmentName}`
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (employee) => employee.DepartmentID === department.DepartmentID
        );
        setDepartmentData(filteredData);
      })
      .catch((error) =>
        console.error("Error fetching department data:", error)
      );
  };

  // Add employee to the team
  const handleAddToTeam = async (employeeID) => {
    const selectedEmployee = departmentData.find(
      (item) => item.EmployeeID === employeeID
    );

    const requestData = {
      EmployeeID_Assigner: item.map((item) => item.EmployeeID),
      EmployeeID_AssignTo: selectedEmployee.EmployeeID,
      DepartmentID_AssignTo: selectedEmployee.DepartmentID,
      CreatedDate: new Date().toISOString(),
      CreatedBy: "Admin",
    };

    try {
      const response = await fetch("http://localhost:3306/api/workGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setSuccessMessage("Employee added to the team successfully"); // 3. Update success message state
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error adding employee to the team:", error);
    }
  };

  // who is assign his data is not show
  const filteremployeData = departmentData
    ? departmentData.filter(
        (employee) =>
          !assignedEmployees.some(
            (assignedEmployee) =>
              assignedEmployee.EmployeeID_AssignTo === employee.EmployeeID
          )
      )
    : [];

  // Data show in Table
  const filteredDepartmentData = filteremployeData
    ? filteremployeData.filter(
        (employee) =>
          !item.map((item) => item.EmployeeID).includes(employee.EmployeeID)
      )
    : [];

  useEffect(() => {
    // Fetch employee data based on EmployeeID from the URL parameter
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3306/api/employee/allData/${EmployeeID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [EmployeeID]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "start" }}>
            CREATE TEAM
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            style={{ height: "10px" }} // Adjust the height value as needed
          />
        </div>

        <br></br>

        <Box
          className="createTeam-container"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          {item.map((items) => (
            <Card
              key={items.EmployeeID}
              sx={{ width: 200, height: 200, margin: "10px", padding: "10px" }}
            >
              <CardActionArea>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    image={profile}
                    alt="profile"
                    sx={{ height: "100px", width: "100px" }}
                  />
                </Box>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {items.FirstName} {items.LastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {items.EmployeeID}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                sx={{ display: "flex", justifyContent: "center" }}
              ></CardActions>
            </Card>
          ))}
          <Box sx={{ marginLeft: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "30%", } }>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={
                    selectedDepartment
                      ? selectedDepartment.DepartmentName
                      : "Select Department"
                  }
                >
                  <div style={{ maxHeight: "300px", overflowY: "auto" ,  }}>
                    {departments.map((department) => (
                      <Dropdown.Item
                        key={department.DepartmentID}
                        onClick={() => handleDepartmentSelect(department)}
                      >
                        {department.DepartmentName}
                      </Dropdown.Item>
                    ))}
                  </div>
                </DropdownButton>
              </div>
              <div style={{ width: "700px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                      <TableRow >
                        <TableCell>Employee ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Add</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredDepartmentData.map((employee) => (
                        <TableRow key={employee.EmployeeID}>
                          <TableCell>{employee.EmployeeID}</TableCell>
                          <TableCell>
                            {employee.FirstName} {employee.LastName}
                          </TableCell>
                          <TableCell>{employee.DesignationName}</TableCell>
                          <TableCell>{employee.EmploymentStatus}</TableCell>
                          <TableCell
                            sx={{
                              fontSize: "18px",
                              color: "green",
                              cursor: "pointer",
                            }}
                            onClick={() => handleAddToTeam(employee.EmployeeID)}
                          >
                            <AddCircleOutlineIcon />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Box>
        </Box>
        <AddTeams
          sdata={item}
          updateAssignedEmployees={updateAssignedEmployees}
        />
        {successMessage && <div>{successMessage}</div>} {/* 2. Display Success Message */}
      </Box>
    </Box>
  );
};

export default Create;
