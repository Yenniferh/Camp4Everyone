import React, { useState, Fragment, createRef, useEffect } from 'react';
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
  getCurrentUserEmail,
  readUser,
} from './../../services/firebase';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

function UserInfo(){
  const [user, setUser] = useState([]);
  useEffect(() => {
    readUser('dacuentas@uninorte.edu.co').then(res=>{
      setUser(res[0])
    })
    
},[]);

return user
}

export default function Profile() {
  const user = UserInfo()
  let photoRef = createRef();
  let uploadPhotoRef = createRef();
  let tooltipRef = createRef();
  let outputRef = createRef();
  let editFormRef = createRef();
  let reviewsRef = createRef();
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();
  const [pic, setPic] = useState(null);
  const [values, setValues] = useState({
    email: '',
    name: '',
  });
const [data, setData] = useState(null);


  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleClick = () => {
    photoRef.current.click();
  };

  const handleSubmit = evt => {
    if (edit) {
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
          setValues({ email: '', name: '' });
          setTimeout(() => {
            setSuccess(false);
            setReload(true);
          }, 1500);
        }, 2000);
      }
    }
  };

  const handleClickOpenEdit = () => {
    setEdit(true);
    reviewsRef.current.hidden = true;
    editFormRef.current.hidden = false;
  };

  const handleChangePic = ev => {
    let input = ev.target;
    if (input.files[0]) {
      let reader = new FileReader();

      reader.onload = function() {
        let dataURL = reader.result;
        outputRef.current.src = dataURL;
        setPic(input.files[0]);
      };
      reader.readAsDataURL(input.files[0]);

      if (photoRef.current.value) {
        tooltipRef.current.innerHTML = photoRef.current.value.replace(
          /^.*\\/,
          '',
        );
      } else {
        tooltipRef.current.innerHTML = 'No photo chosen, yet.';
      }
    }
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //FIXME: Obtain name from firebase
  return (
    <Fragment>
      {reload ? <Redirect to='/profile' /> : null}
      <Grid container className='profile'>
        <Grid item className='head'>
          <Container maxWidth='md' className='head-info'>
            <Avatar className='head-info_avatar'>RM</Avatar>
            <Typography variant='h4' component='h1' className='head-info_name'>
              {user.name}
            </Typography>
            <Button
              type='button'
              variant='outlined'
              color='secondary'
              size='medium'
              aria-label='edit'
              startIcon={<EditIcon />}
              onClick={handleClickOpenEdit}
            >
              edit profile
            </Button>
          </Container>
        </Grid>
        <Grid item className='edit-info' ref={editFormRef} hidden>
          <Container maxWidth='sm' className='info'>
            <form onSubmit={handleSubmit} noValidate>
              <Container className='edit-profile-img'>
                <Typography
                  variant='body2'
                  component='p'
                  style={{ marginRight: '1rem', marginBottom: '1rem' }}
                >
                  Profile picture
                </Typography>
                <img id='output' ref={outputRef}></img>
                <Container className='selector'>
                  <input
                    type='file'
                    id='photo'
                    accept='image/*'
                    hidden
                    ref={photoRef}
                    onChange={handleChangePic}
                  ></input>

                  <Button
                    type='button'
                    variant='contained'
                    color='secondary'
                    size='small'
                    id='upload-photo'
                    ref={uploadPhotoRef}
                    onClick={handleClick}
                    startIcon={<CloudUploadIcon />}
                  >
                    upload pic
                  </Button>
                  <Typography
                    variant='body2'
                    component='p'
                    id='tooltip'
                    ref={tooltipRef}
                  >
                    No picture chosen, yet.
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
                  size='large'
                  className={buttonClassname}
                  disabled={loading}
                  style={{ marginTop: '0.8rem' }}
                  startIcon={<SaveIcon />}
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
        <Grid item className='review-list' ref={reviewsRef}>
          <Typography>Hola soy post</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}
