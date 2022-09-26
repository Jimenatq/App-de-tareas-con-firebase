import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD_hDOdQAuxABt8pfv4m0HvzRarpzwGymA",
    authDomain: "practicando-react-87da1.firebaseapp.com",
    projectId: "practicando-react-87da1",
    storageBucket: "practicando-react-87da1.appspot.com",
    messagingSenderId: "1024813353033",
    appId: "1:1024813353033:web:8452f9d87f0ccd53321798",
    measurementId: "G-7B2MFB0JHY"
  };

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = fire.firestore();

  export {auth, db}