import React from "react";
import { IconButton, Typography, AppBar, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  const theme = useTheme();
  const drawerHandler = () => {
    open ? handleDrawerClose() : handleDrawerOpen();
  };
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        [theme.breakpoints.up("sm")]: {
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      }}
    >
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={drawerHandler}
          edge="start"
          sx={{
            mr: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography color={"#1e88ff"} variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
