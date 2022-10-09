import { auth } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import {  refDocteur } from "../initFirebase";


export async function CreateDocDocteur(docteur) {
    const docRef = await setDoc(doc(refDocteur, auth.currentUser.uid), docteur);
    console.log("Auth User ID: ", auth.currentUser.uid);
    console.log("Document User written with ID: ", docRef.id);
  }
  