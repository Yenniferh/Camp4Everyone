import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import { readPlace } from '../../services/firebase'
import { Redirect } from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import {addReservation, getCurrentUserEmail, readUser} from '../../services/firebase';
import Snackbar from '@material-ui/core/Snackbar'
import { SnackbarContentWrapper } from '../../utils/SnackbarContentWrapper'

const drawerWidth = 240;

function GetInfo(nombre) {
    const [place, setPlace] = useState([]);
    useEffect(() => {
        readPlace(nombre).then(res => {
            setPlace(res[0]);
        });
    }, []);
    return place;
}
function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

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
export default function Place(props) {
    const classes = useStyles();

    const [openModal, setOpenModal] = React.useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [loading, setLoading] = React.useState(false)
    const [variant, setVariant] = React.useState('')
    const [message, setMessage] = React.useState('')
    const [openAD, setOpenAD] = React.useState('')
    const [values, setValues] = React.useState({
        date: '',
      });
      const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
      };
    const handleCloseBook = () => {
        setOpenModal(false);
      };
      const showModal = () => {
        setOpenModal(true);
      };
      const handleClose = () =>{
        setOpenAD(false)
      };
    const handleSubmit = evt => {
        evt.preventDefault();
        setLoading(true)

        if (values.date && props.location.state.name) {        
            readUser(getCurrentUserEmail()).then(res=>{
                addReservation(res[0].name,props.location.state.name,props.location.state.price,values.date).then(res2=>{
                    setLoading(false)
                    setVariant('success')
                    setMessage('Reservation created successfully')
                    setOpenAD(true)
                    setOpenModal(false)
                })
            })
        } else {
          values.date = '';
        }
      };
    if (props.location.state) {
        const info = GetInfo(props.location.state.name);

        return (
            <Grid
                container
                direction="column"
                justify="center"
                className="place-Container"
            >
                {info ? (
                    <Paper className="paper-Place">
                        <Grid item container className="first-Container" justify="center">
                            <img src={info.image1} className="imagen1" />
                            <Grid item container direction="row" className="info-Container" justify="center">
                                <Typography component="h3" variant="h3" className="place-Title" > {info.name}</Typography>
                                <Typography component="h5" variant="h5" className="place-Description" >{info.description}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" className="second-Container" justify="center">
                            <img src={info.image2} className="imagen2" />
                            <img src={info.image3} className="imagen3" />
                            <Grid item container direction="row" className="paper2" justify="center">
                                <Container className="place-details">
                                    <Typography component="h5" variant="h5">
                                        {info.address}
                                    </Typography>
                                    <Typography component="h5" variant="h5">
                                        ${info.price} USD per hour
                            </Typography>
                                    <Typography component="h5" variant="h5">
                                        {info.maxCap} people maximum.
                            </Typography>
                                </Container>
                                <Container className="place-action">
                                    <Typography component="h5" variant="h5">Hours:</Typography>
                                    <Typography component="h5" variant="h5">Total: $...</Typography>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        color='secondary'
                                        style={{ width: '250px', marginTop: '0.8rem' }}
                                        onClick={showModal}
                                    >
                                        Confirm
                                    </Button>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={openModal}
                                        onClose={handleCloseBook}
                                        >
                                        <div style={modalStyle} className={classes.paperModal}>
                                        <h2 id="simple-modal-title">Read User</h2>
                                        <form  onSubmit={handleSubmit} noValidate>
                                        <CssTextField
                                            className={classes.margin}
                                            required
                                            fullWidth
                                            label='Date'
                                            variant='outlined'
                                            id='date'
                                            type='text'
                                            name='date'
                                            inputProps={{ style: { color: 'black' } }}
                                            autoComplete=''
                                            value={values.date}
                                            onChange={handleChange('date')}
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
                                        </div>
                                        </Modal>
                                </Container>
                            </Grid>
                        </Grid>
                    </Paper>
                ) : ('Cargando')}
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
            </Grid >
        );

    } else {
        return <Redirect to='/NotFound' />
    }
}