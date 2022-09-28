import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // Other configuration options, such as the Realtime Database / Firestore details...
};

const app = initializeApp(config);
export const auth = getAuth(app);

export default app;
