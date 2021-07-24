import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiu2a3ESQtudQySgM8V9PcF33BCPGGaY8",
  authDomain: "trial-2835c.firebaseapp.com",
  databaseURL: "https://trial-2835c-default-rtdb.firebaseio.com",
  projectId: "trial-2835c",
  storageBucket: "trial-2835c.appspot.com",
  messagingSenderId: "374248472466",
  appId: "1:374248472466:web:73cbcab3e9431070670b4b"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export {storage, firebase as default};