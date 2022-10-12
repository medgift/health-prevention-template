import { auth } from "../initFirebase";
import { db } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import { refVariables } from "../initFirebase";
import { variableConverter } from "../objects/Variables";

export async function CreateDocVariable(variable) {
  // Add a new document with a new id 
  const docRef = await addDoc(doc(refVariables), variable);
  console.log("Document User written with ID: ", docRef.id);
}

//Get data once
//Get all variables
export async function getVariables() {
  const variablesSnapshot = await getDocs(refVariables);
  const varList = variablesSnapshot.docs.map((doc) => doc.data());
  return varList;
}

//Get one Variable by id
export async function getVariableById(varId) {
  const ref = doc(db, "Variables", varId).withConverter(variableConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to Variable object
    const variable = docSnap.data();
    // Use a Variable instance method
    console.log(variable.toString());
    return variable;
  } else {
    console.log("No such document!");
    return null;
  }
}

//Get one Variable by name
export async function getVariableByName(varName) {
  const q = query(refVariables, where("nom", "==", varName));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
