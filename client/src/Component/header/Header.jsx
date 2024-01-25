// Header.js
import React from 'react';
import { styled} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
// import logo from '../../assets/images/Gl-Logo.png'

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
  return (
    <AppBar position="fixed" open={open} style={{background:"#5c7c77"}}>
      <Toolbar style={{ justifyContent:"space-between", alignItems:"center"}}>
        <div >
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
        <div style={{display:"flex", alignItems:"center"}}>
          
        <Link to={"/loginpage"} style={{textDecoration:"none", color:"white"}} >
        <div
            style={{
              color: "white",
              paddingRight: "15px",
              display: "flex",
              alignItems: "center",
          
            }}
          >
        <i
              className="fa-solid fa-right-to-bracket"
              style={{ fontSize: "18px", color:"white" }}
            ></i>
            <span
              style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
            >
              LOGIN
            </span>
            </div>
           </Link>


           <Link to={"/registerpage"} style={{textDecoration:"none", color:"white"}} >
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
              style={{ fontSize: "18px", color:"white" }}
            ></i>
            <span
              style={{ fontSize: "12px", marginLeft: "3px", fontWeight: 600 }}
            >
              REGISTER
            </span>
            </div>
           </Link>
           </div>
         

        {/* <Container style={{ display:"flex", alignItems:"center"}}>
         <img src={logo} alt="" style={{width:"140px", background:"white"}}/>
        </Container> */}
      </Toolbar>
      
    </AppBar>
  );
}
