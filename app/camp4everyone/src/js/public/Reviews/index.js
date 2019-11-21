import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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

// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'left',
//       color: theme.palette.text.secondary,
//     },
//   }));

export default function Reviews() {
  // const classes = useStyles();
  const [data, setData] = useState('');

  return (
    <Container maxWidth='md'>
      <Grid container spacing={3} className='review-container'>
        <Grid item xs={12} sm={8}>
          <Typography component='h3' variant='h3' className='h3'>
            Reviews
          </Typography>
        </Grid>
        {rows.map(row => (
          <Grid item xs={12} sm={8}>
            {/* <Paper className={classes.paper}>
                    <p>{row.user}</p>
                    <p>{row.comment}</p>
                </Paper> */}
            <Card>
              <CardHeader
                avatar={<Avatar>{row.user.charAt(0)}</Avatar>}
                title={row.user}
              ></CardHeader>
              <CardContent>
                <Typography>{row.comment}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
