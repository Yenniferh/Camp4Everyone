import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

export default function Landing() {
  return (
    <Grid container component="main" className="">
      <Grid item lg={12} component="div" className="hero-container">
        <div className="opacity-container">
          <Container className="hero center">
            <Typography component="h2" variant="h2" className="h2">
              Camp4Everyone
            </Typography>
            <Typography component="h4" variant="h4" className="h4">
              Discover new places, begin the adventure
            </Typography>
            <Button type="button" variant="contained" color="secondary">
              See places
            </Button>
          </Container>
        </div>
      </Grid>
    </Grid>
  );
}
