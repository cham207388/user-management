import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // ✅ Detect mobile screen size

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/users">
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/add-user">
            <ListItemText primary="Add User" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: "none", color: "inherit" }}>
                User Management
              </Typography>
              <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ flexGrow: 1 }} component={Link} to="/" style={{ textDecoration: "none", color: "inherit" }}>
                User Management
              </Typography>
              <Box>
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>
                <Button color="inherit" component={Link} to="/add-user">
                  Add User
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default App;