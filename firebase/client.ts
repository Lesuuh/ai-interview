// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhnguAoljNBtxM6mc2TgSPuljuSpxrSWI",
  authDomain: "prepwise-6bc1c.firebaseapp.com",
  projectId: "prepwise-6bc1c",
  storageBucket: "prepwise-6bc1c.firebasestorage.app",
  messagingSenderId: "243989654464",
  appId: "1:243989654464:web:c47eeb9ec68ee94fedb625",
  measurementId: "G-TEQRRFZZ3H",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
