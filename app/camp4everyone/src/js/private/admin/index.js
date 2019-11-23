import React, { useState , useEffect} from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar'
import { SnackbarContentWrapper } from './../../utils/SnackbarContentWrapper'
import Loading from './../../utils/Loading'



import { getdb, signup, addUser, readUser, updateUser, addPlace, readPlace, updatePlace, addReservation, readReservation, updateReservation, deletePlace, deleteUser, deleteReservation }  from '../../services/firebase'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3a9679',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3a9679',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#3a9679',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3a9679',
      },
    },
  },
})(TextField);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function GetReservations(){
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const db = getdb()
    db.collection("reservations").onSnapshot((snapshot) => {
      const newReservations = snapshot.docs.map((doc)=>({
        id: doc.id,
        user: doc.user,
        place: doc.place,
        billing: doc.billing,
        date:doc.date,
        ...doc.data()
      }))
      setReservations(newReservations)
    })
},[]);



return reservations
}
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  paperModal: {
    top:'50%',
    left:'50%',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fixedHeight: {
    height: 240,
  },
  fixedHeight2: {
    height: 140,
  },
}));

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export default function Dashboard() { 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tempUser, setTempUser] = React.useState(null);
  const [tempUserUpdate, setTempUserUpdate] = React.useState(null);
  const [tempPlace, setTempPlace] = React.useState(null);
  const [tempReservation, setTempReservation] = React.useState(null);
  const [openAD, setOpenAD] = React.useState(false);
  const [openUserCreate, setOpenUserCreate] = React.useState(false);
  const [openUserRead, setOpenUserRead] = React.useState(false);
  const [openUserUpdate, setOpenUserUpdate] = React.useState(false);
  const [openPlaceCreate, setOpenPlaceCreate] = React.useState(false);
  const [openPlaceRead, setOpenPlaceRead] = React.useState(false);
  const [openPlaceUpdate, setOpenPlaceUpdate] = React.useState(false);
  const [openPlaceDelete, setOpenPlaceDelete] = React.useState(false);
  const [openUserDelete, setOpenUserDelete] = React.useState(false);
  const [openReservationCreate, setOpenReservationCreate] = React.useState(false);
  const [openReservationRead, setOpenReservationRead] = React.useState(false);
  const [openReservationUpdate, setOpenReservationUpdate] = React.useState(false);
  const [openReservationDelete, setOpenReservationDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [variant, setVariant] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [billing, setBilling] = React.useState(0);
  const [modalStyle] = React.useState(getModalStyle);
  const reservations = GetReservations()
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenUserCreate = () => {
    setOpenUserCreate(true);
  };
  const handleOpenUserRead = () => {
    setOpenUserRead(true);
  };
  const handleOpenUserUpdate = () => {
    setOpenUserUpdate(true);
  };
  const handleCloseUserCreate = () => {
    setOpenUserCreate(false);
  };
  const handleCloseUserRead = () => {
    setOpenUserRead(false);
    setTempUser(null);
  };
  const handleCloseUserUpdate = () => {
    setOpenUserUpdate(false);
    setTempUserUpdate(null);
  };
  const handleOpenPlaceCreate = () => {
    setOpenPlaceCreate(true);
  };
  const handleOpenPlaceRead = () => {
    setOpenPlaceRead(true);
  };
  const handleOpenPlaceUpdate = () => {
    setOpenPlaceUpdate(true);
  };
  const handleOpenPlaceDelete = () => {
    setOpenPlaceDelete(true);
  };
  const handleOpenUserDelete = () => {
    setOpenUserDelete(true);
  };
  const handleClose = () => {
    setOpenAD(false)
  }
  const handleClosePlaceCreate = () => {
    setOpenPlaceCreate(false);
  };
  const handleClosePlaceRead = () => {
    setOpenPlaceRead(false);
    setTempPlace(null);
  };
  const handleClosePlaceUpdate = () => {
    setOpenPlaceUpdate(false);
  };
  
  const handleClosePlaceDelete = () => {
    setOpenPlaceDelete(false);
  };
  const handleCloseUserDelete = () => {
    setOpenUserDelete(false);
  };
  const handleOpenReservationCreate = () => {
    setOpenReservationCreate(true);
  };
  const handleOpenReservationRead = () => {
    setOpenReservationRead(true);
  };
  const handleOpenReservationUpdate = () => {
    setOpenReservationUpdate(true);
  };
  const handleOpenReservationDelete = () => {
    setOpenReservationDelete(true);
  };
  const handleCloseReservationCreate = () => {
    setOpenReservationCreate(false);
  };
  const handleCloseReservationRead = () => {
    setOpenReservationRead(false);
  };
  const handleCloseReservationUpdate = () => {
    setOpenReservationUpdate(false);
  };
  const handleCloseReservationDelete = () => {
    setOpenReservationDelete(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  useEffect(() => {
    var currentBilling = 0
    reservations.forEach(function (item, index) {
      currentBilling = currentBilling + item.billing
    });
    setBilling(currentBilling);
  },[reservations]);
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'',
  });
  const [placeValues, setPlacesValues] = React.useState({
    name: '',
    price:'',
  });
  const [reservationValues, setReservationValues] = React.useState({
    user: '',
    place: '',
    price:'',
    date:'',
    id:'',
    code:'',
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePlaceChange = prop => event => {
    setPlacesValues({ ...placeValues, [prop]: event.target.value });
  };
  const handleReservationChange = prop => event => {
    setReservationValues({ ...reservationValues, [prop]: event.target.value });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setLoading(true)
    if (
      values.name &&
      values.email &&
      values.password &&
      values.confirmPassword
    ) {
      if (values.password === values.confirmPassword) {
        signup(values.email, values.password)
          .then(user => {
            setTimeout(() => {
              addUser(values.name, values.email)
              setVariant('success')
              setMessage('Reservation created successfully')
              setLoading(false)
              setOpenAD(true)
            }, 2000)
          })
          .catch(err => {
            setTimeout(() => {
              values.password = '';
              values.confirmPassword = '';
            }, 2000);
          });
      } else {
        values.password = '';
        values.confirmPassword = '';
      }
    } else {
      values.password = '';
      values.confirmPassword = '';
    }
  };
  const handleDeletePlaceSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( placeValues.name ) {
      deletePlace(placeValues.name)
      .then(res=>{
        setTimeout(() => {
          setVariant('success')
          setMessage('Place deleted successfully')
          setOpenPlaceDelete(false);
          setLoading(false)
          setOpenAD(true)
        }, 2000)
      }).catch(err=>{
        setTimeout(() => {
          setVariant('error')
          setMessage('Ups! Something went wrong')
          setOpenPlaceDelete(false);
          setLoading(false)
          setOpenAD(true)
          placeValues.name = '';
          placeValues.price = '';
        }, 2000);
      });
    }
  };
  const handlePlaceSubmit = evt =>{
    evt.preventDefault();
    setOpenPlaceCreate(false);
    setLoading(true)
    if ( placeValues.name && placeValues.price) {
      addPlace(placeValues.name,placeValues.price)
        .then(place => {
          setTimeout(() => {
            setVariant('success')
            setMessage('Place '+ placeValues.name+' created successfully')
            setLoading(false)
            setOpenAD(true)
          }, 2000)
        })
        .catch(err => {
          setTimeout(() => {
            console.log('Nok place');
            placeValues.name = '';
            placeValues.price = '';
          }, 2000);
        });

    }
  };
  const handleUpdatePlaceSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( placeValues.name) {
      updatePlace(placeValues.name, placeValues.price)
          setTimeout(() => {
            setVariant('success')
            setMessage('Place Updated successfully')
            setOpenPlaceUpdate(false);
            setLoading(false)
            setOpenAD(true)
          }, 2000)
    }
  };
  
  const handleReadPlaceSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( placeValues.name) {
      readPlace(placeValues.name)
        .then(place => {
          setTimeout(() => {
            setVariant('success')
            setMessage('Place '+ placeValues.name+' read successfully')
            setLoading(false)
            setOpenAD(true)
            setTempPlace(place[0]);
          }, 2000)
        })
        .catch(err => {
          setTimeout(() => {
            console.log('Nok place');
            placeValues.name = '';
            placeValues.price = '';
          }, 2000);
        });

    }
  };
  const handleReservationSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( reservationValues.user && reservationValues.place && reservationValues.date && reservationValues.price) {
      addReservation(reservationValues.user,reservationValues.place,reservationValues.price,reservationValues.date)
        .then(place => {
          setTimeout(() => {
            setVariant('success')
            setMessage('Reservation created successfully')
            setOpenReservationCreate(false);
            setLoading(false)
            setOpenAD(true)
          }, 2000)
        })
        .catch(err => {
          setTimeout(() => {
            console.log('Nok reservation');
            placeValues.name = '';
            placeValues.price = '';
          }, 2000);
        });

    }
  };
  const handleReadReservationSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( reservationValues.code) {
      readReservation(reservationValues.code)
        .then(res => {
          setTimeout(() => {
            setVariant('success')
            setMessage('Reservation READ successfully')
            setTempReservation(res[0]);
            setLoading(false)
            setOpenAD(true)
          }, 2000)
        })
        .catch(err => {
          setTimeout(() => {
            console.log('Nok reservation');
            placeValues.name = '';
            placeValues.price = '';
          }, 2000);
        });
    }
  };
  const handleUpdateReservationSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if (reservationValues.code) {
      updateReservation(reservationValues.code,reservationValues.date,reservationValues.price)
          setTimeout(() => {
            setVariant('success')
            setMessage('Reservation Update successfully')
            setLoading(false)
            setOpenReservationUpdate(false);
            setOpenAD(true)
          }, 2000)
    }
  };
  const handleDeleteUserSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( values.email ) {
      deleteUser(values.email)
      .then(res=>{
        setTimeout(() => {
          setVariant('success')
          setMessage('Userdeleted successfully')
          setOpenUserDelete(false);
          setLoading(false)
          setOpenAD(true)
        }, 2000)
      }).catch(err=>{
        setTimeout(() => {
          setVariant('error')
          setMessage('Ups! Something went wrong')
          setOpenUserDelete(false);
          setLoading(false)
          setOpenAD(true)
          values.email = '';
        }, 2000);
      });
    }
  };
  const handleReadUserSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( values.email ) {
      readUser(values.email)
      .then(res=>{
        if(res.length<1){
          setTimeout(() => {
            setVariant('error')
            setMessage('USER NO FOUND')
            setOpenUserRead(false);
            setLoading(false)
            setOpenAD(true)
            values.email = '';
          }, 2000);
        }else{
          setTimeout(() => {
            console.log(res)
            setVariant('success')
            setMessage('User READED successfully')
            setLoading(false)
            setOpenAD(true)
            setTempUser(res[0]);
          }, 2000)
        }
      }).catch(err=>{
        setTimeout(() => {
          setVariant('error')
          setMessage('Ups! Something went wrong')
          setOpenUserRead(false);
          setLoading(false)
          setOpenAD(true)
          values.email = '';
        }, 2000);
      });
    }
  };
  const handleUpdateUserSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( values.email ) {
      updateUser(values.email,values.name,values.role)
      setTimeout(() => {
        setVariant('success')
        setMessage('User Updated successfully')
        setLoading(false)
        setOpenUserUpdate(false)
        setOpenAD(true)
      }, 2000)
    }else{
      setLoading(false)
      setVariant('error')
      setMessage('Email Is Required')
      setOpenAD(true)
    }
  };
  const handleDeleteReservationSubmit = evt =>{
    evt.preventDefault();
    setLoading(true)
    if ( reservationValues.id ) {
      deleteReservation(reservationValues.id)
      .then(res=>{
        setTimeout(() => {
          setVariant('success')
          setMessage('Reservation deleted successfully')
          setOpenReservationDelete(false);
          setLoading(false)
          setOpenAD(true)
        }, 2000)
      }).catch(err=>{
        setTimeout(() => {
          setVariant('error')
          setMessage('Ups! Something went wrong')
          setOpenReservationDelete(false);
          setLoading(false)
          setOpenAD(true)
          reservationValues.id = '';
        }, 2000);
      });
    }
  };
  return (
    <div className={classes.root}>
      {loading && <Loading />}
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper2}>
                <center>User Panel</center>
                <Divider />
                <button  onClick={handleOpenUserCreate}>CREATE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openUserCreate}
                  onClose={handleCloseUserCreate}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Create User</h2>
                    <form  onSubmit={handleSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Name'
                        variant='outlined'
                        id='name'
                        type='name'
                        name='name'
                        inputProps={{ style: { color: 'black' } }}
                        autoComplete='name'
                        value={values.name}
                        onChange={handleChange('name')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Email'
                        variant='outlined'
                        id='email'
                        type='email'
                        name='email'
                        inputProps={{ style: { color: 'black' } }}
                        autoComplete='email'
                        value={values.email}
                        onChange={handleChange('email')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Password'
                        variant='outlined'
                        id='password'
                        type='password'
                        name='password'
                        inputProps={{ style: { color: 'black' } }}
                        autoComplete='password'
                        value={values.password}
                        onChange={handleChange('password')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Confirm password'
                        variant='outlined'
                        id='confirmPassword'
                        type='password'
                        name='confirmPassword'
                        inputProps={{ style: { color: 'black' } }}
                        autoComplete='confirmPassword'
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        CREATE
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>
                <button onClick={handleOpenUserRead}>READ</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openUserRead}
                  onClose={handleCloseUserRead}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                  <h2 id="simple-modal-title">Read User</h2>
                  {
                    tempUser ?
                    <div>
                      <h4>Name: {tempUser.name}</h4>
                      <h4>Email: {tempUser.email}</h4>
                      <h4>Role: {tempUser.role}</h4>
                      <h4>Password: {tempUser.password}</h4>
                    </div>
                  :
                  <form  onSubmit={handleReadUserSubmit} noValidate>
                  <CssTextField
                      className={classes.margin}
                      required
                      fullWidth
                      label='Email'
                      variant='outlined'
                      id='email'
                      type='email'
                      name='email'
                      inputProps={{ style: { color: 'black' } }}
                      autoComplete='email'
                      value={values.email}
                      onChange={handleChange('email')}
                    />
                    <Grid item xs={12}>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        style={{ marginTop: '0.8rem' }}
                      >
                      READ
                      </Button>
                      </Grid>
                    </form>
                  }                  
                </div>
                </Modal>
                <button onClick={handleOpenUserUpdate}>UPDATE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openUserUpdate}
                  onClose={handleCloseUserUpdate}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                  <h2 id="simple-modal-title">Update User</h2>
                  <form  onSubmit={handleUpdateUserSubmit} noValidate>
                  <CssTextField
                      className={classes.margin}
                      required
                      fullWidth
                      label='Email'
                      variant='outlined'
                      id='email'
                      type='email'
                      name='email'
                      inputProps={{ style: { color: 'black' } }}
                      autoComplete='email'
                      value={values.email}
                      onChange={handleChange('email')}
                    />
                    <CssTextField
                      className={classes.margin}
                      required
                      fullWidth
                      label='Name'
                      variant='outlined'
                      id='name'
                      type='text'
                      name='name'
                      inputProps={{ style: { color: 'black' } }}
                      autoComplete='name'
                      value={values.name}
                      onChange={handleChange('name')}
                    />
                    <CssTextField
                      className={classes.margin}
                      required
                      fullWidth
                      label='Role'
                      variant='outlined'
                      id='role'
                      type='text'
                      name='role'
                      inputProps={{ style: { color: 'black' } }}
                      autoComplete='role'
                      value={values.role}
                      onChange={handleChange('role')}
                    />
                    <Grid item xs={12}>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='secondary'
                        style={{ marginTop: '0.8rem' }}
                      >
                      Update
                      </Button>
                      </Grid>
                    </form>
                </div>
                </Modal>
                <button  onClick={handleOpenUserDelete}>DELETE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openUserDelete}
                  onClose={handleCloseUserDelete}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Delete User</h2>
                    <form  onSubmit={handleDeleteUserSubmit} noValidate>
                    <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Email'
                        variant='outlined'
                        id='email'
                        type='email'
                        name='email'
                        inputProps={{ style: { color: 'black' } }}
                        autoComplete='email'
                        value={values.email}
                        onChange={handleChange('email')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        DELETE
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal> 
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper2}>
                <center>Place Panel</center>
                <Divider />
                <button onClick={handleOpenPlaceCreate}>CREATE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openPlaceCreate}
                  onClose={handleClosePlaceCreate}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Create Place</h2>
                    <form  onSubmit={handlePlaceSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place Name'
                        variant='outlined'
                        id='place_name'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={placeValues.name}
                        onChange={handlePlaceChange('name')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place Price'
                        variant='outlined'
                        id='place_price'
                        type='number'
                        inputProps={{ style: { color: 'black' } }}
                        value={placeValues.price}
                        onChange={handlePlaceChange('price')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        CREATE
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>
                <button onClick={handleOpenPlaceRead}>READ</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openPlaceRead}
                  onClose={handleClosePlaceRead}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Read Place</h2>
                    {
                      tempPlace ?
                        <div>
                          <h4>Name: {tempPlace.name} </h4>
                          <h4>Price: {tempPlace.price}</h4>
                        </div>
                      :
                      <form  onSubmit={handleReadPlaceSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place Name'
                        variant='outlined'
                        id='place_name'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={placeValues.name}
                        onChange={handlePlaceChange('name')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        READ
                        </Button>
                        </Grid>
                      </form>
                    }                    
                  </div>
                </Modal>
                <button onClick={handleOpenPlaceUpdate}>UPDATE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openPlaceUpdate}
                  onClose={handleClosePlaceUpdate}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Update Place</h2>                    
                      <form  onSubmit={handleUpdatePlaceSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place Name'
                        variant='outlined'
                        id='place_name'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={placeValues.name}
                        onChange={handlePlaceChange('name')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place Price'
                        variant='outlined'
                        id='place_price'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={placeValues.price}
                        onChange={handlePlaceChange('price')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        Update
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>                
                <button onClick={handleOpenPlaceDelete}>DELETE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openPlaceDelete}
                  onClose={handleClosePlaceDelete}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Delete Place</h2>
                    <form  onSubmit={handleDeletePlaceSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place Name'
                        variant='outlined'
                        id='place_name'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={placeValues.name}
                        onChange={handlePlaceChange('name')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        DELETE
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>                
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper2}>
                <center>Reservations Panel</center>
                <Divider />
                <button onClick={handleOpenReservationCreate}>CREATE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openReservationCreate}
                  onClose={handleCloseReservationCreate}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Create Reservation</h2>
                    <form  onSubmit={handleReservationSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='User'
                        variant='outlined'
                        id='user'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.user}
                        onChange={handleReservationChange('user')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Place'
                        variant='outlined'
                        id='place'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.place}
                        onChange={handleReservationChange('place')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Date'
                        variant='outlined'
                        id='date'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.date}
                        onChange={handleReservationChange('date')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Price'
                        variant='outlined'
                        id='price'
                        type='number'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.price}
                        onChange={handleReservationChange('price')}
                      />
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        CREATE
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>
                <button onClick={handleOpenReservationRead}>READ</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openReservationRead}
                  onClose={handleCloseReservationRead}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Read Reservation</h2>
                    {
                      tempReservation ?
                        <div>
                          <h4>User: {tempReservation.user} </h4>
                          <h4>Place: {tempReservation.place}</h4>
                          <h4>Date: {tempReservation.date}</h4>
                          <h4>Billing: {tempReservation.billing}</h4>
                          <h4>Code: {tempReservation.code}</h4>
                        </div>
                      :
                      <form  onSubmit={handleReadReservationSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Code'
                        variant='outlined'
                        id='code'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.code}
                        onChange={handleReservationChange('code')}
                      />
                    
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        READ
                        </Button>
                        </Grid>
                      </form>
                    }
                  </div>
                </Modal>
                <button onClick={handleOpenReservationUpdate}>UPDATE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openReservationUpdate}
                  onClose={handleCloseReservationUpdate}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Update Reservation</h2>
                      <form  onSubmit={handleUpdateReservationSubmit} noValidate>
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Code'
                        variant='outlined'
                        id='code'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.code}
                        onChange={handleReservationChange('code')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Date'
                        variant='outlined'
                        id='date'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.date}
                        onChange={handleReservationChange('date')}
                      />
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Price'
                        variant='outlined'
                        id='price'
                        type='number'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.price}
                        onChange={handleReservationChange('price')}
                      />
                    
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        Update
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>
                <button onClick={handleOpenReservationDelete}>DELETE</button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={openReservationDelete}
                  onClose={handleCloseReservationDelete}
                >
                  <div style={modalStyle} className={classes.paperModal}>
                    <h2 id="simple-modal-title">Delete Reservation</h2>
                    <form  onSubmit={handleDeleteReservationSubmit} noValidate>                      
                      <CssTextField
                        className={classes.margin}
                        required
                        fullWidth
                        label='Id'
                        variant='outlined'
                        id='Id'
                        type='text'
                        inputProps={{ style: { color: 'black' } }}
                        value={reservationValues.id}
                        onChange={handleReservationChange('id')}
                      />
                    
                      <Grid item xs={12}>
                        <Button
                          type='submit'
                          fullWidth
                          variant='contained'
                          color='secondary'
                          style={{ marginTop: '0.8rem' }}
                        >
                        Delete
                        </Button>
                        </Grid>
                      </form>
                  </div>
                </Modal>              
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Copyright />
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={openAD}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </div>
  );
}