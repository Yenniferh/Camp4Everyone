import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MaterialIcon from 'material-icons-react';

export default function Landing() {
  return (
    <Grid container component='main' className=''>
      {/* Hero */}
      <Grid item lg={12} component='div' className='hero-container'>
        <div className='opacity-container'>
          <Container className='hero center'>
            <Typography component='h1' variant='h1' className='h1'>
              Camp4Everyone
            </Typography>
            <Typography component='h4' variant='h4' className='h4'>
              Discover new places, begin the adventure and
            </Typography>
            <Typography component='h4' variant='h4' className='h4'>
              live a magical experience.
            </Typography>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              size='large'
            >
              See places
            </Button>
          </Container>
        </div>
      </Grid>

      {/* Benefits */}
      <Grid
        container
        lg={12}
        direction='column'
        component='div'
        className='benefits-container'
      >
        <Typography component='h3' variant='h3' className='h3 center'>
          Benefits
        </Typography>
        <Container maxWidth='md' className='cards-container'>
          <Grid item sm={12} lg={4} component='div'>
            <Card className='card'>
              <CardContent>
                <div className='circle-icon'>
                  <MaterialIcon icon='access_time' color='#11144c' size={100} />
                </div>

                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  className='card-title center'
                >
                  Save Time
                </Typography>

                <Typography
                  variant='body2'
                  component='p'
                  className='card-paragraph center'
                >
                  Find your place faster.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} lg={4} component='div'>
            <Card className='card'>
              <CardContent>
                <div className='circle-icon'>
                  <MaterialIcon
                    icon='attach_money'
                    color='#11144c'
                    size={100}
                  />
                </div>

                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  className='card-title center'
                >
                  Save Money
                </Typography>

                <Typography
                  variant='body2'
                  component='p'
                  className='card-paragraph center'
                >
                  Don't pay more.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} lg={4} component='div'>
            <Card className='card'>
              <CardContent>
                <div className='circle-icon'>
                  <MaterialIcon icon='security' color='#11144c' size={100} />
                </div>

                <Typography
                  gutterBottom
                  variant='h5'
                  component='h2'
                  className='card-title center'
                >
                  Secure
                </Typography>

                <Typography
                  variant='body2'
                  component='p'
                  className='card-paragraph center'
                >
                  Secure payments.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
