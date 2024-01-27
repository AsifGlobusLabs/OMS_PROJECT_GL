import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./RegisterPage.css";
import logo from "../../assets/images/Gl-Logo.png";



function RegisterPage() {
  const [validated, setValidated] = useState(false);
  const [employeeGroupdata, setEmployeeGroupData] = useState([]);
  const [departmentData, setDepartmentData]= useState([]);
  const [deginationData, setDeginationData]= useState([]);

  const [formData, setFormData] = useState({
    EmployeeID: "",
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: "", // Assuming you have a variable called Gender
    ContactNumber: "",
    Email: "",
    Address: "",
    JoinDate: "",
    EmploymentStatus: "",
    DepartmentID: "",
    DesignationID: "",
    EmployeeGroupID: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

        const apiUrl = "http://localhost:3306/api/employee"; // Replace with your actual API endpoint
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Registration successful!");
          // Optionally, you can redirect the user or perform other actions after successful registration
        } else {
          console.error("Registration failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


// -----lastEmployeeId--------
  useEffect(() => {
    const fetchLastJobNo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3306/api/employee/lastEmployeeId",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          // Extract the numeric part from "GL001" by removing "GL"
          const numericPart = parseInt(data.lastEmployeeId.slice(2), 10);
          console.log(numericPart, "jjj");

          if (!isNaN(numericPart)) {
            // Increment the last JobNo by 1 and update the formData state
            const nextJobNo = numericPart + 1;
            console.log(nextJobNo);
            setFormData({
              ...formData,
              EmployeeID: `GL${nextJobNo.toString().padStart(3, "0")}`,
            });
           
          } else {
            console.error("Invalid numeric part:", data.lastEmployeeId);
          }
        } else {
          console.error("Failed to fetch last JobNo");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call the fetchLastJobNo function when the component mounts
    fetchLastJobNo();
  }, []);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const apiUrl = "http://localhost:3306/api/employeeGroup";
  //       const response = await fetch(apiUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  

  
  const fetchData = async (apiUrl, setterFunction) => {
    try {
        setIsLoading(true); // Set loading state to true before fetching data
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          
        });
  
        const result = await response.json();
        setterFunction(result);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setIsLoading(false); // Set loading state to false after fetching data (regardless of success or failure)
    }
  };
  //----employeeGroupdata---
  useEffect(() => {
    fetchData("http://localhost:3306/api/employeeGroup", setEmployeeGroupData);
  }, []);
  
  // ----departmentData---
  useEffect(() => {
    fetchData("http://localhost:3306/api/department", setDepartmentData);
  }, []);
  
  // ----deginationData----
  useEffect(() => {
    fetchData("http://localhost:3306/api/designation", setDeginationData);
  }, []);
  


  return (
    <div className="main-container p-0" style={{ width: "100vw" }}>
      <div
        className="register-header p-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="logo"></img>
          </Link>
        </div>

        <Link
          to={"/signuppage"}
          
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              color: "white",
              paddingRight: "25px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              className="fa-solid fa-user"
              style={{ fontSize: "16px", color: "white" }}
            ></i>
            <span
              style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
            >
              SIGN-UP
            </span>
          </div>
        </Link>
      </div>

      <div className="register-container">
        <div className="register-section">
          <h4>REGISTRATION FORM</h4>
          <div className="register">
            <div className="right-register">
              <div className="right-img"></div>
            </div>

            {/* ----------------form----------------- */}
            <div className="left-register">
              {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Employee ID</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Employee ID"
                        aria-describedby="inputGroupPrepend"
                        name="EmployeeID"
                        value={formData.EmployeeID}
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Employee ID.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="EmployeeGroupID">
                      Employee Group ID
                    </Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      name="EmployeeGroupID"
                      value={formData.EmployeeGroupID}
                      onChange={handleInputChange}
                      required
                    >
                      <option>
                        Select Employee Group ID
                      </option>
                      {employeeGroupdata.map((item) => (
                        <option key={item._id}>
                          {item.EmployeeGroupID} - {item.GroupName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      require
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="DOB"
                      name="DateOfBirth"
                      value={formData.DateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label>Gender</Form.Label>
                    <InputGroup required>
                      <Form.Check
                        inline
                        label="Male"
                        name="Gender"
                        type="radio"
                        value="M"
                        checked={formData.Gender === "M"}
                        onChange={handleInputChange}
                        isInvalid={validated && !formData.Gender}
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="Gender"
                        type="radio"
                        value="F"
                        checked={formData.Gender === "F"}
                        onChange={handleInputChange}
                        isInvalid={validated && !formData.Gender}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a gender.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback>
                      Please Enter Email
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Phone Number"
                      name="ContactNumber"
                      value={formData.ContactNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback>
                      Please Enter Phone Number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="Address"
                      value={formData.Address}
                      onChange={handleInputChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a Address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="Date">Join Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Join Date"
                      name="JoinDate"
                      value={formData.JoinDate}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="EmployementStatus">
                      Employement Status
                    </Form.Label>
                    <Form.Select
                      aria-label="Employment Status"
                      name="EmploymentStatus"
                      value={formData.EmploymentStatus}
                      onChange={handleInputChange}
                      required
                    >
                      <option>select Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="DepartmentID">
                      Department ID
                    </Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      name="DepartmentID"
                      value={formData.DepartmentID}
                      onChange={handleInputChange}
                      required
                    >
                      <option>
                      Select Department ID
                      </option>
                      {departmentData.map((item) => (
                        <option key={item._id}>
                          {item.DepartmentID} - {item.DepartmentName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                 
                 

                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="DesignationID">
                      Designation ID
                    </Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      name="DesignationID"
                      value={formData.DesignationID}
                      onChange={handleInputChange}
                      required
                    >
                      <option>
                      Select Designation ID
                      </option>
                      {deginationData.map((item) => (
                        <option key={item._id}>
                          {item.DesignationID} - {item.DesignationName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    className="btn btn-primary mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;