// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtjUTJfVogXLDNCDw_8a7wmUMAoxo_QlY",
  authDomain: "daily-sleep-tracker-ec4e3.firebaseapp.com",
  projectId: "daily-sleep-tracker-ec4e3",
  storageBucket: "daily-sleep-tracker-ec4e3.appspot.com",
  messagingSenderId: "208204226942",
  appId: "1:208204226942:web:8c473b15a0c99b675ed32f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
