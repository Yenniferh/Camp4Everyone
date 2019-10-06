import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#3a9679'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#3a9679'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: '#3a9679'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#3a9679'
      }
    }
  }
})(TextField)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing(1)
  }
}))

export default function Signup() {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Container component='div' className='login-container'>
      <Container
        component='main'
        maxWidth='xs'
        className='login'
        color='primary'
      >
        <form className={classes.root} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography component='h1' variant='h5'>
                Create your account in Camp4Everyone
              </Typography>
            </Grid>
            <CssTextField
              className={classes.margin}
              required
              fullWidth
              label='Name'
              variant='outlined'
              id='name'
              type='name'
              name='name'
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
              Sign up
            </Button>
          </Grid>
        </form>
      </Container>
    </Container>
  )
}
