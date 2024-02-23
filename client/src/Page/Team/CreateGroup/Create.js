import React, { useEffect, useState } from "react";
import { Card} from "react-bootstrap";
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination, // Add TablePagination
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import profile from "./profilenn.png";
import {
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Autocomplete,
} from "@mui/material";
import AddTemp from "./AddTemp";
import AddTeams from "./AddTeams";

const Create = () => {
  const { EmployeeID } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [page, setPage] = useState(0); // State for current page
  const [rowsPerPage, setRowsPerPage] = useState(3); // State for rows per page

  // Function to update assignedEmployees state
  const updateAssignedEmployees = (employees) => {
    setAssignedEmployees(employees);
  };

  // Event handler for page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Event handler for rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const handleDepartmentSelect = async (department) => {
    setSelectedDepartment(department);
    try {
      const response = await fetch(
        `http://localhost:3306/api/employee/dNames?department=${department.DepartmentName}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const filteredData = data.filter(
        (employee) => employee.DepartmentID === department.DepartmentID
      );
      setDepartmentData(filteredData);
    } catch (error) {
      console.error("Error fetching department data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchEmployeeData(EmployeeID);
  }, [EmployeeID]);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:3306/api/department");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError(error);
    }
  };

  const fetchEmployeeData = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3306/api/employee/allData/${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setError(error);
    }
  };

  const handleAddToTeam = (employeeID) => {
    // Find the employee by ID and add it to the selectedEmployee state
    const employee = filteredDepartmentData.find(
      (emp) => emp.EmployeeID === employeeID
    );
    setSelectedEmployee([...selectedEmployee, employee]); // Append the selected employee
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

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

  // Pagination
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredDepartmentData.length - page * rowsPerPage);

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
            color: "black",
          }}
        >
          <div style={{ width: "30%" }}>
            <Typography variant="h5" sx={{ textAlign: "start" }}>
              CREATE TEAM
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "70%",
            }}
          >
            {/* <FormControl
              sx={{
                m: 1,
                width: 300,
                marginLeft: "380px",
                backgroundColor: "whitesmoke",
              }}
            >
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={
                  selectedDepartment ? selectedDepartment.DepartmentName : ""
                }
                onChange={(event) => {
                  const selectedDept = departments.find(
                    (dept) => dept.DepartmentName === event.target.value
                  );
                  setSelectedDepartment(selectedDept);
                  handleDepartmentSelect(selectedDept); // Fetch data for the selected department
                }}
                input={<OutlinedInput label="Select Department" />}
              >
                {departments.map((department) => (
                  <MenuItem
                    key={department.DepartmentID}
                    value={department.DepartmentName}
                  >
                    {department.DepartmentName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            <Autocomplete
              sx={{
                m: 1,
                width: 400,
                marginLeft: "380px",
                backgroundColor: "whitesmoke",
              }}
              value={selectedDepartment}
              onChange={(event, newValue) => {
                setSelectedDepartment(newValue);
                handleDepartmentSelect(newValue); // Fetch data for the selected department
              }}
              options={departments}
              getOptionLabel={(option) => option.DepartmentName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Employee"
                  variant="outlined"
                />
              )}
            />

            <TextField
              sx={{ marginRight: "15px" }}
              label="Search"
              variant="outlined"
            />
          </div>
        </div>
        <br />
        <Box
          className="createTeam-container"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f9f9f9",
            height: "400px",
          }}
        >
          <div>
            {item.map((items) => (
              <Card
                key={items.EmployeeID}
                sx={{
                  width: 200,
                  height: 200,
                  margin: "10px",
                  padding: "10px",
                }}
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
          </div>
          <Box sx={{ marginLeft: "50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "900px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#44756d" }}>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Employee ID
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Designation
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          style={{ fontWeight: "bold", color: "white" }}
                        >
                          Add
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? filteredDepartmentData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : filteredDepartmentData
                      ).map((employee) => (
                        <TableRow key={employee.EmployeeID}>
                          <TableCell>{employee.EmployeeID}</TableCell>
                          <TableCell>
                            {employee.FirstName} {employee.LastName}
                          </TableCell>
                          <TableCell>{employee.DesignationName}</TableCell>
                          <TableCell
                            style={{
                              color:
                                employee.EmploymentStatus === "Active"
                                  ? "green"
                                  : "black",
                            }}
                          >
                            {employee.EmploymentStatus}
                          </TableCell>
                          {/* Render Add or Check icon based on whether the employee is selected */};

                          {selectedEmployee.some(
                            (emp) => emp.EmployeeID === employee.EmployeeID
                          ) ? (
                            <TableCell>
                              <CheckIcon />
                            </TableCell>
                          ) : (
                            <TableCell
                              sx={{
                                fontSize: "18px",
                                color: "green",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleAddToTeam(employee.EmployeeID)
                              }
                            >
                              <AddCircleOutlineIcon />
                            </TableCell>
                          )}
                          
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredDepartmentData.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </Box>
        </Box>
        <br />
        <br />
        <div style={{ backgroundColor: "#f9f9f9", height: "300px" }}>
          <AddTemp selectedEmployee={selectedEmployee} currentEmpolyee={item} />
        </div>

        <div style={{  }}>
          <AddTeams
            sdata={item}
            updateAssignedEmployees={updateAssignedEmployees}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Create;
