import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  Paper,
  Typography,
  keyframes,
  styled,
  useMediaQuery,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

let drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const sideBarData = [
  { title: "User", path: "/", icon: {}, subHeader: [] },
  { title: "RemoteDaignostics", path: "/", icon: {}, subHeader: [] },
  { title: "ModelManagement", path: "/", icon: {}, subHeader: [] },
  { title: "FirmwareManagement", path: "/", icon: {}, subHeader: [] },
  {
    title: "Appliance",
    path: "/",
    icon: {},
    subHeader: [
      {
        title: "CreateAppliance",
        path: "/",
        icon: {},
      },
      {
        title: "ViewStatus",
        path: "/",
        icon: {},
      },
    ],
  },
  {
    title: "SystemConfig",
    path: "/",
    icon: {},
    subHeader: [
      {
        title: "EnvironmentVariable",
        path: "/",
        icon: {},
      },
    ],
  },
];

const blink = keyframes`
  from { opacity: 0.7; }
  to { opacity: 1; }
`;

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const mediumAndAboveScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [activePage, setActivePage] = React.useState("User");
  const [groupMenuOpenFlag, setGroupMenuOpenFlag] = React.useState({
    Appliance: false,
    SystemConfig: false,
  });

  const handleGroupMenu = (Key, value) => {
    switch (Key) {
      case "Appliance":
        setGroupMenuOpenFlag({ ...groupMenuOpenFlag, Appliance: value });
        break;
      case "SystemConfig":
        setGroupMenuOpenFlag({ ...groupMenuOpenFlag, SystemConfig: value });
        break;
      default:
        setGroupMenuOpenFlag({
          ...groupMenuOpenFlag,
          Appliance: false,
          SystemConfig: false,
        });
    }
  };

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

      <Grid container>
        {sideBarData.map((item, index) => {
          return (
            <React.Fragment>
              {item.subHeader.length === 0 && (
                <Grid
                  item
                  xs={12}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setActivePage(item.title);
                  }}
                >
                  <Paper
                    sx={{
                      mx: 1,
                      my: 0.5,
                      px: 3,
                      py: 1,
                      borderRadius: "2rem",
                      background: item.title === activePage && "#1e88ff",
                      color: item.title === activePage && "#fff",
                    }}
                    elevation={activePage === item.title ? 3 : 0}
                  >
                    <Typography
                      sx={{
                        animation:
                          item.title === activePage &&
                          `${blink} 1s linear infinite`,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Paper>
                </Grid>
              )}

              {item.subHeader.length > 0 && (
                <React.Fragment>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      cursor: "pointer",
                      mx: 1,
                      my: 0.5,
                      px: 3,
                      py: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "2rem",
                    }}
                    onClick={() =>
                      handleGroupMenu(
                        item.title,
                        !groupMenuOpenFlag[item.title]
                      )
                    }
                  >
                    <Typography> {item.title}</Typography>
                    {groupMenuOpenFlag[item.title] ? (
                      <ExpandMore
                        onClick={() => handleGroupMenu(item.title, true)}
                      />
                    ) : (
                      <ExpandLess
                        onClick={() => handleGroupMenu(item.title, false)}
                      />
                    )}
                  </Grid>
                  {groupMenuOpenFlag[item.title] &&
                    item.subHeader.map((i, ind) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sx={{ cursor: "pointer", pl: 2 }}
                          onClick={() => {
                            setActivePage(i.title);
                          }}
                        >
                          <Paper
                            sx={{
                              mx: 1,
                              my: 0.5,
                              px: 3,
                              py: 1,
                              borderRadius: "2rem",
                              background: i.title === activePage && "#1e88ff",
                              color: i.title === activePage && "#fff",
                            }}
                            elevation={activePage === i.title ? 3 : 0}
                          >
                            <Typography
                              sx={{
                                animation:
                                  i.title === activePage &&
                                  `${blink} 1s linear infinite`,
                              }}
                            >
                              {i.title}
                            </Typography>
                          </Paper>
                        </Grid>
                      );
                    })}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
      </Grid>
    </Drawer>
  );
};

export default Sidebar;
