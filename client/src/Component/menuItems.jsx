// menuItems.js
import React, { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ViewListIcon from '@mui/icons-material/ViewList';

const userData = JSON.parse(sessionStorage.getItem("userData"));


export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/"},
  { text: "New Employee", icon: <AppRegistrationIcon/>, path: "/newEmployee"},
  { text: "View Employee", icon: <TableRowsIcon/>, path: "/viewEmployee"},
  { text: "New Department", icon: <ViewListIcon/>, path: "/Department"},
  { text: "New Designation", icon: <ViewListIcon/>, path: "/newdesignation"},
  { text: "Team", icon: <GroupsIcon/>, path: "/team" },
  { text: "New Assignment", icon: <AssignmentIcon />, path: "/assignment" },
  { text: "My Assignment", icon: <AssignmentIcon />, path: "/view-assignment" },
  { text: "New Task", icon: <AddCircleIcon />, path: "/Newtask" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },

];








// // menuItems.js
// import React, { useEffect, useState } from "react";
// import HomeIcon from '@mui/icons-material/Home';
// import GroupsIcon from '@mui/icons-material/Groups';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import SettingsIcon from "@mui/icons-material/Settings";
// import TableRowsIcon from '@mui/icons-material/TableRows';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
// import ViewListIcon from '@mui/icons-material/ViewList';

// const userData = JSON.parse(sessionStorage.getItem("userData"));
// const userRole = userData ? userData.Role : "";

// let menuItems = [
//   { text: "Home", icon: <HomeIcon />, path: "/"},
//   { text: "New Employee", icon: <AppRegistrationIcon/>, path: "/newEmployee"},
//   { text: "View Employee", icon: <TableRowsIcon/>, path: "/viewEmployee"},
//   { text: "New Department", icon: <ViewListIcon/>, path: "/Department"},
//   { text: "New Designation", icon: <ViewListIcon/>, path: "/newdesignation"},
//   { text: "Team", icon: <GroupsIcon/>, path: "/team" },
//   { text: "New Assignment", icon: <AssignmentIcon />, path: "/assignment" },
//   { text: "My Assignment", icon: <AssignmentIcon />, path: "/view-assignment" },
//   { text: "New Task", icon: <AddCircleIcon />, path: "/Newtask" },
//   { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
// ];

// if (userRole === "Admin") {
//   // If user is not an admin, filter out the items they shouldn't see
//   menuItems = menuItems.filter(item => {
//     return item.text === "Home" || item.text === "My Assignment" || item.text === "New Task" ;
//   });
// }

// export { menuItems };
