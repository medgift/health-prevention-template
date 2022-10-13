import { auth } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import {  refDocteur } from "../initFirebase";


export async function CreateDocDocteur(docteur) {
    const docRef = await setDoc(doc(refDocteur, docteur.id), docteur);
    console.log("Auth User ID: ", auth.currentUser.uid);
    console.log("Docteur ID: ", docteur.id);

    console.log("Document Docteur written with ID: ", docRef.id);
  }
  