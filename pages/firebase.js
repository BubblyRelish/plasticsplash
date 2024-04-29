// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl0tXFR2nakbbVq5GVtt2QlUZWDd02yZw",
  authDomain: "plasticsplash-7f8e4.firebaseapp.com",
  projectId: "plasticsplash-7f8e4",
  storageBucket: "plasticsplash-7f8e4.appspot.com",
  messagingSenderId: "1006447432172",
  appId: "1:1006447432172:web:b99da58af70228831130c9",
  measurementId: "G-NVCVPRMJ1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);