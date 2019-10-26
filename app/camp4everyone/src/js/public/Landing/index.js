import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MaterialIcon from 'material-icons-react';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

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
            <Typography component='h3' variant='h4' className='h4'>
              Discover new places, begin the adventure and
            </Typography>
            <Typography component='h3' variant='h4' className='h4'>
              live a magical experience.
            </Typography>
            <Button
              type='button'
              variant='contained'
              color='secondary'
              size='large'
            >
              <Link to='/category' className='hero-button'>
                See places
              </Link>
            </Button>
          </Container>
        </div>
      </Grid>

      {/* Benefits */}
      <Grid
        container
        direction='column'
        component='div'
        className='benefits-container'
      >
        <Typography component='h2' variant='h3' className='h3 center'>
          Benefits
        </Typography>
        <Grid item container justify='center' className='cards-container'>
          <Card className='card'>
            <CardContent>
              <div className='circle-icon'>
                <MaterialIcon icon='access_time' color='#11144c' size={100} />
              </div>

              <Typography
                gutterBottom
                variant='h5'
                component='h3'
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

          <Card className='card'>
            <CardContent>
              <div className='circle-icon'>
                <MaterialIcon icon='attach_money' color='#11144c' size={100} />
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
      </Grid>

      {/* Reviews */}
      <Grid
        container
        direction='column'
        component='div'
        className='reviews-container'
      >
        <Typography component='h3' variant='h3' className='h3 center'>
          Reviews
        </Typography>
        <Typography variant='h4' component='h4' className='h4 center'>
          This is what our clients are saying...
        </Typography>
        <Grid container justify='space-around' className='review-cards'>
          <Card className='review-card'>
            <CardHeader
              avatar={<Avatar>L</Avatar>}
              title='Laura Pregonero'
            ></CardHeader>
            <CardContent>
              <Typography>I really enjoyed the trip to France</Typography>
            </CardContent>
          </Card>

          <Card className='review-card'>
            <CardHeader
              avatar={<Avatar>E</Avatar>}
              title='Elizabeth Mayer'
            ></CardHeader>
            <CardContent>
              <Typography>Best thing ever! Totally recommend!</Typography>
            </CardContent>
          </Card>

          <Card className='review-card'>
            <CardHeader
              avatar={<Avatar>J</Avatar>}
              title='John Doe'
            ></CardHeader>
            <CardContent>
              <Typography>I visited Sri Lanka last week. Amazing!</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
