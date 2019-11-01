import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
});
const auth = firebase.auth();
export const db = firebaseApp.firestore();

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
}
export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
}
export const signout = () => {
  return auth.signOut()
}
export const passwordRecovery = email => {
  return auth.sendPasswordResetEmail(email);
};

export const addUser = (name, email) => {
  return db
    .collection("users")
    .add({
      name: JSON.stringify(name),
      email: JSON.stringify(email)
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const addPlace = (name, price) => {
  return db
    .collection("places")
    .add({
      name: JSON.stringify(name),
      price: price
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};
export const addReservation = (user, place, price, date) => {
  return db
    .collection("reservations")
    .add({
      user: JSON.stringify(user),
      place: JSON.stringify(place),
      billing: price,
      date: date
    })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};
export const getdb = () => {
  return db;
};

export const ChangeName = (newName) => {
  let email = getCurrentUserEmail();
  console.log("User email: ", email);
  db.collection("users")
    .where("email", "==", JSON.stringify(email))
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection("users")
          .doc(doc.id)
          .update({ "name": newName });
      });
    })
    .then(function () {
      console.log("User name updated succesfully.");
    })
    .catch(function (error) {
      console.error("Error updating user name: ", error);
    });
};

export const getCurrentUserEmail = () => {
  return firebase.auth().currentUser.email;
};

export const updatePhoto = (user, url) => {
  return db
    .collection('users')
    .where('email', '==', 'noadmin@noadmin.com')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, ' => ', doc.data())
        // Build doc ref from doc.id
        db.collection('users')
          .doc(doc.id)
          .update({
            avatarUrl:
              'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
          })
      })
    })
}

export const changeEmail = (newEmail,oldEmail) =>{
  db.collection("users").where("email", "==", oldEmail)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          console.log(doc.id, " => ", doc.data());
          db.collection("users").doc(doc.id).update({"email": newEmail});
      });
 })
  
  return db;
}
