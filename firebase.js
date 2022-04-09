import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAhW_vhmBPuFuFoklIkvJAL2aqKOz5pfJs",
    authDomain: "movie-library2.firebaseapp.com",
    projectId: "movie-library2",
    storageBucket: "movie-library2.appspot.com",
    messagingSenderId: "613040967767",
    appId: "1:613040967767:web:4550e635b597084a381312",
    measurementId: "G-XC5ZVG8RM6"
  };

  const app = !firebase.apps.length ?  firebase.initializeApp(firebaseConfig) : firebase.app();

  const db = app.firestore();

  export {db} 