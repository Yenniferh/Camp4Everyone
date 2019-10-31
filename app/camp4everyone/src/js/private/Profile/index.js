import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

export default function index() {
  const handleClick = () => {
    console.log('Hola');
  };

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
            <input type='file' id='photo' hidden></input>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              size='large'
              id='upload-photo'
            >
              upload photo
            </Button>
            <Typography variant='body2' component='p' id='tooltip'>
              No photo chosen, yet.
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </Fragment>
  );
}
