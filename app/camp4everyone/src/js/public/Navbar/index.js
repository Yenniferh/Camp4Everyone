import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import logo from '../../../images/Logo2.png';
import { signout } from '../../services/firebase';
import { Consumer } from '../../../AuthContext';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

// FIXME: hide log in button when logged

// FIXME: hide sign up button when logged

export default function Navbar(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const uid = sessionStorage.getItem('user');
    uid !== null && setIsAuth(true);
  }, [isAuth]);

  const classes = useStyles();
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logoutClick = setAuth => {
    signout();
    sessionStorage.clear();
    setAuth(false);
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = setAuth => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to='/home' className='navbar-link'>
        <MenuItem>Home</MenuItem>
      </Link>

      <Link to='/profile' className='navbar-link'>
        <MenuItem>Profile</MenuItem>
      </Link>

      <Link to='/' className='navbar-link'>
        <MenuItem onClick={e => logoutClick(setAuth)}>Logout</MenuItem>
      </Link>
    </Menu>
  );

  return (
    <Consumer>
      {({ isAuth, setAuth }) => (
        <AppBar position='static' color='secondary'>
          <Toolbar>
            <Link to='/'>
              <div className='logo'>
                <img src={logo} alt='Logo camp4everyone' />
              </div>
            </Link>
            <div className={classes.grow} />
            {isAuth ? (
              <div>
                <MenuItem onClick={handleProfileMenuOpen}>
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='primary-search-account-menu'
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                </MenuItem>
              </div>
            ) : (
              <div>
                <Button type='button' className={classes.button}>
                  <Link to='/login' className='navbar-link'>
                    Log In
                  </Link>
                </Button>
                <Button type='button' className={classes.button}>
                  <Link to='/signup' className='navbar-link'>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </Toolbar>
          {renderMenu(setAuth)}
        </AppBar>
      )}
    </Consumer>
  );
}
