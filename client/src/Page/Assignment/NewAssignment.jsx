import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Assignment.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AssignmentCard from "./AssignmentCard";
import AssignmentTable from "./AssignmentTable";

export default function NewAssignment() {
  const [validated, setValidated] = useState(false);

  const [workgroupEmployees, setWorkgroupEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState([]);



  useEffect(() => {
    // Fetch user data from sessionStorage
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    const fetchWorkgroupEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3306/api/workGroup/allData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWorkgroupEmployees(data);
      } catch (error) {
        console.error("Error fetching workgroup employees:", error);
      }
    };

    fetchWorkgroupEmployees();
  }, []);

  useEffect(() => {
    if (userData.EmployeeID && workgroupEmployees.length > 0) {
      const assigned = workgroupEmployees.filter((employee) => {
        return userData.EmployeeID === employee.EmployeeID_Assigner;
      });
      setAssignedEmployees(assigned);
    }
  }, [userData, workgroupEmployees]);


console.log(assignedEmployees, "data show")

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // // to get login data
  // const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <Box sx={{ display: "flex" }}>~
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <div className="assignment-container">
          <AssignmentCard />

          <div className="create-assignment">
            <Typography variant="h5" style={{ fontWeight: "500" }}>
              Create Assignment
            </Typography>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Assignment ID</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Assignment ID"

                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Employee ID"
                   value={userData.EmployeeID}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>


                {/* <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Assign To</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Assign To"

                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                 <Form.Group as={Col} md="4">
                  <Form.Label htmlFor="DepartmentID">Employee_AssignTo</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="DepartmentID"
                    value={userData.DepartmentID}
                  //  onChange={handleInputChange}
                    required
                    style={{ fontSize: "15px" }}
                  >
                    <option value="">Select Department ID</option>
                    {assignedEmployees.map((item) => (
                      <option key={item._id} value={item.EmployeeID_AssignTo}>
                        {item.EmployeeID_AssignTo} - {item.Assignee_FirstName}
                      </option>
                    ))}
                  </Form.Select>

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>



              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                  <Form.Label>Assign Date</Form.Label>
                  <Form.Control type="date" placeholder="City" required />
                  <Form.Control.Feedback type="invalid">
                  Please provide Assign Date
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  <Form.Label>Deadline Date</Form.Label>
                  <Form.Control type="date" placeholder="State" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide DeadlineDate
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustom05">
                  <Form.Label>Priority</Form.Label>

                  <Form.Select type="text" placeholder="Priority" required>
                  <option>Select priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option >Low</option>
                    </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please provide a priority.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Assignment Description</Form.Label>
                  <textarea
                  type="text"
                  className="form-control"
                  id="assignment"
                  placeholder="Give Assignment...."
                  name="task_details"

                />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  className="btn mt-2 custom-button"

                 style={{backgroundColor:"#055f85", borderColor:"#055f85"}}
                >
                 submit
                </Button>
              </div>
       </Form>
          </div>
          <AssignmentTable/>
        </div>
      </Box>
    </Box>
  );
}
















