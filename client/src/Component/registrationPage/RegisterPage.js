import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import logo from "../../assets/images/Gl-Logo.png";
import { useEffect, useState } from "react";

function RegisterPage() {
  const [validated, setValidated] = useState(false);

  const [EmployeeID, setEmployeeID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Gender, setGender] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [JoinDate, setJoinDate] = useState("");
  const [EmploymentStatus, setEmploymentStatus] = useState("");
  const [DepartmentID, setDepartmentID] = useState("");
  const [DesignationID, setDesignationID] = useState("");
  const [EmployeeGroupID, setEmployeeGroupID] = useState("");
  // const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    // Set loading state to true while waiting for the API response
    setIsLoading(true);

    try {
      const apiUrl = "http://localhost:3306/api/employee"; // Replace with your actual API endpoint
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeID,
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
          EmployeeGroupID,
        }),
      });

      // Assuming your API returns JSON, you can parse it like this
      const data = await response.json();

      // Update state with the API response
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("registration failed");
    } finally {
      // Set loading state back to false, whether the request was successful or not
      setIsLoading(false);

      if (response && response.success) {
        window.location.reload();
      }

      setEmployeeID("");
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setGender("");
      setContactNumber("");
      setEmail("");
      setAddress("");
      setJoinDate("");
      setEmploymentStatus("");
      setDepartmentID("");
      setDesignationID("");
      setEmployeeGroupID("");
    }
    setValidated(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/employeeGroup";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        
        setData(result);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
          <img src={logo} alt="logo"></img>
        </div>

        <Link
          to={"/loginpage"}
          target="_blank"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              color: "white",
              paddingRight: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              className="fa-solid fa-right-to-bracket"
              style={{ fontSize: "19px", color: "white" }}
            ></i>
            <span
              style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
            >
              LOGIN
            </span>
          </div>
        </Link>
      </div>

      <div className="register-container">
        <div className="register-section">
          <h4>SIGN-UP</h4>
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
                        required
                        value={EmployeeID}
                        onChange={(e) => setEmployeeID(e.target.value)}
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
                      value={EmployeeGroupID}
                      onChange={(e) => setEmployeeGroupID(e.target.value)}
                     
                    >
                      <option>Select Employee Group ID</option>
                       {data.map((item) => (
                        
                      <option  key={item._id}>{item.EmployeeGroupID} - {item.GroupName}</option>

                      ))}

                    </Form.Select>
                 
                  </Form.Group>
               
                </Row>

                

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="First name"
                      value={FirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Last name"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="DOB"
                      value={DateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label>Gender</Form.Label>
                    <InputGroup required>
                      <Form.Check
                        inline
                        label="Male"
                        name="group1"
                        type="radio"
                        value="M"
                        checked={Gender === "M"}
                        onChange={(e) => setGender(e.target.value)}
                        isInvalid={validated && !Gender}
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="group1"
                        type="radio"
                        value="F"
                        checked={Gender === "F"}
                        onChange={(e) => setGender(e.target.value)}
                        isInvalid={validated && !Gender}
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
                      required
                      type="email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback>
                      Please Enter Email
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Phone Number"
                      value={ContactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
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
                      placeholder="Address.."
                      required
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
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
                      required
                      type="date"
                      id="Date"
                      value={JoinDate}
                      onChange={(e) => setJoinDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label htmlFor="EmployementStatus">
                      Employement Status
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      value={EmploymentStatus}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                    >
                      <option>select Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Department ID</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Department ID"
                      value={DepartmentID}
                      onChange={(e) => setDepartmentID(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Label>Designation ID</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Designation ID"
                      value={DesignationID}
                      onChange={(e) => setDesignationID(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="myFile" style={{display:"flex", textAlign:"center"}}>
            <Form.Label htmlFor="myFile" style={{marginRight:"20px"}}>Upload Photo</Form.Label>
             <input type="file" id="myFile" name="myFile"/>
            </Form.Group>
            </Row> */}
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
