/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLoginContext } from "../../Context/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isAuthorized, handleSignOut, user } = useLoginContext();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography data-testid="title" variant="h6" sx={{ my: 2 }}>
        Agents on Cloud Store
      </Typography>
      <Divider />

      {isAuthorized && (
        <List>
          <ListItemText primary={`Hello, ${user.username?.toUpperCase()}`} />

          <Button
            sx={{ color: "black" }}
            component={Link}
            to="/"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Home
          </Button>
          <ListItemText primary={" "} />
          <Button
            sx={{ color: "black" }}
            component={Link}
            to="/listItem"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Add Item
          </Button>

          <ListItemText primary={" "} />

          <Button
            sx={{ color: "black" }}
            onClick={() => handleSignOut()}
            component={Link}
            to="/cart"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Go to Cart
          </Button>
          <ListItemText primary={" "} />
          <Button
            sx={{ color: "black" }}
            onClick={() => handleSignOut()}
            component={Link}
            to="/favorite"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Go to favorite
          </Button>
          <ListItemText primary={" "} />

          <Button
            sx={{ color: "black" }}
            onClick={() => handleSignOut()}
            component={Link}
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Sign Out
          </Button>
        </List>
      )}
      {!isAuthorized && (
        <List>
          <ListItemText primary={`Hello, User`} />

          <Button
            sx={{ color: "black" }}
            component={Link}
            to="/"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Home
          </Button>
          <ListItemText primary={" "} />
          <Button
            sx={{ color: "black" }}
            component={Link}
            to="/signin"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Sign In
          </Button>
          <ListItemText primary={" "} />
          <Button
            sx={{ color: "black" }}
            component={Link}
            to="/signup"
            style={{ fontSize: "1rem" }}
            className="navLink"
          >
            Sign Up
          </Button>
        </List>
      )}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              textAlign: "start",
            }}
          >
            Agents on Cloud Store
          </Typography>
          {isAuthorized && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <a
                sx={{ color: "#fff" }}
                style={{
                  display: "inline-block",
                  fontSize: "1.1rem",
                  margin: "1% 10px",
                  marginRight: "10%px",
                }}
              >
                {`Hello, ${user.username?.toUpperCase()}`}
              </a>
              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Home
              </Button>

              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/listItem"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Sell Item
              </Button>

              <IconButton
                color="inherit"
                aria-label="Go to Favorite"
                component={Link}
                to="/favorite"
              >
                <FavoriteIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="Go to Cart"
                component={Link}
                to="/cart"
              >
                <ShoppingCartIcon />
              </IconButton>

              <IconButton
                color="inherit"
                aria-label="Go to Cart"
                onClick={handleSignOut}
              >
                <ExitToAppIcon />
              </IconButton>
            </Box>
          )}
          {!isAuthorized && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Home
              </Button>

              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/signin"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Sign In
              </Button>
              <Button
                sx={{ color: "#fff" }}
                component={Link}
                to="/signup"
                style={{ fontSize: "1rem" }}
                className="navLink"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
