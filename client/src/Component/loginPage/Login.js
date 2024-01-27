import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import axios from "axios";
import "./Login.css";
import logo from '../../assets/images/Gl-Logo.png'

const Login = () => {
  const [UserID, setUserID] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3306/api/userDetails/login",
        {
          UserID: UserID,
          Password: Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          
        },
      );

      const data = response.data;

      if (!data) {
        setError("Invalid Employee ID or Password");
      } else {
        console.log("login successful");
        navigate("/");
      }
    } catch (error) {
      setError("Invalid Employee ID or Password");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container p-0">
     <div
        className="login-header p-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo">
          <Link to={"/"}>
          <img src={logo} alt="logo" ></img>
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





      <div className="login-container">
        <div className="login-section">
          <div>
            <h4>SIGN-IN</h4>
          </div>
          <div className="login-section1">
            <div className="login-left">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Login Image"
              />
            </div>

            <div className="login-right">
              <MDBContainer className="p-3 my-5 d-flex flex-column w-70">
                <label
                  htmlFor="form1"
                  className="col-sm-4 col-form-label"
                >
                  User ID:
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form1"
                  type="text"
                  value={UserID}
                  onChange={(e) => setUserID(e.target.value)}
                />
                <label
                  htmlFor="form2"
                  className="col-sm-4 col-form-label"
                >
                  Password:
                </label>
                <MDBInput
                  wrapperClass="mb-4"
                  id="form2"
                  type="Password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  class="col-sm-10"
                  style={{
                    border: "none",
                    background: "#24a0ed",
                    color: "white",
                    borderRadius: "5px",
                    padding: "5px 0px",
                    marginTop: "10px",
                    width:"100%",
                  }}  
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </MDBContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
