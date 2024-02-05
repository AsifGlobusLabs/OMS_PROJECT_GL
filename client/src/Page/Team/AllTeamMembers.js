// import * as React from "react";
// import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./Team.css";
// import profile from "./profile.webp";
// import SideBar from "../../Component/SideBar"; // Assuming you have a SideBar component

// export default function AllTeamMembers() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiUrl = "http://localhost:3306/api/employee/allData";
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

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <SideBar />
//       <Box component="main" sx={{ flexGrow: 1, marginTop: "55px" }}>
//         <div className="card-container">
//           {data.map((item) => (
//             <Card key={item.EmployeeID} sx={{ width: 200, margin: "10px", padding: "10px" }}>
//               <CardActionArea>
//                 <div style={{ display: "flex", justifyContent: "center" }}>
//                   <CardMedia
//                     component="img"
//                     image={profile}
//                     alt="profile"
//                     sx={{ height: "100px", width: "100px" }}
//                   />
//                 </div>

//                 <CardContent sx={{ textAlign: "center" }}>
//                   <Typography gutterBottom variant="h6" component="div">
//                     {item.FirstName} {item.LastName}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.EmployeeID}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//               <CardActions sx={{ display: "flex", justifyContent: "center" }}>
//                 <Link to={`/createteam/${item.EmployeeID}`} key={item.EmployeeID}>
//                   <Button size="small" color="primary">
//                     Create Team
//                   </Button>
//                 </Link>
//               </CardActions>
//             </Card>
//           ))}
//         </div>
//       </Box>
//     </Box>
//   );
// }
import * as React from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Team.css";
import profile from "./profile.webp";
import SideBar from "../../Component/SideBar"; // Assuming you have a SideBar component

export default function AllTeamMembers() {
  const [data, setData] = useState([]);

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

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, marginTop: "55px", padding: "20px" }}>
        <div className="card-container">
          {data.map((item) => (
            <Card key={item.EmployeeID} sx={{ maxWidth: 300, margin: "10px", transition: "transform 0.3s ease-in-out" }}>
              <CardActionArea>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                  <CardMedia
                    component="img"
                    image={profile}
                    alt="profile"
                    sx={{ height: 140, width: 140, borderRadius: "50%" }}
                  />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {item.FirstName} {item.LastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    ID: {item.EmployeeID}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center" }}>
                <Link to={`/createteam/${item.EmployeeID}`} key={item.EmployeeID} style={{ textDecoration: "none" }}>
                  <Button size="small" variant="contained" color="primary">
                    Create Team
                  </Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </div>
      </Box>
    </Box>
  );
}
