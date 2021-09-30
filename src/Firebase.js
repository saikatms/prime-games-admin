import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVjeAg2bVaQDZ4_W7-7WlLY-60cmu6Nmc",
  authDomain: "timuz-games.firebaseapp.com",
  databaseURL: "https://timuz-games-default-rtdb.firebaseio.com/",
  projectId: "timuz-games",
  storageBucket: "timuz-games.appspot.com",
  messagingSenderId: "1015887746572",
  appId: "1:1015887746572:web:c0711fa40936b5d80bc029",
  measurementId: "G-MZT49EJNWH",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
