import { auth } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import { refUser } from "../initFirebase";


export async function CreateDocUser(user) {
    //By default : the constructor put the patient id as the id_role
  
    // Add a new document with the id of the auth user created.
    const docRef = await setDoc(doc(refUser, auth.currentUser.uid), user);
    console.log("Auth User ID: ", auth.currentUser.uid);
    console.log("Document User written with ID: ", docRef.id);
  }