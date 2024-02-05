import React from "react";
import SideBar from "../../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Assignment.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

export default function NewAssignment() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Typography variant="h5">Assignment</Typography>
        <div className="assignment-container">
          <div className="assignment-card">
            {["Primary", "Success", "Danger"].map((variant) => (
              <Card
                key={variant}
                sx={{
                  backgroundColor:
                    variant.toLowerCase() === "primary"
                      ? "#007bff"
                      : variant.toLowerCase() === "success"
                      ? "#28a745"
                      : variant.toLowerCase() === "danger"
                      ? "#dc3545"
                      : "inherit",
                  color: "white",
                  width: "16rem",
                  height: "10rem",
                  marginBottom: "16px",
                }}
              >
                <CardHeader title="Header" />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {variant} Card Title
                  </Typography>
                  <Typography variant="body2">
                    Some quick example text to build
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
}
