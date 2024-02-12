import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import "./RegisterPage.css";

function NewRegistration({ addEmployee }) {
  const [formData, setFormData] = useState({
    EmployeeID: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: "",
    ContactNumber: "",
    Email: "",
    Address: "",
    JoinDate: "",
    EmploymentStatus: "",
    DepartmentID: "",
    DesignationID: "",
    Employee_Profile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [deginationData, setDeginationData] = useState([]);

  // const [Employee_Profile , setEmployee_Profile] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch department data
        const departmentResponse = await fetch(
          "http://localhost:3306/api/department"
        );
        if (departmentResponse.ok) {
          const departmentData = await departmentResponse.json();
          setDepartmentData(departmentData);
        } else {
          console.error("Failed to fetch department data");
        }

        // Fetch designation data
        const designationResponse = await fetch(
          "http://localhost:3306/api/designation"
        );
        if (designationResponse.ok) {
          const designationData = await designationResponse.json();
          setDeginationData(designationData);
        } else {
          console.error("Failed to fetch designation data");
        }

        // Fetch last employee ID
        const lastEmployeeIdResponse = await fetch(
          "http://localhost:3306/api/employee/lastEmployeeId"
        );
        if (lastEmployeeIdResponse.ok) {
          const lastEmployeeIdData = await lastEmployeeIdResponse.json();
          const numericPart = parseInt(
            lastEmployeeIdData.lastEmployeeId.slice(3),
            10
          );
          if (!isNaN(numericPart)) {
            const nextJobNo = numericPart + 1;
            setFormData({
              ...formData,
              EmployeeID: `EMP${nextJobNo.toString().padStart(3, "0")}`,
            });
          } else {
            console.error(
              "Invalid numeric part:",
              lastEmployeeIdData.lastEmployeeId
            );
          }
        } else {
          console.error("Failed to fetch last Employee ID");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "Employee_Profile") {
      setFormData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await addEmployee(formData);

      console.log(formData);
      setFormData({
        EmployeeID: "",
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        Gender: "",
        ContactNumber: "",
        Email: "",
        Address: "",
        JoinDate: "",
        EmploymentStatus: "",
        DepartmentID: "",
        DesignationID: "",
        Employee_Profile: "",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const [Employee_Profile , setEmployee_Profile] = useState();

  // const onInputChange =(e)=>{
  //   console.log(e.target.files[0]);
  //   setEmployee_Profile(e.target.files[0]);
  // }

  return (
    <div className="Employee-container">
      <div className="register">
        <div>
          <Typography variant="h5" style={{ fontWeight: "500" }}>
            New Employee
          </Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Employee ID"
                variant="outlined"
                name="EmployeeID"
                value={formData.EmployeeID}
                onChange={handleInputChange}
                required
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="First Name"
                variant="outlined"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleInputChange}
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Last Name"
                variant="outlined"
                name="LastName"
                value={formData.LastName}
                onChange={handleInputChange}
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Phone Number"
                variant="outlined"
                type="tel"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleInputChange}
                fullWidth
                size="medium"
              />
            </Grid>

            <Grid item xs={4} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.Gender}
                  onChange={handleInputChange}
                  name="Gender"
                  label="Gender"
                  size="medium"
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <TextField
                label="Join Date"
                variant="outlined"
                type="date"
                name="JoinDate"
                value={formData.JoinDate}
                size="medium"
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                // label="Date of Birth"
                type="date"
                variant="outlined"
                name="DateOfBirth"
                value={formData.DateOfBirth}
                onChange={handleInputChange}
                required
                fullWidth
                size="medium"
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Employment Status</InputLabel>
                <Select
                  value={formData.EmploymentStatus}
                  onChange={handleInputChange}
                  label="Employment Status"
                  name="EmploymentStatus"
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Department ID</InputLabel>
                <Select
                  value={formData.DepartmentID}
                  onChange={handleInputChange}
                  label="Department ID"
                  name="DepartmentID"
                >
                  {departmentData.map((department) => (
                    <MenuItem
                      key={department._id}
                      value={department.DepartmentID}
                    >
                      {department.DepartmentID} - {department.DepartmentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Designation ID</InputLabel>
                <Select
                  value={formData.DesignationID}
                  onChange={handleInputChange}
                  label="Designation ID"
                  name="DesignationID"
                >
                  {deginationData.map((designation) => (
                    <MenuItem
                      key={designation._id}
                      value={designation.DesignationID}
                    >
                      {designation.DesignationID} -{" "}
                      {designation.DesignationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                name="Employee_Profile"
                type="file"
                accept="image/*"
                value={formData.Employee_Profile}
                onChange={handleInputChange}
                fullWidth
                size="medium"
              />
            </Grid>
            <Container
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Grid item xs={1}>
                <Button
                  type="submit"
                  variant="contained"
                  // color="primary"
                  disabled={isLoading}
                  sx={{ backgroundColor: "#5c7c77" }}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </Grid>
            </Container>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default NewRegistration;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
// import "./RegisterPage.css";
// import logo from "../../assets/images/Gl-Logo.png";
// import SideBar from "../../Component/SideBar";
// import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";

// function NewRegistration() {
//   const [validated, setValidated] = useState(false);
//   const [departmentData, setDepartmentData] = useState([]);
//   const [deginationData, setDeginationData] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(25);

//   const [formData, setFormData] = useState({
//     EmployeeID: "",
//     FirstName: "",
//     LastName: "",
//     DateOfBirth: "",
//     Gender: "",
//     ContactNumber: "",
//     Email: "",
//     Address: "",
//     JoinDate: "",
//     EmploymentStatus: "",
//     DepartmentID: "",
//     DesignationID: "",
//     Employee_Profile: null, // Changed to null
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target; // Extract files from input
//     const file = files && files.length ? files[0] : null; // Get the first file
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//       Employee_Profile: file,
//     })); // Set Employee_Profile to file
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//     }
//     setValidated(true);

//     if (form.checkValidity() === true) {
//       try {
//         setIsLoading(true);
//         const apiUrl = "http://localhost:3306/api/employee";
//         const formDataWithFile = new FormData(); // Create FormData object
//         // Append all form data to FormData
//         Object.entries(formData).forEach(([key, value]) => {
//           formDataWithFile.append(key, value);
//         });
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           body: formDataWithFile, // Use FormData object as body
//         });
//         if (response.ok) console.log("Registration successful!");
//         else console.error("Registration failed:", response.statusText);
//       } catch (error) {
//         console.error("Error submitting data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   //last number data
//   useEffect(() => {
//     const fetchLastJobNo = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:3306/api/employee/lastEmployeeId",
//           { method: "GET", headers: { "Content-Type": "application/json" } }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Received data:", data); // Log received data for debugging
//           const numericPart = parseInt(data.lastEmployeeId.slice(3), 10);
//           console.log("Parsed numeric part:", numericPart); // Log parsed numeric part
//           if (!isNaN(numericPart)) {
//             const nextJobNo = numericPart + 1;
//             setFormData({
//               ...formData,
//               EmployeeID: `EMP${nextJobNo.toString().padStart(3, "0")}`,
//             });
//           } else {
//             console.error("Invalid numeric part:", data.lastEmployeeId);
//           }
//         } else {
//           console.error("Failed to fetch last JobNo");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     fetchLastJobNo();
//   }, []);

//   // Department and Designation DATA GET
//   useEffect(() => {
//     const fetchData = async (apiUrl, setterFunction) => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });
//         const result = await response.json();
//         setterFunction(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData("http://localhost:3306/api/department", setDepartmentData);
//     fetchData("http://localhost:3306/api/designation", setDeginationData);
//   }, []);

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
//         <div className="Employee-container">
//           <div className="register">
//             <div>
//               <Typography variant="h5" style={{ fontWeight: "500" }}>
//                 New Employee
//               </Typography>
//             </div>
//             <Form noValidate validated={validated} onSubmit={handleSubmit}>
//               <Row className="mb-3">
//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Employee ID</Form.Label>
//                   <InputGroup hasValidation>
//                     <Form.Control
//                       style={{ fontWeight: "600", fontSize: "15px" }}
//                       type="text"
//                       placeholder="Employee ID"
//                       aria-describedby="inputGroupPrepend"
//                       name="EmployeeID"
//                       value={formData.EmployeeID}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       Please Enter Employee ID.
//                     </Form.Control.Feedback>
//                   </InputGroup>
//                 </Form.Group>
//                 <Form.Group as={Col} md="4">
//                   <Form.Label>First name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="First name"
//                     name="FirstName"
//                     value={formData.FirstName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please Enter your First Name!
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Last name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Last name"
//                     name="LastName"
//                     value={formData.LastName}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please Enter your Last Name!
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//               </Row>

//               <Row className="mb-3"></Row>

//               <Row className="mb-3">
//                 <Form.Group as={Col} md="4">
//                   <Form.Label htmlFor="Date">Join Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     placeholder="Join Date"
//                     name="JoinDate"
//                     value={formData.JoinDate}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please Enter Join Date!
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Date of Birth</Form.Label>
//                   <Form.Control
//                     type="date"
//                     placeholder="DOB"
//                     name="DateOfBirth"
//                     value={formData.DateOfBirth}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please Enter DOB!
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Gender</Form.Label>
//                   <InputGroup required>
//                     <Form.Check
//                       inline
//                       label="Male"
//                       name="Gender"
//                       type="radio"
//                       value="M"
//                       checked={formData.Gender === "M"}
//                       onChange={handleInputChange}
//                       isInvalid={validated && !formData.Gender}
//                     />
//                     <Form.Check
//                       inline
//                       label="Female"
//                       name="Gender"
//                       type="radio"
//                       value="F"
//                       checked={formData.Gender === "F"}
//                       onChange={handleInputChange}
//                       isInvalid={validated && !formData.Gender}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                       Please select a gender.
//                     </Form.Control.Feedback>
//                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                   </InputGroup>
//                 </Form.Group>
//               </Row>

//               <Row className="mb-3">
//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter Email"
//                     name="Email"
//                     value={formData.Email}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback>
//                     Please Enter Email
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Phone Number</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Phone Number"
//                     name="ContactNumber"
//                     value={formData.ContactNumber}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback>
//                     Please Enter Phone Number
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group as={Col} md="4">
//                   <Form.Label htmlFor="EmployementStatus">
//                     Employement Status
//                   </Form.Label>
//                   <Form.Select
//                     aria-label="Employment Status"
//                     name="EmploymentStatus"
//                     value={formData.EmploymentStatus}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option>select Status</option>
//                     <option>Active</option>
//                     <option>Inactive</option>
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     Please Select Status!
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//               </Row>

//               <Row className="mb-3">
//                 <Form.Group as={Col} md="4">
//                   <Form.Label>Address</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Address"
//                     name="Address"
//                     value={formData.Address}
//                     onChange={handleInputChange}
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a Address.
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group as={Col} md="4">
//                   <Form.Label htmlFor="DepartmentID">Department </Form.Label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     name="DepartmentID"
//                     value={formData.DepartmentID}
//                     onChange={handleInputChange}
//                     required
//                     style={{ fontSize: "15px" }}
//                   >
//                     <option value="">Select Department</option>
//                     {departmentData.map((item) => (
//                       <option key={item._id} value={item.DepartmentID}>
//                         {item.DepartmentID} - {item.DepartmentName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     Please Select Department!
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group as={Col} md="4">
//                   <Form.Label htmlFor="DesignationID">Designation</Form.Label>

//                   <Form.Select
//                     aria-label="Default select example"
//                     name="DesignationID"
//                     value={formData.DesignationID}
//                     onChange={handleInputChange}
//                     required
//                     style={{ fontSize: "15px" }}
//                   >
//                     <option value="">Select Designation</option>
//                     {deginationData.map((item) => (
//                       <option key={item._id} value={item.DesignationID}>
//                         {item.DesignationID} - {item.DesignationName}
//                       </option>
//                     ))}
//                   </Form.Select>
//                   <Form.Control.Feedback type="invalid">
//                     Please Select Designation ID!
//                   </Form.Control.Feedback>

//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group as={Col} md="4">
//                   <Form.Label>upload</Form.Label>
//                   <Form.Control
//                     type="file"
//                     placeholder="Address"
//                     name="Employee_Profile"
//                     accept="image/*"
//                     onChange={handleInputChange} // Use onChange instead of value
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please provide a Address.
//                   </Form.Control.Feedback>
//                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                 </Form.Group>
//               </Row>

//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                 }}
//               >
//                 <Button
//                   type="submit"
//                   className="btn mt-2 custom-button"
//                   disabled={isLoading}
//                   style={{ backgroundColor: "#055f85", borderColor: "#055f85" }}
//                 >
//                   {isLoading ? "Submitting..." : "Submit"}
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//         <div className="Employee-table">
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
//                           style={{height:"100px"}}
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

// export default NewRegistration;
