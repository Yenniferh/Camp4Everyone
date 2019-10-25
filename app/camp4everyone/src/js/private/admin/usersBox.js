/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { getdb }  from '../../services/firebase';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function UserTimes(){
    const [users]
    const db = getdb()
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    });
}

export default function UsersBox() {
    const users = UserTimes()

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Users ({users.map().lenght()})</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="javascript:;">
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}