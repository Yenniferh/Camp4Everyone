import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Footer() {
  return (
    <Grid container className='footer'>
      <Container maxWidth='md' className='footer-container'>
        <Link to='/termsandconditions' className='footer-link'>
          <Typography>terms and conditions</Typography>
        </Link>
        <Link to='/aboutus' className='footer-link'>
          <Typography>about us</Typography>
        </Link>
        <Link to='/category' className='footer-link'>
          <Typography>categories</Typography>
        </Link>
        <Link to='/categorynav' className='footer-link'>
          <Typography>category view example</Typography>
        </Link>
        <Link to='/passwordrecovery' className='footer-link'>
          <Typography>password recovery</Typography>
        </Link>
      </Container>
    </Grid>
  );
}
