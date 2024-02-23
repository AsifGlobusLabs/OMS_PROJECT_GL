// //import React, { useState, useEffect } from "react";
// import Typography from "@material-ui/core/Typography";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   // TablePagination,
//   IconButton,
// } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// const useStyles = makeStyles((theme) => ({
//   table: {
//     minWidth: 650,
//   },

//   tableHeaderCell: {
//     fontWeight: "bold",
//     backgroundColor: "#44756d",
//     color: theme.palette.getContrastText(theme.palette.primary.dark),
//     // color: theme.palette.getContrastText('white'),
//   },

//   name: {
//     fontSize: "0.9rem",
//   },
// }));

// const ViewRegistrationData = ({ employeeData, deleteEmployee }) => {
//   const classes = useStyles();

//   return (
//     <div className="Employee-table">
//       <div>
//         <Typography variant="h5" style={{ fontWeight: "500" }}>
//           Employee Data
//         </Typography>
//       </div>
//       <br></br>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell className={classes.tableHeaderCell}>
//               Employee ID
//             </TableCell>
//             <TableCell className={classes.tableHeaderCell}>Name</TableCell>
//             <TableCell className={classes.tableHeaderCell}>
//               Designation
//             </TableCell>
//             <TableCell className={classes.tableHeaderCell}>
//               Department
//             </TableCell>
//             <TableCell className={classes.tableHeaderCell}>Status</TableCell>
//             <TableCell className={classes.tableHeaderCell}>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {employeeData.map((item, index) => (
//             <TableRow
//               key={item._id}
//               style={{
//                 backgroundColor: index % 2 === 0 ? "#D3D3D3" : "white",
//               }}
//             >
//               <TableCell className={classes.name}>{item.EmployeeID}</TableCell>
//               <TableCell
//                 className={classes.name}
//               >{`${item.FirstName} ${item.LastName}`}</TableCell>
//               <TableCell className={classes.name}>
//                 {item.DesignationID}
//               </TableCell>
//               <TableCell className={classes.name}>
//                 {item.DepartmentID}
//               </TableCell>
//               {/* <TableCell
//                 className={classes.status}
//                 style={{
//                   fontWeight: "bold",
//                   fontSize: "0.75rem",
//                   color: "white",
//                   borderRadius: 8,
//                   padding: "5px 10px",
//                   marginTop: "17px",
//                   display: "inline-block",

//                   backgroundColor:
//                     (item.EmploymentStatus === "Active" && "#4E9B47") ||
//                     (item.EmploymentStatus === "Inactive" && "#6d6b6b"),
//                   //  padding: "2px 10px", // Adjust the padding to make it smaller
//                 }}
//               >
//                 {item.EmploymentStatus}
//               </TableCell> */}
//               <TableCell
//                 className={classes.status}
//                 style={{
//                   fontWeight: "500",
//                   fontSize: "0.9rem",
//                   // color: "green",

//                   color:
//                     (item.EmploymentStatus === "Active" && "#4E9B47") ||
//                     (item.EmploymentStatus === "Inactive" && "#FF5733 "),
//                   //  padding: "2px 10px", // Adjust the padding to make it smaller
//                 }}
//               >
//                 <FiberManualRecordIcon
//                   style={{
//                     color:
//                       (item.EmploymentStatus === "Active" && "#4E9B47") ||
//                       (item.EmploymentStatus === "Inactive" && "#FF5733 "),
//                        fontSize:"0.9rem",
//                        marginRight:"3px"
//                   }}
//                 />
//                 {item.EmploymentStatus}
//               </TableCell>

//               <TableCell>
//                 <IconButton sx={{ color: "#188bc0", height: "5px" }}>
//                   <EditIcon />{" "}
//                 </IconButton>
//                 <IconButton
//                   sx={{ color: "#FF5733", height: "5px" }}
//                   onClick={() => deleteEmployee(item.EmployeeID)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default ViewRegistrationData;

/* <TableCell className={classes.name}>
              {item.Employee_Profile && (
                        <img
                          src={`http://localhost:3306/api/employee/${item.Employee_Profile}`}
                          alt="Employee Profile"
                          style={{height:"100px"}}
                        />
                      )}
              </TableCell> */

// const [currentPage, setCurrentPage] = useState(0); // Start from page 1
// const [itemsPerPage] = useState(10);

// const handleChangePage = (event, newPage) => {
//   setCurrentPage(newPage);
// };

//   const handleDelete = async (employeeId) => {
//     try {
//         const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
//         if (!confirmDelete) return;

//         const apiUrl = `http://localhost:3306/api/employee/delete/${employeeId}`;
//         const response = await fetch(apiUrl, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (response.ok) {
//             const updatedData = data.filter(item => item.EmployeeID !== employeeId);
//             setData(updatedData);
//             console.log("Employee deleted successfully");
//         } else {
//             console.error("Failed to delete employee");
//         }
//     } catch (error) {
//         console.error("Error deleting employee:", error);
//     }
// };

