import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";

// Configure Firebase.
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "grp2-healthapp",
    databaseURL: 'https://console.firebase.google.com/u/2/project/grp2-healthapp/firestore/data/~2Fanswers~2FJiLB1bbYFp33SOBgadTc'

    // Other configuration options, such as the Realtime Database / Firestore details...
};

const app = initializeApp(config);
const database = getFirestore(app);
export const auth = getAuth(app);

export { app, database };