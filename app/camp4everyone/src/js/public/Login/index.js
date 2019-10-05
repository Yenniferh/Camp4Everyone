import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import MaterialIcon from 'material-icons-react'
import { Link } from 'react-router-dom'

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

export default function CustomizedInputs() {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Container component='main' maxWidth='xs' className='login' color='primary'>
      <form className={classes.root} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} className='login-icon'>
            <MaterialIcon icon='account_circle' color='#ffffff' size={80} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography component='h1' variant='h5'>
              Inicia sesión en Camp4Everyone
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
            Inicia sesión
          </Button>
        </Grid>
        <Grid item xs={12} spacing={2} style={{ marginTop: '0.8rem' }}>
          <Typography component='p'>
            ¿Ya tienes cuenta?{' · '}
            <Link to='/passwordRecovery'>¿Olvidaste tu contraseña?</Link>
          </Typography>
          <Typography component='p'>
            ¿Nuevo en Camp4Everyone?{' · '}
            <Link to='/signup'>Regístrate ahora »</Link>
          </Typography>
        </Grid>
      </form>
    </Container>
  )
}