import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },

  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: '#44756d',
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  name: {
    fontSize: '0.9rem',
  },
}));

const ViewRegistrationData = ({ employeeData, deleteEmployee }) => {
  const classes = useStyles();

  const handleDeleteConfirmation = (employeeId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    if (isConfirmed) {
      deleteEmployee(employeeId);
    }
  };

  return (
    <div className="Employee-table">
      <div>
        <Typography variant="h5" style={{ fontWeight: '500' }}>
          Employee Data
        </Typography>
      </div>
      <br />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Employee ID</TableCell>
            <TableCell className={classes.tableHeaderCell}>Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Designation</TableCell>
            <TableCell className={classes.tableHeaderCell}>Department</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            <TableCell className={classes.tableHeaderCell}>pic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData.map((item, index) => (
            <TableRow
              key={item._id}
              style={{
                backgroundColor: index % 2 === 0 ? '#D3D3D3' : 'white',
              }}
            >
              <TableCell className={classes.name}>{item.EmployeeID}</TableCell>
              <TableCell className={classes.name}>{`${item.FirstName} ${item.LastName}`}</TableCell>
              <TableCell className={classes.name}>{item.DesignationID}</TableCell>
              <TableCell className={classes.name}>{item.DepartmentID}</TableCell>
              <TableCell className={classes.name}
              style={{color: (item.EmploymentStatus === 'Active' && '#4E9B47') || (item.EmploymentStatus === 'Inactive' && '#FF5733'),}}
              >
                <FiberManualRecordIcon
                  style={{
                    color: (item.EmploymentStatus === 'Active' && '#4E9B47') || (item.EmploymentStatus === 'Inactive' && '#FF5733'),
                    fontSize: '0.9rem',
                    marginRight: '3px',
                  }}
                />
                {item.EmploymentStatus}
              </TableCell>
              <TableCell>
                <IconButton sx={{ color: '#188bc0', height: '5px' }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{ color: '#FF5733', height: '5px' }}
                  onClick={() => handleDeleteConfirmation(item.EmployeeID)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell className={classes.name}>
              {item.Employee_Profile && (
                        <img
                          src={`http://localhost:3306/api/employee/${item.Employee_Profile}`}
                          alt="Employee Profile"
                          style={{ height: "100px" }}
                        />
                      )}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewRegistrationData;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
// import "./RegisterPage.css";
// import logo from "../../assets/images/Gl-Logo.png";
// import SideBar from "../../Component/SideBar";
// import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";

// function ViewRegistrationData() {
//   const [validated, setValidated] = useState(false);
//   const [departmentData, setDepartmentData] = useState([]);
//   const [deginationData, setDeginationData] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(25);

 
//   // fetch Data below table
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = "http://localhost:3306/api/employee";
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const result = await response.json();
//         const reversedData = result.reverse();
//         setTableData(reversedData);
//         setFilteredData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
       
//         <div className="Employee-table" style={{width:"100%"}}>
//           <div>
//             <Typography variant="h5" style={{ fontWeight: "500" }}>
//               Employee Data
//             </Typography>
//           </div>
//           <div
//             style={{ maxHeight: "400px", overflowY: "auto", marginTop: "20px" }}
//           >
//             <table className="table table-striped table-bordered">
//               <thead style={{ fontSize: "15px" }}>
//                 <tr>
//                   <th>Employee ID</th>
//                   <th>Name</th>
//                   <th>Designation ID</th>
//                   <th>Department ID</th>
//                   <th>Status</th>
//                   <th>image</th>
//                 </tr>
//               </thead>
//               <tbody style={{ fontSize: "13px" }}>
//                 {currentItems.map((item) => (
//                   <tr key={item._id}>
//                     <td>{item.EmployeeID}</td>
//                     <td>
//                       {item.FirstName} {item.LastName}
//                     </td>
//                     <td>{item.DesignationID}</td>
//                     <td>{item.DepartmentID}</td>
//                     <td>
//                       {item.EmploymentStatus === "Active" ? (
//                         <span style={{ color: "#6EC531 " }}>
//                           {item.EmploymentStatus}
//                         </span>
//                       ) : (
//                         <span style={{ color: "red" }}>
//                           {item.EmploymentStatus}
//                         </span>
//                       )}
//                     </td>
//                     <td>
//                       {item.Employee_Profile && (
//                         <img
//                           src={`http://localhost:3306/api/employee/${item.Employee_Profile}`}
//                           alt="Employee Profile"
//                           style={{ height: "100px" }}
//                         />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <ul className="pagination">
//             {Array.from(
//               { length: Math.ceil(filteredData.length / itemsPerPage) },
//               (_, index) => (
//                 <li key={index} className="page-item">
//                   <button
//                     onClick={() => paginate(index + 1)}
//                     className="page-link"
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               )
//             )}
//           </ul>
//         </div>
//       </Box>
//     </Box>
//   );
// }

// export default ViewRegistrationData;
