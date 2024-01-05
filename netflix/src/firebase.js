import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNtZy98OuDhazOO0PPaZLgAzqnxTu210Y",
  authDomain: "netflix-clone-45303.firebaseapp.com",
  projectId: "netflix-clone-45303",
  storageBucket: "netflix-clone-45303.appspot.com",
  messagingSenderId: "31899697749",
  appId: "1:31899697749:web:f97fbde9e16ae27cf34adc",
  measurementId: "G-Q0DJD2T704"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export default db;