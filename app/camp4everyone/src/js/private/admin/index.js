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



import { getdb, signup, addUser, addPlace, addReservation, deletePlace, deleteUser, deleteReservation }  from '../../services/firebase'

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
  const [openAD, setOpenAD] = React.useState(false);
  const [openUserCreate, setOpenUserCreate] = React.useState(false);
  const [openPlaceCreate, setOpenPlaceCreate] = React.useState(false);
  const [openPlaceDelete, setOpenPlaceDelete] = React.useState(false);
  const [openUserDelete, setOpenUserDelete] = React.useState(false);
  const [openReservationCreate, setOpenReservationCreate] = React.useState(false);
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
  const handleCloseUserCreate = () => {
    setOpenUserCreate(false);
  };
  const handleOpenPlaceCreate = () => {
    setOpenPlaceCreate(true);
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
  const handleClosePlaceDelete = () => {
    setOpenPlaceDelete(false);
  };
  const handleCloseUserDelete = () => {
    setOpenUserDelete(false);
  };
  const handleOpenReservationCreate = () => {
    setOpenReservationCreate(true);
  };
  const handleOpenReservationDelete = () => {
    setOpenReservationDelete(true);
  };
  const handleCloseReservationCreate = () => {
    setOpenReservationCreate(false);
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
            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart reservations={reservations}/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
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
                <button>READ</button>
                <button>UPDATE</button>
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
                <button>READ</button>
                <button>UPDATE</button>
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
                <button>READ</button>
                <button>UPDATE</button>
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
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {reservations.length}
                <Orders reservations={reservations}/>
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