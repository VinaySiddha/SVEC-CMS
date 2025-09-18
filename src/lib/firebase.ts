// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBUuYnkqq0Zzgf_LyyHtlI-kbYzDd0InwI",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "contentpilot-9c0ca.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "contentpilot-9c0ca",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "contentpilot-9c0ca.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "468142706783",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:468142706783:web:a6730718ab30ce22a94bea"
};

// Initialize Firebase for Singleton Pattern
let app: FirebaseApp;
let db: Firestore;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase app initialized successfully");
  } else {
    app = getApp();
    console.log("Using existing Firebase app");
  }

  db = getFirestore(app);
  
  // Connect to emulator in development if needed
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true') {
    try {
      connectFirestoreEmulator(db, 'localhost', 8080);
      console.log("Connected to Firestore emulator");
    } catch (error) {
      console.warn("Firestore emulator connection failed:", error);
    }
  }
  
  console.log("Firestore initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

export { app, db };
