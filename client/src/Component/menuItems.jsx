// menuItems.js
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";

export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/"},
  { text: "Team", icon: <GroupsIcon/>, path: "/team" },
  { text: "Assignment", icon: <AssignmentIcon />, path: "/assignment" },
  { text: "Task", icon: <AddCircleIcon />, path: "/task" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },

];
