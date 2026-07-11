import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

// Config parsed from firebase-applet-config.json
const firebaseConfig = {
  projectId: "charming-vial-wms1d",
  appId: "1:728005985984:web:7d26539da00948cd528f25",
  apiKey: "AIzaSyD3zcczLF3_ad4vpKO5oYLm8V3z8sHOV7U",
  authDomain: "charming-vial-wms1d.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-5237c5fc-1a55-46a7-8105-d0db00c99df0",
  storageBucket: "charming-vial-wms1d.firebasestorage.app",
  messagingSenderId: "728005985984",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(
  app,
  "ai-studio-5237c5fc-1a55-46a7-8105-d0db00c99df0",
);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
};
