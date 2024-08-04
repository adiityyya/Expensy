// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
//just imported utilities i need from firebase/auth -> getauth. what does it do. 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOas48yA1ZQrmuFrzY0M5prh2EQiwDlko",
  authDomain: "expense-tracker-3c950.firebaseapp.com",
  projectId: "expense-tracker-3c950",
  storageBucket: "expense-tracker-3c950.appspot.com",
  messagingSenderId: "515161412117",
  appId: "1:515161412117:web:42d8a02d8ce58c5714b41c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);