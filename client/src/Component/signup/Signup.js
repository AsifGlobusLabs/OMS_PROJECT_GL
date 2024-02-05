// import React, { useEffect, useState } from "react";
// import logo from "../../assets/images/Gl-Logo.png";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import "./Signup.css";

// function Signup() {
//   const [data, setData] = useState([]);
//   const [validated, setValidated] = useState(false);

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
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // const [formData, setFormData] = useState({
//   //   UserID: "",
//   //   EmployeeID: "",
//   //   Role: "",
//   //   Username: "",
//   //   Password: "",
//   //   confirm_password:""
//   // });

//   // const [isLoading, setIsLoading] = useState(false);

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prevData) => ({
//   //     ...prevData,
//   //     [name]: value,
//   //   }));
//   // };

//   // const handleSubmit = async (event) => {
//   //   const form = event.currentTarget;

//   //   if (form.checkValidity() === false) {
//   //     event.preventDefault();
//   //     event.stopPropagation();
//   //   }

//   //   setValidated(true);

//   //   if (form.checkValidity() === true) {
//   //     try {
//   //       setIsLoading(true);

//   //       const apiUrl = "http://localhost:3306/api/userDetails"; // Replace with your actual API endpoint
//   //       const response = await fetch(apiUrl, {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify(formData),
//   //       });

//   //       if (response.ok) {
//   //         console.log("Registration successful!");
//   //         // Optionally, you can redirect the user or perform other actions after successful registration
//   //       } else {
//   //         console.error("Registration failed:", response.statusText);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error submitting data:", error);
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   }
//   // };

//   const [UserID, setUserID] = useState('');
//   const [EmployeeID, setEmployeeID] = useState('');
//   const [Role, setRole] = useState('');
//   const [Username, setUsername] = useState('');
//   const [Password, setPassword] = useState('');
//   const [confirm_password, setconfirm_password] = useState('');

//   const [isLoading, setIsLoading] = useState(false);
//   const [response, setResponse] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Set loading state to true while waiting for the API response
//     setIsLoading(true);

//     try {
//       const apiUrl = 'http://localhost:3306/api/userDetails'; // Replace with your actual API endpoint
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ UserID, EmployeeID, Username, Role ,Password, confirm_password  }),
//       });

//       // Assuming your API returns JSON, you can parse it like this
//       const data = await response.json();

//       // Update state with the API response
//       setResponse(data);

//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert("registration failed")
//     } finally {
//       // Set loading state back to false, whether the request was successful or not
//       setIsLoading(false);
//       setUserID('');
//       setEmployeeID('');
//       setRole('');
//       setUsername('');
//       setPassword('');
//       setconfirm_password('');
//     }
//   };

//   return (
//     <div className="main-container p-0" style={{ width: "100vw" }}>
//       <div
//         className="signup-header p-2"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div className="logo">
//         <Link to={"/"}>
//           <img src={logo} alt="logo"></img>
//           </Link>
//         </div>

//         <Link
//           to={"/loginpage"}
//           style={{
//             textDecoration: "none",
//           }}
//         >
//           <div
//             style={{
//               color: "white",
//               paddingRight: "25px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <i
//               className="fa-solid fa-right-to-bracket"
//               style={{ fontSize: "19px", color: "white" }}
//             ></i>
//             <span
//               style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
//             >

//              SIGN-IN
//             </span>
//           </div>
//         </Link>
//       </div>

//       <div className="signup-container">
//         <div className="signup-section">
//           <h4>SIGN-UP</h4>
//           <div className="signup">
//             <div className="right-signup">
//               <div className="right-img"></div>
//             </div>

//             {/* ----------------form----------------- */}
//             <div className="left-signup">
//               <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                 <Row className="mb-3">
//                   <Form.Group as={Col} md="6">
//                     <Form.Label>User ID</Form.Label>
//                     <InputGroup hasValidation>
//                       <Form.Control
//                         type="text"
//                         placeholder="User ID"
//                         aria-describedby="inputGroupPrepend"
//                         name="UserID"
//                         value={UserID}
//                         onChange={(e) => setUserID(e.target.value)}
//                         required

//                       />
//                       <Form.Control.Feedback type="invalid">
//                         Please Enter User ID.
//                       </Form.Control.Feedback>
//                     </InputGroup>
//                   </Form.Group>

//                   <Form.Group as={Col} md="6">
//                     <Form.Label htmlFor="EmployeeID">Employee ID</Form.Label>

//                     <Form.Select
//                       aria-label="Default select example"
//                       name="EmployeeID"
//                       value={EmployeeID}
//                       onChange={(e) => setEmployeeID(e.target.value)}
//                       required
//                     >
//                       <option>Select Employee ID</option>

//                       {data.map((item) => (
//                         <option key={item._id} value={item.EmployeeID}>
//                           {item.EmployeeID} - {item.FirstName} {item.LastName}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                   <Form.Group as={Col} md="6">
//                     <Form.Label>Role</Form.Label>
//                     <Form.Select
//                       type="text"
//                       placeholder="Role"
//                       name="Role"
//                       value={Role}
//                       onChange={(e) => setRole(e.target.value)}
//                       required
//                     >
//                       <option>Please Select Role</option>
//                       <option>Admin</option>
//                       <option>Manager</option>
//                       <option>HR</option>
//                       <option>Supervior</option>
//                     </Form.Select>
//                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                   </Form.Group>

//                   <Form.Group as={Col} md="6">
//                     <Form.Label>User name</Form.Label>
//                     <Form.Select
//                       aria-label="Default select example"
//                       name="Username"
//                       value={Username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     >
//                       <option>Select User Name</option>

//                       {data.map((item) => (
//                         <option key={item._id}>
//                           {item.FirstName} {item.LastName}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//                   </Form.Group>
//                 </Row>

//                 <Row className="mb-3">
//                   <Form.Group as={Col} md="6">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Password"
//                       name="Password"
//                       value={Password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                   <Form.Group as={Col} md="6">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Password"
//                       name="confirm_password"
//                       value={confirm_password}
//                       onChange={(e) => setconfirm_password(e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                 </Row>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                     <Button
//                     type="submit"
//                     className="btn btn-primary mt-2"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Submitting..." : "Submit"}
//                   </Button>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Card from "@mui/material/Card"; // Import Card component
import CardContent from "@mui/material/CardContent"; // Import CardContent component
import HeaderSignUp from "./HeaderSignUp";

const customTheme = createTheme({
  palette: {
    background: {
      default: 'whitesmoke', // Change the default background color here
    },
  },
});

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <HeaderSignUp />
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card>
            <CardContent>
              {" "}
              <span style={{ display: "flex", justifyContent: "center" }}>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
              </span>
              <Typography
                style={{ display: "flex", justifyContent: "center" }}
                component="h1"
                variant="h5"
              >
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I accept all terms and conditions"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
               
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
