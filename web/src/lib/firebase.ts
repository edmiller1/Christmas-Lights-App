// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcgf_4fW7scz2GlNZCoKopwRgQ9UPQFvE",
  authDomain: "christmas-lights-app-80653.firebaseapp.com",
  projectId: "christmas-lights-app-80653",
  storageBucket: "christmas-lights-app-80653.appspot.com",
  messagingSenderId: "134951393398",
  appId: "1:134951393398:web:4bddbad6a53579f8752757",
  measurementId: "G-55F4VBLT69",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
