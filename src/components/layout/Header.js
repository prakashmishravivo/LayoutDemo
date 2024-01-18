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
        [theme.breakpoints.up("sm")]: {
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={drawerHandler}
          edge="start"
          sx={{
            mr: 2,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Persistent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
