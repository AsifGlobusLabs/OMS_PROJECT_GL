import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBInput} from "mdb-react-ui-kit";
import "./Login.css";
import logo from '../../assets/images/Gl-Logo.png'

const Login = () => {


  
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
           <img src={logo} alt="logo"></img>
        </div>
        
        <Link
          to={"/registerpage"}
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
              className="fa-solid fa-address-card"
              style={{ fontSize: "19px", color:"white" }}
            ></i>
            <span
              style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
            >
              REGISTER
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
              class="img-fluid"
              alt="Sample image"
            />
          </div>

          <div className="login-right">
          
            <MDBContainer className="p-3 my-5 d-flex flex-column w-70">
              <label
                for="inputEmail3"
                class="col-sm-4 col-form-label"
                style={{ color: "black", fontSize: "17px", fontWeight: 500 }}
              >
                Employee Id:
              </label>
              <MDBInput
                wrapperClass="mb-4"
                id="form1"
                type="text"
              
              />
              <label
                for="inputPassword3"
                class="col-sm-4 col-form-label"
                style={{ color: "black", fontSize: "17px", fontWeight: 500 }}
              >
                Password:
              </label>
              <MDBInput
                wrapperClass="mb-4"
                id="form2"
                type="password"
              
              />

              <button
                type="button"
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
               login
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
