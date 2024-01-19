import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  listItemButtonClasses,
  listItemIconClasses,
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
      <List sx={{ py: "0" }}>
        {sideBarData.map((item, index) => (
          <React.Fragment key={index}>
            {item.subHeader.length > 0 && (
              <React.Fragment>
                <ListItem
                  disablePadding
                  onClick={() => {
                    handleGroupMenu(item.title, !groupMenuOpenFlag[item.title]);
                  }}
                  sx={{
                    borderRadius: "5rem",
                    my: "1rem",
                    border: !groupMenuOpenFlag[item.title] && "1px solid gray",
                    [`& .${listItemButtonClasses.root}:hover`]: {
                      background: "#cbe0f7",
                    },
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary={item.title} />
                    {item.subHeader.length > 0 && (
                      <React.Fragment>
                        {groupMenuOpenFlag[item.title] ? (
                          <ExpandMore
                            onClick={() => {
                              handleGroupMenu(item.title, false);
                            }}
                          />
                        ) : (
                          <ExpandLess
                            onClick={() => {
                              handleGroupMenu(item.title, true);
                            }}
                          />
                        )}
                      </React.Fragment>
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={groupMenuOpenFlag[item.title]}
                  timeout="auto"
                  unmountOnExit
                >
                  {item.subHeader.map((i, ind) => {
                    return (
                      <ListItem
                        disablePadding
                        sx={{
                          borderRadius: "5rem",
                          my: "1rem",
                          border:
                            item.subHeader.length - 1 === ind &&
                            "1px solid gray",
                          color: activePage === i.title && "#fff",
                          background: activePage === i.title && "#1e88ff",
                          [`& .${listItemButtonClasses.root}:hover`]: {
                            background: activePage !== i.title && "#cbe0f7",
                          },
                        }}
                        key={ind}
                        onClick={() => {
                          setActivePage(i.title);
                        }}
                      >
                        <ListItemButton>
                          <ListItemText sx={{ pl: "1rem" }} primary={i.title} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </Collapse>
              </React.Fragment>
            )}
            {item.subHeader.length === 0 && (
              <ListItem
                disablePadding
                key={index}
                onClick={() => {
                  setActivePage(item.title);
                }}
                sx={{
                  borderRadius: "5rem",
                  my: "1rem",
                  border: "1px solid gray",
                  color: activePage === item.title && "#fff",
                  background: activePage === item.title && "#1e88ff",
                  [`& .${listItemButtonClasses.root}:hover`]: {
                    background: activePage !== item.title && "#cbe0f7",
                  },
                }}
              >
                <ListItemButton>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
