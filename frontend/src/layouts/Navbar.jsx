import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logOut } = useAuth();

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Purchases",
      path: "/purchases",
      roles: ["admin", "logistics_officer"],
    },
    {
      name: "Transfers",
      path: "/transfers",
      roles: ["admin", "logistics_officer"],
    },
    {
      name: "Assignments",
      path: "/assignments",
      roles: ["admin", "base_commander"],
    },
    {
      name: "Expenditures",
      path: "/expenditures",
      roles: ["admin", "base_commander"],
    },
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    if (!item.roles) {
      return true;
    }

    return item.roles.includes(user?.roleName);
  });

  const handleNavigate = (path) => {
    navigate(path);

    setOpen(false);
  };

const handleLogout = () => {
  logOut();
   window.location.replace("/");
  // setOpen(false);
};

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Mobile Menu */}

        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setOpen(true)}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            mr: 1,
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Application Name */}

        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            cursor: "pointer",
            flexGrow: {
              xs: 1,
              md: 0,
            },
          }}
          onClick={() => navigate("/dashboard")}
        >
          Military Assets
        </Typography>

        {/* Desktop Navigation */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            ml: "auto",
          }}
        >
          {visibleMenuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => handleNavigate(item.path)}
            >
              {item.name}
            </Button>
          ))}

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>

      {/* Mobile Navigation */}

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
        >
          <List>
            {visibleMenuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
