import React, { useState , useEffect}  from "react";
import { getdb }  from '../../services/firebase'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function UserTimes(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
      const db = getdb()
      db.collection("users").onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc)=>({
          email: doc.email,
          ...doc.data()
        }))
        setUsers(newUsers)
      })
  },[]);
  
  return users
}


const  UsersBox = () => {
  const classes = useStyles();
  const users = UserTimes()
    return(
      <React.Fragment>
        <Title> Users ({users.length})</Title>
        <button>CREATE</button>
        <button>READ</button>
        <button>UPDATE</button>
        <button>DELETE</button>
    </React.Fragment>

    );
  }
  export default UsersBox;