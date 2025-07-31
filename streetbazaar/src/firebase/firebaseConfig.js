// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCsAglwH3N2q68LnGBKjcaEZT-RR5F-UaY",
  authDomain: "fresh-mart-eb20f.firebaseapp.com",
  projectId: "fresh-mart-eb20f",
  storageBucket: "fresh-mart-eb20f.firebasestorage.app",
  messagingSenderId: "644844560014",
  appId: "1:644844560014:web:f5da040f4c2f406dd633df",
  measurementId: "G-1VEX66GWHK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
