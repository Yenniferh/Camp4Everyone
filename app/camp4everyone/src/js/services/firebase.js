import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  projectId: process.env.REACT_APP_PROJECTID,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
});
const auth = firebase.auth();
export const db = firebaseApp.firestore();
export const dbstorage = firebaseApp.storage();
export const storageRef = dbstorage.ref();

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
    .collection('users')
    .add({
      name: name,
      email: email,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

export const readUser = (email) => {
  return db.collection("users").where('email', '==', email)
    .get()
    .then((data) => {
      let user = []
      data.forEach((doc) => {
        console.log(doc)
        user.push(doc.data());
      });
      return user;
    }).catch((err) => console.log(err));
};
export const updateUser = (email, name, role) => {
  return db.collection("users").where('email', '==', email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection('users')
          .doc(doc.id)
          .update({ name: name, role: role });
      });
    })
};
export const updatePlace = (name, price) => {
  return db.collection("places").where('name', '==', name)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {

        db.collection('places')
          .doc(doc.id)
          .update({ price: price });
      });
    })
};
export const updateReservation = (code, date, billing) => {
  if (date && billing) {
    return db.collection("reservations").where('code', '==', code)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          db.collection('reservations')
            .doc(doc.id)
            .update({ billing: billing, date: date });
        });
      })
  } else {
    if (date) {
      return db.collection("reservations").where('code', '==', code)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection('reservations')
              .doc(doc.id)
              .update({ date: date });
          });
        })
    }
    if (billing) {
      return db.collection("reservations").where('code', '==', code)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            db.collection('reservations')
              .doc(doc.id)
              .update({ billing: billing });
          });
        })
    }
  }
};
export const readPlace = (name) => {
  return db.collection("places").where('name', '==', name)
    .get()
    .then((data) => {
      let place = []
      data.forEach((doc) => {
        place.push(doc.data());
      });
      return place;
    }).catch((err) => console.log(err));
};

export const addPlace = (name, price, maxcap, category, address, description) => {
  return db
    .collection('places')
    .add({
      name: name,
      price: price,
      address: address,
      description: description,
      maxcap: maxcap,
      category: category,
      image1: 'https://firebasestorage.googleapis.com/v0/b/camp4everyone-19221.appspot.com/o/places%2Fdefault%2FWhite%20Wall.jpg?alt=media&token=490c7efb-1b13-4e68-9b0e-2dff2662bdc7',
      image2: 'https://firebasestorage.googleapis.com/v0/b/camp4everyone-19221.appspot.com/o/places%2Fdefault%2FWhite%20Room.jpg?alt=media&token=db23b430-7009-4451-abdb-35c6d2d77568',
      image3: 'https://firebasestorage.googleapis.com/v0/b/camp4everyone-19221.appspot.com/o/places%2Fdefault%2FWhite%20Stairs.jpg?alt=media&token=81d7ace5-06a5-47f0-8f41-b3b016a5f578'
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};
export const addReservation = (user, place, price, date) => {
  return db
    .collection('reservations')
    .add({
      user: user,
      place: place,
      billing: price,
      date: date,
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};
export const readReservation = code => {
  console.log(code);
  return db.collection("reservations").where('code', '==', code)
    .get()
    .then((data) => {
      let user = []
      data.forEach((doc) => {
        console.log(doc)
        user.push(doc.data());
      });
      return user;
    }).catch((err) => console.log(err));
};
export const getdb = () => {
  return db;
};

export const ChangeName = newName => {
  let email = getCurrentUserEmail();
  db.collection('users')
    .where('email', '==', email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection('users')
          .doc(doc.id)
          .update({ name: newName });
      });
    })
    .then(function () {
      console.log('User name updated succesfully.');
    })
    .catch(function (error) {
      console.error('Error updating user name: ', error);
    });
};

export const updateUserEmail = newEmail => {
  firebase
    .auth()
    .currentUser.updateEmail(newEmail)
    .then(function () {
      console.log('User email updated succesfully.');
    })
    .catch(function (error) {
      console.error('Error updating user profile email: ', error);
    });
};

export const ChangeEmail = newEmail => {
  let email = getCurrentUserEmail();
  db.collection('users')
    .where('email', '==', email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection('users')
          .doc(doc.id)
          .update({ email: newEmail });
      });
      updateUserEmail(newEmail);
      //FIXME: Chanche image folder name to new email.
    })
    .then(function () {
      console.log('User name updated succesfully.');
    })
    .catch(function (error) {
      console.error('Error updating user name: ', error);
    });
};

export const getCurrentUserEmail = () => {
  return firebase.auth().currentUser.email;
};

export const UploadImage = file => {
  const storageRef = dbstorage.ref();
  let email = getCurrentUserEmail();
  storageRef
    .child('images/' + email + '/' + file.name)
    .put(file)
    .then(function (snapshot) {
      snapshot.ref
        .getDownloadURL()
        .then(function (downloadURL) {
          ChangeImg(downloadURL);
        })
        .catch(function (error) {
          console.error('Error consiguiendo URL: ', error);
        });
    })
    .catch(function (error) {
      console.error('Error uploading Image: ', error);
    });
};

export const ChangeImg = imgURL => {
  let email = getCurrentUserEmail();
  db.collection('users')
    .where('email', '==', email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        db.collection('users')
          .doc(doc.id)
          .update({ image: imgURL });
      });
    })
    .catch(function (error) {
      console.error('Error updating user image: ', error);
    });
};

export const deletePlace = (placeName) => {
  return db.collection('places')
    .where('name', '==', placeName)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) {
        throw "error 404"
      } else {
        return querySnapshot
      }
    })
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        return db.collection("places").doc(doc.id).delete()
      });
    });
};
export const deleteUser = (userEmail) => {
  return db.collection('users')
    .where('email', '==', userEmail)
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) {
        throw "error 404"
      } else {
        return querySnapshot
      }
    })
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        return db.collection("users").doc(doc.id).delete()
      });
    });
};
export const deleteReservation = (reservationId) => {
  return db.collection("reservations").doc(reservationId).delete();
};

export const prueba = () => {
  const list_of_place = document.querySelector("#list_of_places");
  db.collection("places").get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        list_of_place.innerHTML +=
          "<Card item className='Location-Card'> <CardContent> <Typography component='h5' variant='h5' className='h5'>" + doc.data().name + "</Typography><Typography>$120 USD</Typography><Typography>Tiempo: 3 days</Typography><Typography>Calificacion: 5.0⋆ (20)</Typography></CardContent><CardActions><Button type='button' variant='contained' color='secondary' size='large' className='Book-Button'> Book </Button> </CardActions> </Card>"
      }
      )
    });
}
