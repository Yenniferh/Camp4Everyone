import React  from "react";
import { getdb }  from '../../services/firebase'

function userTimes(){
    const db = getdb()
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    });
}


const  userList = () => {
    const users = userTimes()
    return(
      
      <main>
         listin users in console
      </main>
    );
  }
  export default userList;