// // Header.js
// import React from 'react';
// import { styled} from '@mui/material/styles';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// // import Typography from '@mui/material/Typography';
// // import { Container } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';
// // import logo from '../../assets/images/Gl-Logo.png'

// // Define the drawer width
// const drawerWidth = 240;

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// export default function Header({ open, handleDrawerOpen }) {
//   return (
//     <AppBar position="fixed" open={open} style={{background:"#5c7c77"}}>
//       <Toolbar style={{ justifyContent:"space-between", alignItems:"center"}}>
//         <div >
//         <IconButton
//           color="inherit"
//           aria-label="open drawer"
//           onClick={handleDrawerOpen}
//           edge="start"
//           sx={{
//             marginRight: 5,
//             ...(open && { display: 'none' })
//           }}
//         >
//           <MenuIcon />
          
//         </IconButton>
//         </div>
//         <div style={{display:"flex", alignItems:"center"}}>
          
//         <Link to={"/loginpage"} style={{textDecoration:"none", color:"white"}} >
//         <div
//             style={{
//               color: "white",
//               paddingRight: "15px",
//               display: "flex",
//               alignItems: "center",
          
//             }}
//           >
//         <i
//               className="fa-solid fa-right-to-bracket"
//               style={{ fontSize: "18px", color:"white" }}
//             ></i>
//             <span
//               style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
//             >
//               SIGN-IN
//             </span>
//             </div>
//            </Link>


//            <Link to={"/registerpage"} style={{textDecoration:"none", color:"white"}} >
//            <div
//             style={{
//               color: "white",
//               paddingRight: "15px",
//               display: "flex",
//               alignItems: "center",
          
//             }}
//           >
//         <i
//               className="fa-solid fa-address-card"
//               style={{ fontSize: "18px", color:"white" }}
//             ></i>
//             <span
//               style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
//             >
//               REGISTER
//             </span>
//             </div>
//            </Link>
//            </div>
         

//         {/* <Container style={{ display:"flex", alignItems:"center"}}>
//          <img src={logo} alt="" style={{width:"140px", background:"white"}}/>
//         </Container> */}
//       </Toolbar>
      
//     </AppBar>
//   );
// }



// Header.js
import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Popper from '@mui/material/Popper';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Define the drawer width
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen }) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const isOpen = Boolean(anchorEl); // Renamed from open to isOpen
  const id = isOpen ? 'simple-popper' : undefined; // Renamed from open to isOpen

  return (
    <AppBar position="fixed" open={open} style={{ background: "#5c7c77" }}>
      <Toolbar style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />

          </IconButton>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          
          
          <AccountCircleIcon aria-describedby={id} type="button" onClick={handleClick} sx={{fontSize:"32px", marginRight:"10px"}}/>
          <Popper id={id} open={isOpen} anchorEl={anchorEl}>
            <Box sx={{ border: 'none', p: 1, bgcolor: '#5c7c77', marginTop:"20px"}}>

            
        <List>
          <ListItem disablePadding>
          <Link to={"/loginpage"} style={{textDecoration:"none", color:"white"}}>
            <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
                <LoginIcon/>
              </ListItemIcon>
              <ListItemText primary="SIGN-IN" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to={"/signuppage"} style={{textDecoration:"none", color:"white"}}>
            <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary="SIGN-UP" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            
           
              <Link to={"/registerpage"} style={{textDecoration:"none", color:"white"}}>
            <ListItemButton>
            <ListItemIcon sx={{color:"white"}}>
                <AppRegistrationIcon/>
              </ListItemIcon>
              <ListItemText primary="REGISTER" />
            </ListItemButton>
            </Link>
          </ListItem>
        </List>
    
            </Box>
          </Popper>
        </div>
      </Toolbar>

    </AppBar>
  );
}




