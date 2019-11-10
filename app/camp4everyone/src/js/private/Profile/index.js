import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {
  ChangeName,
  ChangeEmail,
  UploadImage,
} from './../../services/firebase';

const CssTextField = withStyles({
  root: {
    '&': {
      marginBottom: '8px',
    },
    '& label.Mui-focused': {
      color: '#3a9679',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3a9679',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#11144',
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

const styles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Profile() {
  let photo = React.createRef();
  let uploadPhoto = React.createRef();
  let tooltip = React.createRef();
  let output = React.createRef();
  const classes = styles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const [pic, setPic] = React.useState(null);
  const [values, setValues] = React.useState({
    email: '',
    name: '',
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [reload, setReload] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleClick = () => {
    photo.current.click();
  };

  const handleSubmit = evt => {
    setLoading(true);
    setSuccess(false);
    evt.preventDefault();
    let email = values.email;
    let name = values.name;
    if (pic || email || name) {
      if (pic) {
        UploadImage(pic);
      }

      if (name) {
        ChangeName(name);
      }

      if (email) {
        ChangeEmail(email);
      }
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
      setReload(true);
      setValues({ email: '', name: '' });
    }
  };

  const handleChangePic = ev => {
    let input = ev.target;
    if (input.files[0]) {
      let reader = new FileReader();

      reader.onload = function() {
        let dataURL = reader.result;
        output.current.src = dataURL;
        setPic(input.files[0]);
      };
      reader.readAsDataURL(input.files[0]);

      if (photo.current.value) {
        tooltip.current.innerHTML = photo.current.value.replace(/^.*\\/, '');
      } else {
        tooltip.current.innerHTML = 'No photo chosen, yet.';
      }
    }
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //FIXME: Circular progress does not work
  //FIXME: Obtain name from firebase
  return (
    <Fragment>
      {reload ? <Redirect to='/profile' /> : null}
      <Grid container className='profile'>
        <Grid item className='head'>
          <Container maxWidth='md' className='head-info'>
            <Avatar className='head-info_avatar'>RM</Avatar>
            <Typography variant='h4' component='h1' className='head-info_name'>
              Ryan Musk
            </Typography>
          </Container>
        </Grid>
        <Grid item className='edit-info'>
          <Container maxWidth='sm' className='info'>
            <form onSubmit={handleSubmit} noValidate>
              <Container className='edit-profile-img'>
                <Typography
                  variant='body2'
                  component='p'
                  style={{ marginRight: '1rem', marginBottom: '1rem' }}
                >
                  Profile photo
                </Typography>
                <img id='output' ref={output}></img>
                <Container className='selector'>
                  <input
                    type='file'
                    id='photo'
                    accept='image/*'
                    hidden
                    ref={photo}
                    onChange={handleChangePic}
                  ></input>

                  <Button
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='large'
                    id='upload-photo'
                    ref={uploadPhoto}
                    onClick={handleClick}
                  >
                    upload photo
                  </Button>
                  <Typography
                    variant='body2'
                    component='p'
                    id='tooltip'
                    ref={tooltip}
                  >
                    No photo chosen, yet.
                  </Typography>
                </Container>
              </Container>
              <CssTextField
                fullWidth
                label='Email'
                variant='outlined'
                id='email'
                type='email'
                name='email'
                inputProps={{ style: { color: '#11144' } }}
                autoComplete='email'
                value={values.email}
                onChange={handleChange('email')}
              />
              <CssTextField
                fullWidth
                label='Name'
                variant='outlined'
                id='name'
                type='text'
                name='email'
                inputProps={{ style: { color: '#11144' } }}
                autoComplete='name'
                value={values.name}
                onChange={handleChange('name')}
              />
              <div className={classes.wrapper}>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  className={buttonClassname}
                  disabled={loading}
                  style={{ marginTop: '0.8rem' }}
                >
                  save changes
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </form>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}
