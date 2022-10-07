import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app"
import 'firebase/firestore';
import { Firestore, getFirestore } from "firebase/firestore";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "grp2-healthapp"
  // Other configuration options, such as the Realtime Database / Firestore details...
};

const app = initializeApp(config);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export { app };
