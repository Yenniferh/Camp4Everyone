import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { getCurrentUser, updatePhoto } from './../../services/firebase'

export default function index() {
  let photo = React.createRef()
  let uploadPhoto = React.createRef()
  let tooltip = React.createRef()
  let output = React.createRef()

  const handleClick = () => {
    photo.current.click()
  }

  const handleChange = ev => {
    console.log(photo)

    let input = ev.target
    let reader = new FileReader()

    reader.onload = function() {
      let dataURL = reader.result
      output.current.src = dataURL
    }
    reader.readAsDataURL(input.files[0])

    if (photo.current.value) {
      tooltip.current.innerHTML = photo.current.value.replace(/^.*\\/, '')
    } else {
      tooltip.current.innerHTML = 'No photo chosen, yet.'
    }
  }

  return (
    <Fragment>
      <Grid container className='profile'>
        <Grid item className='head'>
          <Container maxWidth='md' className='head-info'>
            <Avatar className='head-info_avatar'>RM</Avatar>
            <Typography variant='h4' component='h1' className='head-info_name'>
              Ryan Musk
            </Typography>
          </Container>
        </Grid>
        <Grid item className='info-details'>
          <Container maxWidth='md' className='details'>
            <input
              type='file'
              id='photo'
              accept='image/*'
              hidden
              ref={photo}
              onChange={handleChange}
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
          <img id='output' ref={output}></img>
        </Grid>
      </Grid>

      
    </Fragment>
  )
}
