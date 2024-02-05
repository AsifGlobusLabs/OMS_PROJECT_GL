import React from 'react'
import "./Assignment.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from '@mui/material';


const AssignmentCard = () => {
  return (
    <div className='Assignmentcard-container'>
    <Typography variant="h5" style={{fontWeight:"500"}}>Assignment Status</Typography>
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
  )
}

export default AssignmentCard