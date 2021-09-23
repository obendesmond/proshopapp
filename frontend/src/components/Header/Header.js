import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Link } from "@material-ui/core";
import { logout } from "../../actions/userActions";
import SearchBox from "../SearchBox/SearchBox";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: "pointer",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isAdminMenuOpen = Boolean(adminAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuOpen = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleAdminMenuClose = () => {
    setAdminAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    handleMenuClose();
    history.push("/profile");
  };

  const handleAdminRoute = (to) => {
    handleAdminMenuClose();
    // 1 for users, 2 for products and 3 for orders
    if (to === 1) {
      history.push("/admin/users");
    } else if (to === 2) {
      history.push("/admin/products");
    } else if (to === 3) {
      history.push("/admin/orders");
    }
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => handleProfile()}
      >
        <MenuItem>Profile</MenuItem>
      </Link>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </Menu>
  );

  const adminMenuId = "admin-menu-id";
  const renderAdminMenu = (
    <Menu
      anchorEl={adminAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={adminMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isAdminMenuOpen}
      onClose={handleAdminMenuClose}
    >
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => handleAdminRoute(1)}
      >
        <MenuItem>Users</MenuItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => handleAdminRoute(2)}
      >
        <MenuItem>Products</MenuItem>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => handleAdminRoute(3)}
      >
        <MenuItem>Orders</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push("/features")}>
        <Button variant="outlined" size="small" color="primary">
          App Features
        </Button>
      </MenuItem>
      <MenuItem onClick={() => history.push("/cart")}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {userInfo ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          {/* <Button size="small">{userInfo.name}</Button> */}
          <p>{userInfo.name}</p>
        </MenuItem>
      ) : (
        <MenuItem
          // onClick={handleProfileMenuOpen}
          onClick={() => history.push("/login")}
        >
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </MenuItem>
      )}
      {userInfo && userInfo.isAdmin && (
        <MenuItem onClick={handleAdminMenuOpen}>
          <p>ADMIN</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent" style={{ zIndex: 20 }}>
        <Toolbar>
          <Typography
            onClick={() => history.push("/")}
            className={classes.title}
            variant="h4"
            noWrap
          >
            ProShop
          </Typography>
          <SearchBox />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => history.push("/features")}
            >
              App Features
            </Button>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => history.push("/cart")}
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>{" "}
            &nbsp;&nbsp;&nbsp;
            {userInfo ? (
              <Button size="small" onClick={handleProfileMenuOpen}>
                {userInfo.name}
              </Button>
            ) : (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => history.push("/login")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
            &nbsp;&nbsp;&nbsp;
            {userInfo && userInfo.isAdmin && (
              <Button size="small" onClick={handleAdminMenuOpen}>
                ADMIN
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderAdminMenu}
    </div>
  );
};

export default Header;
