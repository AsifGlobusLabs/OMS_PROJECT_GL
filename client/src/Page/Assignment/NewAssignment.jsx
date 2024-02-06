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
  const [workGroupData, setWorkGroupData] = useState([]);
  // console.log(workGroupData, "heklsj");

  const [workgroupEmployees, setWorkgroupEmployees] = useState([]);
  const [assignedEmployees, setAssignedEmployees] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
     AssignmentID: "",
     EmployeeID: userData.EmployeeID,
     EmployeeID_AssignTo:"",
     Assignment_Description:"",
     AssignDate:"",
     DeadlineDate:"",
     AssignmentPriority:"",
    });


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  

    const handleSubmit = async (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
  
      if (form.checkValidity() === true) {
        try {
          setIsLoading(true);
          const apiUrl = "http://localhost:3306/api/assignmentDetails";
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (response.ok) console.log("Registration successful!");
          else console.error("Registration failed:", response.statusText);
        } catch (error) {
          console.error("Error submitting data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

  // console.log(assignedEmployees, "data show")
  // console.log(userData, "user data shoew")

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData")) || {};
    setUserData(userData);
    // Set EmployeeID in formData after userData is fetched
    setFormData((prevData) => ({
      ...prevData,
      EmployeeID: userData.EmployeeID || "",
    
    }));
    
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

  // // to get login data
  // const userData = JSON.parse(sessionStorage.getItem("userData"));

  // get data in assignTo
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/workGroup/allData";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setWorkGroupData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  //last number data
 useEffect(() => {
  const fetchLastJobNo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3306/api/assignmentDetails/lastAssignmentId",
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Received data:", data); // Log received data for debugging
        const numericPart = parseInt(data.lastAssignmentId.slice(3), 10);
        console.log("Parsed numeric part:", numericPart); // Log parsed numeric part
        if (!isNaN(numericPart)) {
          const nextJobNo = numericPart + 1;
          setFormData({
            ...formData,
            AssignmentID: `AS${nextJobNo.toString().padStart(3, "0")}`,
          });
        } else {
          console.error("Invalid numeric part:", data.lastAssignmentId);
        }
      } else {
        console.error("Failed to fetch last JobNo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  fetchLastJobNo();
}, []);


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
                    value={formData.AssignmentID}
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
                    name="EmployeeID"
                    value={formData.EmployeeID}
                    onChange={handleInputChange}
                  />
                
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>


                {/* <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Assign To</Form.Label>

                  <Form.Select required type="text" placeholder="Assign To">
                    <option value="">Select Assign To</option>

                    {workGroupData.map((item) =>
                      item.EmployeeID_Assigner === userData.EmployeeID ? (
                        <option key={item._id}>
                          {item.EmployeeID_AssignTo}
                        </option>
                      ) : null
                    )}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                 <Form.Group as={Col} md="4">
                  <Form.Label htmlFor="EmployeeID_AssignTo">Employee_AssignTo</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="EmployeeID_AssignTo"
              
                   onChange={handleInputChange}
                    required
                    style={{ fontSize: "15px" }}
                  >
                    <option value="">Select EmployeeID AssignTo</option>
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
              <Form.Group as={Col} md="4">
                  <Form.Label>Assign Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="assignDate"
                    name="AssignDate"
                    value={formData.AssignDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} md="4">
                  <Form.Label>Deadline Date</Form.Label>
                  <Form.Control type="date" placeholder="Deadline Date" name="DeadlineDate" required 
                  value={formData.DeadlineDate}
                  onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide DeadlineDate
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="AssignmentPriority">
                  <Form.Label>Priority</Form.Label>

                  <Form.Select type="text" placeholder="Priority"  name="AssignmentPriority" required
                  value={formData.AssignmentPriority}
                  onChange={handleInputChange}
                  >
                    <option>Select priority</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
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
                    name="Assignment_Description"
                    value={formData.Assignment_Description}
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
                  disabled={isLoading}
                 style={{backgroundColor:"#055f85", borderColor:"#055f85"}}
                >
                  {isLoading ? "Submitting..." : "Submit"}
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
