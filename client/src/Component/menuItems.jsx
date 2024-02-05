// menuItems.js
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ViewListIcon from '@mui/icons-material/ViewList';

export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/"},
  { text: "New Employee", icon: <AppRegistrationIcon/>, path: "/newEmployee"},
  { text: "View Employee", icon: <TableRowsIcon/>, path: "/viewEmployee"},
  { text: "New Department", icon: <ViewListIcon/>, path: "/Department"},
  { text: "Team", icon: <GroupsIcon/>, path: "/team" },
  { text: "Assignment", icon: <AssignmentIcon />, path: "/assignment" },
  { text: "Task", icon: <AddCircleIcon />, path: "/task" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },

];
