import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MaterialIcon from 'material-icons-react';
import { Link, Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

import { SnackbarContentWrapper } from './../../utils/SnackbarContentWrapper';
import Loading from './../../utils/Loading';
import { login } from './../../services/firebase';

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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const [variant, setVariant] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toCategory, setToCategory] = React.useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    setLoading(true);
    if (values.email && values.password) {
      login(values.email, values.password)
        .then(user => {
          setVariant('success');
          setMessage('Usuario autorizado');
          setOpen(true);

          setTimeout(() => {
            props.setAuthentication(true)
            sessionStorage.setItem('user', user.user.uid);
            setLoading(false);
            setToCategory(true);
          }, 2000);
        })
        .catch(err => {
          setTimeout(() => {
            setVariant('error');
            setMessage('Credenciales inválidas');
            setOpen(true);
            setValues.password = '';
            setLoading(false);
          }, 2000);
        });
    } else {
      setVariant('error');
      setMessage('Digite todos los campos');
      setOpen(true);
      setValues.password = '';
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Container component='div' className='login-container'>
      <Container
        component='main'
        maxWidth='xs'
        className='login'
        color='primary'
      >
        {loading && <Loading />}
        {toCategory ? <Redirect to='/category' /> : null}
        <form className={classes.root} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className='login-icon'>
              <MaterialIcon icon='account_circle' color='#ffffff' size={80} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component='h1' variant='h5'>
                Log in to Camp4Everyone
              </Typography>
            </Grid>
            <CssTextField
              className={classes.margin}
              required
              fullWidth
              label='Email'
              variant='outlined'
              id='email'
              type='email'
              name='email'
              inputProps={{ style: { color: 'white' } }}
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
              inputProps={{ style: { color: 'white' } }}
              autoComplete='password'
              value={values.password}
              onChange={handleChange('password')}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='secondary'
              style={{ marginTop: '0.8rem' }}
            >
              Log in
            </Button>
          </Grid>
          <Grid item xs={12} spacing={2} style={{ marginTop: '0.8rem' }}>
            <Typography component='p'>
              Already using Camp4Everyone?{' · '}
              <Link to='/passwordRecovery'>Forgot password?</Link>
            </Typography>
            <Typography component='p'>
              New to Camp4Everyone?{' · '}
              <Link to='/signup'>Sign up now »</Link>
            </Typography>
          </Grid>
        </form>
      </Container>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </Container>
  );
}
