// menuItems.js
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from "@mui/icons-material/Category";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";

export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/"},
  { text: "Product", icon: <CategoryIcon />, path: "/product" },
  { text: "Add Product", icon: <AddCircleIcon />, path: "/addproduct" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];
