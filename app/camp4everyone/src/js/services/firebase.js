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
export const dbRef = firebaseApp.database();

export const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
export const signup = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
export const signout = () => {
  return auth.signOut();
};
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
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
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
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
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
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
};
export const getdb = () => {
  return db;
};

/* export const updateUser = (user, namess) => {
  console.log("Email del usuraio a Update: ", user.email);
  console.log("Nombre del usuraio a Update: ", user.name);
  console.log(maness);
  user
    .updateProfile({ name: "hello", email: "123@123.com" })
    .then(function() {
      console.log("User updated succesfully.");
    })
    .catch(function(error) {
      console.error("Error updating user profile: ", error);
    });
  user
    .updateEmail("123@123.com")
    .then(function() {
      console.log("User email updated succesfully.");
    })
    .catch(function(error) {
      console.error("Error email user error: ", error);
    });
  console.log("Email del usuraio a Update: ", user.email);
  console.log("Nombre del usuraio a Update: ", user.name);
}; */

export const updateUser = (userID, namess) => {
  return dbRef
    .ref("users/" + userID)
    .set({
      name: namess
    })
    .then(function() {
      console.log("User updated succesfully.");
    })
    .catch(function(error) {
      console.error("Error updating user profile: ", error);
    });
};

export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};
