import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
})
const auth = firebase.auth()

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
  return auth.sendPasswordResetEmail(email)
}
