// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration will be populated by the tool
// const firebaseConfig = {
//   "projectId": "contentpilot-vwmhh",
//   "appId": "1:692283352347:web:f24b6dbf83c6d3523c5fbe",
//   "storageBucket": "contentpilot-vwmhh.firebasestorage.app",
//   "apiKey": "AIzaSyABuhLJHbccL-zpnR9wx71xdn5nDkjJD1I",
//   "authDomain": "contentpilot-vwmhh.firebaseapp.com",
//   "measurementId": "",
//   "messagingSenderId": "692283352347"
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUuYnkqq0Zzgf_LyyHtlI-kbYzDd0InwI",
  authDomain: "contentpilot-9c0ca.firebaseapp.com",
  projectId: "contentpilot-9c0ca",
  storageBucket: "contentpilot-9c0ca.firebasestorage.app",
  messagingSenderId: "468142706783",
  appId: "1:468142706783:web:a6730718ab30ce22a94bea"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
