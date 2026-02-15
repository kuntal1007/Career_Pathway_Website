import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

// @ts-ignore
if (!firebase?.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAmamIqjmNiJWvyYwc3dSGGrNuG1dXBWwE",
    authDomain: "CareerPath-9ebbb.firebaseapp.com",
    projectId: "CareerPath-9ebbb",
    storageBucket: "CareerPath-9ebbb.appspot.com",
    messagingSenderId: "743546942200",
    appId: "1:743546942200:web:c3f43d4ce16a332fbfc10d",
    measurementId: "G-B2Y3N302ZZ",
  });
} else {
  //@ts-ignore
  firebase.app();
}

// @ts-ignore
export var db = firebase.firestore();

export default firebase;
