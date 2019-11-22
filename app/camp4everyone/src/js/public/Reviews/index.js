import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getReviews, getPlaceReviews } from '../../services/firebase';

function createData(user, comment) {
  return { user, comment };
}

const rows = [
  createData('Elvis Presley', 'BLA BLA BLA BLA'),
  createData('Paul McCartney', 'BLA BLA BLA BLA'),
  createData('Tom Scholz', 'BLA BLA BLA BLA'),
  createData('Michael Jackson', 'BLA BLA BLA BLA'),
  createData('Bruce Springsteen', 'BLA BLA BLA BLA'),
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));


export default function Reviews() {
  const classes = useStyles();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    getReviews('SERkVLb1SBJOiK5wn8FO').then(res =>{
      setTimeout(() => {
        console.log(res)
        setReviews(res)
      }, 2000)
    })
  },[]);

  return (
    <Container maxWidth='md'>
      <Grid container spacing={3} className='review-container'>
        {reviews ? (
          <React.Fragment>
            <Grid item xs={12} sm={8}>
              <Typography component='h3' variant='h3' className='h3'>
                Reviews
              </Typography>
            </Grid>
            {reviews.map(review => (
              <Grid item xs={12} sm={8} key={review.idRev}>
                <Card>
                  <CardHeader
                    avatar={<Avatar>{review.nameUsr.charAt(0)}</Avatar>}
                    title={review.nameUsr}
                  ></CardHeader>
                  <CardContent>
                    <Typography>{review.comment}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </React.Fragment>
        ) : (
          <div className={classes.root}>
            <CircularProgress color='secondary' size={80} />
          </div>
        )}
      </Grid>
    </Container>
  );
}
