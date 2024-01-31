import * as React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import "./Team.css";
import profile from "./profile.webp"

export default function ScmTeam() {
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const apiUrl = "http://localhost:3306/api/employee";
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
  const filteredData = data.filter(item => item.DepartmentID === "DEPT003");

  return (
      <div className='card-container'>
          {filteredData.map((item) => (
              <Card sx={{ width: 220, margin: "10px", padding: "10px" }} key={item.EmployeeID}>
                  <CardActionArea>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                          <CardMedia
                              component="img"
                              image={profile}
                              alt='profile'
                              sx={{ height: "120px", width: "120px" }}
                          />
                      </div>
                      <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                              {item.FirstName} {item.LastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                              {item.EmployeeID}
                          </Typography>
                      </CardContent>
                  </CardActionArea>
                  <CardActions>
                      <Button size="small" color="primary">
                          create Team<AddCircleIcon />
                      </Button>
                  </CardActions>
              </Card>
          ))}
      </div>
  );
}


