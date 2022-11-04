import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {doc, getFirestore, collection} from "firebase/firestore";
import {questionConverter} from "./DTO/QuestionDTO";
import {responseConverter} from "./DTO/ResponseDTO";
import {patientConverter} from "./DTO/PatientDTO";
import {doctorConverter} from "./DTO/DoctorDTO";

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // Other configuration options, such as the Realtime Database / Firestore details...
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

const app = initializeApp(config);
const db = getFirestore(app);

// Collections
const questionRef = collection(db, "Question").withConverter(questionConverter);
const responseRef = collection(db, "Response").withConverter(responseConverter);
const patientRef = collection(db, "Patient").withConverter(patientConverter);
const doctorRef = collection(db, "Doctor").withConverter(doctorConverter);


export const auth = getAuth(app);
export {db};
export {questionRef, responseRef, patientRef};
