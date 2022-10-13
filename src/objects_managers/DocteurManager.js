import { db,auth ,refDocteur} from "../initFirebase";
import { doc, setDoc, getDoc,getDocs,deleteDoc,query,where } from "firebase/firestore";
import { docteurConverter } from "../objects/Docteur";


export async function CreateDocDocteur(docteur) {
    const docRef = await setDoc(doc(refDocteur, docteur.id), docteur);
    console.log("Auth User ID: ", auth.currentUser.uid);
    console.log("Docteur ID: ", docteur.id);

    console.log("Document Docteur written with ID: ", docRef.id);
  }
  
//Get one user by id
export async function getDocteurById(Id) {
  console.log('Docteur Id into function : ',Id)

  const ref = doc(db, "Docteur", Id).withConverter(docteurConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to docteur object
    const docteur = docSnap.data();
    return docteur;
  } else {
    console.log("No such document!");
    return null;
  }
}