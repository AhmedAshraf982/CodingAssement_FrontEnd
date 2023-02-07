import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DetailsIcon from "@mui/icons-material/Details";
import TimelineIcon from "@mui/icons-material/Timeline";
import CalculateIcon from "@mui/icons-material/Calculate";
import DifferenceIcon from "@mui/icons-material/Difference";

import { Link, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../images/logo.png";
import image from "../images/cool-background.png";
import Calculate from "./Calculate";
import Details from "./Details";
import Difference from "./Difference";
import Graph from "./Graph";
import { UserContext } from "../Auth/UserContext";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Home() {
  const location = useLocation();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logo, setLogo] = useState("");
  const navigate = useNavigate();

  const { logout, currentUser } = useContext(UserContext);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    logout();
    navigate("/", { replace: true });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: "#140E00", color: "white" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Link
              to={`/dashboard`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  src={Logo}
                  alt="logo"
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0px 10px",
                  }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  style={{ color: "white" }}
                >
                  My<strong>Calculator</strong>
                </Typography>
              </div>
            </Link>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              sx={{
                flexGrow: 0,
                marginLeft: {
                  xs: `calc(86% - ${drawerWidth}px)`,
                  sm: `calc(90% - ${drawerWidth}px)`,
                  md: `calc(93% - ${drawerWidth}px)`,
                  lg: `calc(95% - ${drawerWidth}px)`,
                },
              }}
            >
              <Tooltip>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={logo}
                    sx={{ bgcolor: "lightgray" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Typography textAlign="center">
                    {currentUser.user.userName}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: { backgroundColor: "white", color: "black" },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <Tooltip title={open ? "" : "Calculate"} placement="right">
              <Link
                to="/dashboard/calculate"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  selected={location.pathname === "/dashboard/calculate"}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <CalculateIcon sx={{ color: "#362FD9" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Calculate"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
            <Tooltip title={open ? "" : "Details"} placement="right">
              <Link
                to="/dashboard/details"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem selected={location.pathname === "/dashboard/details"}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <DetailsIcon sx={{ color: "#362FD9" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Details"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
            <Tooltip title={open ? "" : "Yearly Graph"} placement="right">
              <Link
                to="/dashboard/yearly/graph"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  selected={location.pathname === "/dashboard/yearly/graph"}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <TimelineIcon sx={{ color: "#362FD9" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Yearly Graph"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
            <Tooltip title={open ? "" : "Difference"} placement="right">
              <Link
                to="/dashboard/difference"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  selected={location.pathname === "/dashboard/difference"}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <DifferenceIcon sx={{ color: "#362FD9" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Difference"
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Tooltip>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }} width="80%" height="80%">
          <DrawerHeader />
          {location.pathname === "/dashboard/calculate" ? (
            <Calculate />
          ) : location.pathname === "/dashboard/details" ? (
            <Details />
          ) : location.pathname === "/dashboard/difference" ? (
            <Difference />
          ) : location.pathname === "/dashboard/yearly/graph" ? (
            <Graph />
          ) : (
            <Container>
              <Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{
                      p: 34.5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 240,
                    }}
                    style={{ backgroundImage: `url(${image})` }}
                    elevation={2}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Welcome To Unit Rate Calculator
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          )}
        </Box>
      </Box>
    </>
  );
}
