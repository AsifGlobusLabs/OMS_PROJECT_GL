import React, { useEffect, useState } from 'react';
import SideBar from '../../Component/SideBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import profile from "./profile.webp"
import { Card } from 'react-bootstrap';

const CreateTeam = () => {
  const { EmployeeID } = useParams();
  const [item , setItem] = useState(null);
  const [error, setError] = useState(null);


  console.log(item, "fjhfhfh")


// console.log(item, "hekkii");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3306/api/employee/allData/${EmployeeID}`, {
          method: 'GET', // You might want to explicitly specify the HTTP method
          headers: {
            'Content-Type': 'application/json', // Specify content type if required by your API
            // Add any other headers required by your API
          },
        });

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
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '55px' }}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Create Team 
        </Typography>
        <div className='createTeam-container'>
        {item.map((items) => (
         <Card sx={{ width: 200, height:200, margin:"10px" , padding:"10px"}}>
         <CardActionArea>
           <div style={{display:"flex", justifyContent:"center"}}>
           <CardMedia
             component="img"
             
             image={profile}       
             alt='profile'
             sx={{height:"100px", width:"100px"}}
           />
           </div>
          
          
           <CardContent sx={{textAlign:"center"}}>
             <Typography gutterBottom variant="h6" component="div">
             {items.FirstName} {items.LastName}
             </Typography>
             <Typography variant="body2" color="text.secondary">
               {items.EmployeeID}
             </Typography>
           </CardContent>
           
         </CardActionArea>
      <CardActions sx={{display:"flex", justifyContent:"center"}}>
      
         </CardActions>
       </Card>
          ))}
          </div>
      </Box>
    </Box>
  );
};

export default CreateTeam;
