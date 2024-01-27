// menuItems.js
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";

export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/"},
  { text: "Assignment", icon: <CategoryIcon />, path: "/assignment" },
  { text: "Task", icon: <AddCircleIcon />, path: "/task" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];
