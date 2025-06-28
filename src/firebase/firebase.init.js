// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLTTX__o1jVR3MjKQHuqcUJCyyiUprs58",
  authDomain: "zap-shift-e652d.firebaseapp.com",
  projectId: "zap-shift-e652d",
  storageBucket: "zap-shift-e652d.firebasestorage.app",
  messagingSenderId: "466366897112",
  appId: "1:466366897112:web:ce4c372aa8a8d6280630ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
