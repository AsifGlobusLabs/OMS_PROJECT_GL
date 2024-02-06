import React, { useState, useEffect } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Assignment.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AssignmentCard from "./AssignmentCard";
import AssignmentTable from "./AssignmentTable";

export default function NewAssignment() {
  const [validated, setValidated] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    AssignmentID: "",
    EmployeeID: "",
    EmployeeID_AssignTo: "",
    AssignDate: "",
    DeadlineDate: "",
    AssignmentPriority: "",
    Assignment_Description: "",
  });
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDataFromSession = JSON.parse(sessionStorage.getItem("userData"));
    setUserData(userDataFromSession);
  }, []);

  useEffect(() => {
    const fetchAssignedEmployees = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/workGroup/allData"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const assigned = data.filter(
          (employee) => userData.EmployeeID === employee.EmployeeID_Assigner
        );
        setAssignedEmployees(assigned);
      } catch (error) {
        console.error("Error fetching assigned employees:", error);
      }
    };

    if (userData) {
      fetchAssignedEmployees();
    }
  }, [userData]);

  useEffect(() => {
    const fetchLastAssignmentId = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/assignmentDetails/lastAssignmentId"
        );
        if (response.ok) {
          const data = await response.json();
          const numericPart = parseInt(data.lastAssignmentId.slice(2), 10);
          if (!isNaN(numericPart)) {
            const nextJobNo = numericPart + 1;
            setAssignmentData((prevState) => ({
              ...prevState,
              AssignmentID: `AS${nextJobNo.toString().padStart(3, "0")}`,
            }));
          } else {
            console.error("Invalid numeric part:", data.lastAssignmentId);
          }
        } else {
          console.error("Failed to fetch last AssignmentID");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLastAssignmentId();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssignmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3306/api/assignmentDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...assignmentData,
            EmployeeID: userData.EmployeeID,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Response:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
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
                    name="AssignmentID"
                    value={assignmentData.AssignmentID}
                    onChange={handleInputChange}
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
                    readOnly
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label htmlFor="Employee_AssignTo">
                    Employee_AssignTo
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="EmployeeID_AssignTo"
                    value={assignmentData.EmployeeID_AssignTo}
                    onChange={handleInputChange}
                    required
                    style={{ fontSize: "15px" }}
                  >
                    <option value="">Select Department ID</option>
                    {assignedEmployees.map((item, index) => (
                      <option key={index} value={item.EmployeeID_AssignTo}>
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
                  <Form.Control
                    type="date"
                    placeholder="Assign Date"
                    required
                    name="AssignDate"
                    value={assignmentData.AssignDate}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide Assign Date
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom04">
                  <Form.Label>Deadline Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Deadline Date"
                    required
                    name="DeadlineDate"
                    value={assignmentData.DeadlineDate}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide Deadline Date
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom05">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    required
                    name="AssignmentPriority"
                    value={assignmentData.AssignmentPriority}
                    onChange={handleInputChange}
                  >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
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
                    id="Assignment_Description"
                    placeholder="Give Assignment...."
                    name="Assignment_Description"
                    value={assignmentData.Assignment_Description}
                    onChange={handleInputChange}
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
                  style={{ backgroundColor: "#055f85", borderColor: "#055f85" }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
          <AssignmentTable />
        </div>
      </Box>
    </Box>
  );
}
