import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyBcyxdDTt7aweLhgvEQb0Ai1TnSKD0jCgw",
  authDomain: "my-app-5609f.firebaseapp.com",
  projectId: "my-app-5609f",
  storageBucket: "my-app-5609f.appspot.com",
  messagingSenderId: "821923158424",
  appId: "1:821923158424:web:16585b41e8c273ddc833ed"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };