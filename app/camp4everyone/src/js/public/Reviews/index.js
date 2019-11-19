import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function createData(user,comment) {
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
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }));

  
export default function Reviews() {
    const classes = useStyles();

  return (
    <Grid container spacing={3}>
        {rows.map(row => (
            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                    <p>{row.user}</p>
                    <p>{row.comment}</p>
                </Paper>
            </Grid>
        ))}
    </Grid>
  );
}
