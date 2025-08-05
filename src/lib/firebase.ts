// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUuYnkqq0Zzgf_LyyHtlI-kbYzDd0InwI",
  authDomain: "contentpilot-9c0ca.firebaseapp.com",
  projectId: "contentpilot-9c0ca",
  storageBucket: "contentpilot-9c0ca.firebasestorage.app",
  messagingSenderId: "468142706783",
  appId: "1:468142706783:web:a6730718ab30ce22a94bea"
};

// Initialize Firebase for Singleton Pattern
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db };
