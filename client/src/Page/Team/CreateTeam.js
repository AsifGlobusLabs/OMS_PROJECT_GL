import React, { useEffect, useState } from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import profile from "./profile.webp";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

const CreateTeam = () => {
  const { EmployeeID } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  console.log(item, "fjhfhfh");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:3306/api/employee/allData";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data where DepartmentID is equal to "DEPT001"
  const filteredData01 = data.filter((item) => item.DepartmentID === "DEPT001");
  const filteredData02 = data.filter((item) => item.DepartmentID === "DEPT002");
  const filteredData03 = data.filter((item) => item.DepartmentID === "DEPT003");

  // console.log(item, "hekkii");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3306/api/employee/allData/${EmployeeID}`,
          {
            method: "GET", // You might want to explicitly specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Specify content type if required by your API
              // Add any other headers required by your API
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [EmployeeID]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Create Team
        </Typography>
        <div className="createTeam-container">
          {item.map((items) => (
            <Card
              sx={{ width: 200, height: 200, margin: "10px", padding: "10px" }}
            >
              <CardActionArea>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    image={profile}
                    alt="profile"
                    sx={{ height: "100px", width: "100px" }}
                  />
                </div>

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
          <Tab.Container id="fill-tab-example" defaultActiveKey="first">
            <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
              <Col lg={2}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Software</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">HR</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">SCM</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>

              <Col lg={8} style={{ marginLeft: "20px" }}>
               
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <table className="table table-striped">
                  <thead style={{ fontSize: "15px" }}>
                    <tr>
                      <th>EmployeeID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                      <tbody style={{ fontSize: "13px" }}>
                        {filteredData01.map((item) => (
                          <tr key={item._id}>
                            <td>{item.EmployeeID}</td>
                            <td>{item.FirstName}</td>
                            <td>{item.DesignationID}</td>
                            <td>{item.DepartmentID}</td>
                            <td>{item.EmploymentStatus}</td>
                          </tr>
                        ))}
                      </tbody>
                      </table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <table className="table table-striped">
                  <thead style={{ fontSize: "15px" }}>
                    <tr>
                      <th>EmployeeID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                      <tbody style={{ fontSize: "13px" }}>
                        {filteredData02.map((item) => (
                          <tr key={item._id}>
                            <td>{item.EmployeeID}</td>
                            <td>{item.FirstName}</td>
                            <td>{item.DesignationID}</td>
                            <td>{item.DepartmentID}</td>
                            <td>{item.EmploymentStatus}</td>
                          </tr>
                        ))}
                      </tbody>
                      </table>
                      </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <table className="table table-striped">
                  <thead style={{ fontSize: "15px" }}>
                    <tr>
                      <th>EmployeeID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Add</th>
                    </tr>
                  </thead>
                      <tbody style={{ fontSize: "13px" }}>
                        {filteredData03.map((item) => (
                          <tr key={item._id}>
                            <td>{item.EmployeeID}</td>
                            <td>{item.FirstName}</td>
                            <td>{item.DesignationID}</td>
                            <td>{item.DepartmentID}</td>
                            <td>{item.EmploymentStatus}</td>
                          </tr>
                        ))}
                      </tbody>
                      </table>
                    </Tab.Pane>
                  </Tab.Content>
                
              </Col>
            </div>
          </Tab.Container>
        </div>
      </Box>
    </Box>
  );
};

export default CreateTeam;
