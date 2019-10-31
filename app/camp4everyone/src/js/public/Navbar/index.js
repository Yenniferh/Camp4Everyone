import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MaterialIcon from 'material-icons-react';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import logo from './Logo2.png';

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
  const signout = () => {
    props.setAuthentication(false);
  };

  const classes = useStyles();
  return (
    <AppBar position='static' color='secondary'>
      <Toolbar>
        <Link to='/'>
          <div className='logo'>
            <img src={logo} alt='Logo camp4everyone' />
          </div>
        </Link>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <MaterialIcon icon='search' />
          </div>
          <InputBase
            placeholder='Search…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
        <div className={classes.grow} />
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
      </Toolbar>
    </AppBar>
  );
}
