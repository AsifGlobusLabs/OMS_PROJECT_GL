import React from 'react';
import "./Assignment.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from '@mui/material';

const AssignmentCard = () => {
  const statuses = [
    { status: "Pending", color: "#dc3545" },
    { status: "Progress", color: "orange" },
    { status: "Complete", color: "#28a745" }
  ];

  return (
    <div className='Assignmentcard-container'>
      <Typography variant="h5" style={{fontWeight:"500"}}>Assignment Status</Typography>
      <div className="assignment-card">
        {statuses.map(({ status, color }) => (
          <Card
            key={status}
            sx={{
              backgroundColor: color,
              color: "white",
              width: "16rem",
              height: "10rem",
              marginBottom: "16px",
            }}
          >
            <CardHeader title={status} />
            <CardContent>
              <Typography variant="h6" component="div">
                {status} Card Title
              </Typography>
              <Typography variant="body2">
                {status === "Pending" ? "Some pending tasks" :
                 status === "Progress" ? "Tasks in progress" :
                 status === "Complete" ? "Completed tasks" : ""}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AssignmentCard;
