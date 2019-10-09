import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import CardActions from '@material-ui/core/CardActions'
import Snackbar from '@material-ui/core/Snackbar'

import { SnackbarContentWrapper } from '../../utils/SnackbarContentWrapper'
import Loading from './../../utils/Loading'
import { passwordRecovery } from './../../services/firebase'

export default function PasswordRecovery() {
  const [variant, setVariant] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    setLoading(true)
    if (email) {
      passwordRecovery(email)
        .then(user => {
          setVariant('success')
          setMessage('Se ha enviado un correo para restablecer su clave')
          setOpen(true)
          setTimeout(() => {
            setEmail('')
            setLoading(false)
          }, 2000)
        })
        .catch(err => {
          setTimeout(() => {
            setVariant('error')
            setMessage('Correo inválido')
            setOpen(true)
            setLoading(false)
          }, 2000)
        })
    } else {
      setVariant('error')
      setMessage('Digite un correo')
      setOpen(true)
      setEmail('')
      setLoading(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid container justify='center' alignItems='center' className='fondo'>
      {loading && <Loading />}
      <Card item className='recovery-card'>
        <CardContent>
          <Typography component='h4' variant='h4' className='h4 center'>
            Recover Password
          </Typography>
        </CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            placeholder='Email'
            inputProps={{
              'aria-label': 'description'
            }}
            className='input'
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <CardActions>
            <Button
              type='submit'
              variant='contained'
              color='secondary'
              size='large'
              className='recover-button'
            >
              Recover
            </Button>
          </CardActions>
        </form>
      </Card>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
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
    </Grid>
  )
}
