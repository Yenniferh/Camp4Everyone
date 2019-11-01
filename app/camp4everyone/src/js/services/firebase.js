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
      name: name,
      email: email
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
      name: name,
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
      user: user,
      place: place,
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

/* export const updateUser = (user, namess) => {
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

export const ChangeName = (newName) => {
  let email = getCurrentUserEmail();
  console.log("User email NAME: ", email);
  db.collection("users")
    .where("email", "==", email)
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

export const updateUserEmail = (newEmail) => {
  firebase.auth().currentUser
    .updateEmail(newEmail)
    .then(function () {
      console.log("User email updated succesfully.");
    })
    .catch(function (error) {
      console.error("Error updating user profile email: ", error);
    });
};

export const ChangeEmail = (newEmail) => {
  let email = getCurrentUserEmail();
  db.collection("users")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection("users")
          .doc(doc.id)
          .update({ "email": newEmail });
      });
      updateUserEmail(newEmail);
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
