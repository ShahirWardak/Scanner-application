// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { FIREBASE_API_KEY } from "@env";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "scanner-items.firebaseapp.com",
  projectId: "scanner-items",
  storageBucket: "scanner-items.firebasestorage.app",
  messagingSenderId: "221832771924",
  appId: "1:221832771924:web:d61054172b79577016f0c1",
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
