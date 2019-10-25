import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function index() {
  return (
    <Grid container className='footer'>
      <Container maxWidth='md'>
        <Grid item>
          <Link to='/termsandconditions' className='footer-link'>
            <Typography>terms and conditions</Typography>
          </Link>
          <Link to='/aboutus' className='footer-link'>
            <Typography>about us</Typography>
          </Link>
        </Grid>
      </Container>
    </Grid>
  );
}
