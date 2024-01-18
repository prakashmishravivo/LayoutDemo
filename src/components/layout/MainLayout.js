import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "./Sidebar";
import Header from "./Header";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    backgroundColor: "#fff",
    marginTop: "64px",
    minHeight: "calc(100vh - 112px)",
    width: `100%`,
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: theme.spacing(1),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
      width: `calc(100% - ${drawerWidth + 50}px)`,
    },

    [theme.breakpoints.down("md")]: {
      minHeight: "calc(100vh - 64px)",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
      flexGrow: 1,
      padding: theme.spacing(1),

      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),

      marginLeft: "10px",
      marginRight: "10px",
      width: `calc(100% - ${drawerWidth + 10}px)`,
    },
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MainLayout(props) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Sidebar
        open={open}
        handleDrawerClose={handleDrawerClose}
        DrawerHeader={DrawerHeader}
      />
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}
