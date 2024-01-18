import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

let drawerWidth = 240;

const sideBarData = [
  { title: "User" },
  { title: "Remote Daignostics" },
  { title: "Model Management" },
  { title: "Firmware Management" },
  { title: "Appliance" },
  { title: "System Config" },
];

const Sidebar = ({ open, handleDrawerClose, DrawerHeader }) => {
  const theme = useTheme();
  const mediumAndAboveScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [theme.breakpoints.down("md")]: {
          zIndex: open ? 1300 : -1,
        },
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
          borderRight: "none",
          boxSizing: "border-box",
          boxShadow:
            "rgb(0 0 0 / 2%) 0px 1px 3px 0px, rgb(27 31 35 / 15%) 0px 0px 0px 1px",
        },
      }}
      variant={mediumAndAboveScreen ? "persistent" : "temporary"}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {sideBarData.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
