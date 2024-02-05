// import React, { useEffect, useState } from "react";
// import SideBar from "../../Component/SideBar";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useParams } from "react-router-dom";
// import {
//   CardActionArea,
//   CardActions,
//   CardContent,
//   CardMedia,
// } from "@mui/material";
// import profile from "./profile.webp";
// import { Card } from "react-bootstrap";
// import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
// import Tab from "react-bootstrap/Tab";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteIcon from '@mui/icons-material/Delete';



// const CreateTeam = () => {
//   const { EmployeeID } = useParams();
//   const [item, setItem] = useState(null);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const [teamData, setTeamData] = useState([]);

//   console.log(item, "fjhfhfh");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = "http://localhost:3306/api/employee/allData";
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter data where DepartmentID is equal to "DEPT001"
//   const filteredData01 = data.filter((item) => item.DepartmentID === "DEPT001");
//   const filteredData02 = data.filter((item) => item.DepartmentID === "DEPT002");
//   const filteredData03 = data.filter((item) => item.DepartmentID === "DEPT003");

//   // console.log(item, "hekkii");
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3306/api/employee/allData/${EmployeeID}`,
//           {
//             method: "GET", // You might want to explicitly specify the HTTP method
//             headers: {
//               "Content-Type": "application/json", // Specify content type if required by your API
//               // Add any other headers required by your API
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

//   const handleAddToTeam = (employeeID) => {
//     // Find the selected employee from the filtered data
//     const selectedEmployee = data.find(
//       (item) => item.EmployeeID === employeeID
//     );
//     // Update the team data with the selected employee
//     setTeamData((prevTeamData) => [...prevTeamData, selectedEmployee]);
//   };


//   const handleDelete = (employeeID) => {
//     // Filter out the selected employee from the team data
//     const updatedTeamData = teamData.filter(
//       (employee) => employee.EmployeeID !== employeeID
//     );
//     setTeamData(updatedTeamData);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
//         <Typography variant="h5" sx={{ textAlign: "center" }}>
//           Create Team
//         </Typography>
//         <div className="createTeam-container">
//           {item.map((items) => (
//             <Card
//               sx={{ width: 200, height: 200, margin: "10px", padding: "10px" }}
//             >
//               <CardActionArea>
//                 <div style={{ display: "flex", justifyContent: "center" }}>
//                   <CardMedia
//                     component="img"
//                     image={profile}
//                     alt="profile"
//                     sx={{ height: "100px", width: "100px" }}
//                   />
//                 </div>

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
//           <Tab.Container id="fill-tab-example" defaultActiveKey="first">
//             <div
//               style={{
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "space-around",
//               }}
//             >
//               <Col lg={2} style={{ padding: "10px" }}>
//                 <Nav variant="pills" className="flex-column" style={{textAlign:"center"}}>
//                   <Nav.Item>
//                     <Nav.Link eventKey="first">Software</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item style={{marginTop:"10px"}}>
//                     <Nav.Link eventKey="second">HR</Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item style={{marginTop:"10px"}}>
//                     <Nav.Link eventKey="third">SCM</Nav.Link>
//                   </Nav.Item>
//                 </Nav>
//               </Col>

//               <Col lg={9}>
//                 <Tab.Content>
//                   <Tab.Pane eventKey="first">
//                     <table className="table table-striped">
//                       <thead style={{ fontSize: "15px" }}>
//                         <tr>
//                           <th>EmployeeID</th>
//                           <th>Name</th>
//                           <th>Designation</th>
//                           <th>Department</th>
//                           <th>Status</th>
//                           <th>Add</th>
//                         </tr>
//                       </thead>
//                       <tbody style={{ fontSize: "13px" }}>
//                         {filteredData01.map((item) => (
//                           <tr key={item._id}>
//                             <td>{item.EmployeeID}</td>
//                             <td>
//                               {item.FirstName} {item.LastName}
//                             </td>
//                             <td>{item.DesignationID}</td>
//                             <td>{item.DepartmentID}</td>
//                             <td>{item.EmploymentStatus}</td>
//                             <td
//                               style={{
//                                 fontSize: "18px",
//                                 color: "green",
//                                 cursor: "pointer",
//                               }}
//                               onClick={() => handleAddToTeam(item.EmployeeID)}
//                             >
//                               <AddCircleOutlineIcon />{" "}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </Tab.Pane>
//                   <Tab.Pane eventKey="second">
//                     <table className="table table-striped">
//                       <thead style={{ fontSize: "15px" }}>
//                         <tr>
//                           <th>EmployeeID</th>
//                           <th>Name</th>
//                           <th>Designation</th>
//                           <th>Department</th>
//                           <th>Status</th>
//                           <th>Add</th>
//                         </tr>
//                       </thead>
//                       <tbody style={{ fontSize: "13px" }}>
//                         {filteredData02.map((item) => (
//                           <tr key={item._id}>
//                             <td>{item.EmployeeID}</td>
//                             <td>
//                               {item.FirstName} {item.LastName}
//                             </td>
//                             <td>{item.DesignationID}</td>
//                             <td>{item.DepartmentID}</td>
//                             <td>{item.EmploymentStatus}</td>
//                             <td
//                               style={{
//                                 fontSize: "18px",
//                                 color: "green",
//                                 cursor: "pointer",
//                               }}
//                               onClick={() => handleAddToTeam(item.EmployeeID)}
//                             >
//                               <AddCircleOutlineIcon />{" "}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </Tab.Pane>
//                   <Tab.Pane eventKey="third">
//                     <table className="table table-striped">
//                       <thead style={{ fontSize: "15px" }}>
//                         <tr>
//                           <th>EmployeeID</th>
//                           <th>Name</th>
//                           <th>Designation</th>
//                           <th>Department</th>
//                           <th>Status</th>
//                           <th>Add</th>
//                         </tr>
//                       </thead>
//                       <tbody style={{ fontSize: "13px" }}>
//                         {filteredData03.map((item) => (
//                           <tr key={item._id}>
//                             <td>{item.EmployeeID}</td>
//                             <td>
//                               {item.FirstName} {item.LastName}
//                             </td>
//                             <td>{item.DesignationID}</td>
//                             <td>{item.DepartmentID}</td>
//                             <td>{item.EmploymentStatus}</td>
//                             <td
//                               style={{
//                                 fontSize: "18px",
//                                 color: "green",
//                                 cursor: "pointer",
//                               }}
//                               onClick={() => handleAddToTeam(item.EmployeeID)}
//                             >
//                               <AddCircleOutlineIcon />{" "}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </Tab.Pane>
//                 </Tab.Content>
//               </Col>
//             </div>
//           </Tab.Container>
//         </div>

//         <div style={{marginTop:"20px"}}>
//           <h4>Team Members</h4>

//           <table className="table table-striped">
//             <thead style={{ fontSize: "15px" }}>
//               <tr>
//                 <th>EmployeeID</th>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Department</th>
//                 <th>Status</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody style={{ fontSize: "13px" }}>
//               {teamData.map((employee) => (
//                 <tr key={item._id}>
//                   <td>{employee.EmployeeID}</td>
//                   <td>
//                     {employee.FirstName} {item.LastName}
//                   </td>
//                   <td>{employee.DesignationID}</td>
//                   <td>{employee.DepartmentID}</td>
//                   <td>{employee.EmploymentStatus}</td>
//                   <td style={{color:"red", cursor:"pointer"}}
//                   onClick={() => handleDelete(item.EmployeeID)}
//                   >
//                     <DeleteIcon/></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Box>
//     </Box>
//   );
// };

// export default CreateTeam;









