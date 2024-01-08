import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5syuRqvk_dyaT5pr3ari36srtSlznE-o",
  authDomain: "mail-box-clint-6b3d1.firebaseapp.com",
  databaseURL: "https://mail-box-clint-6b3d1-default-rtdb.firebaseio.com",
  projectId: "mail-box-clint-6b3d1",
  storageBucket: "mail-box-clint-6b3d1.appspot.com",
  messagingSenderId: "378180596632",
  appId: "1:378180596632:web:d5d7bafda1761aa8d031ed"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.EmailAuthProvider();
export {db, auth , provider}