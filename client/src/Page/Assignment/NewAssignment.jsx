import React from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Assignment.css";
import Card from "react-bootstrap/Card";

export default function NewAssignment() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h5">New Assignment</Typography>
        <div className="assignment-container">
          <div className="assignment-card">
            {["Primary", "Success", "Danger"].map((variant) => (
              <Card
                bg={variant.toLowerCase()}
                key={variant}
                text={variant.toLowerCase() === "light" ? "dark" : "white"}
                style={{ width: "16rem", height:"10rem" }}
                className="mb-2"
              >
                <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>{variant} Card Title </Card.Title>
                  <Card.Text>
                    Some quick example text to build 
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
}
