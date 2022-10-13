import { db } from "../initFirebase";
import { doc, updateDoc } from "firebase/firestore";
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

console.log('getvariable',getVariableById('0wLBCWipfVrOeV3anxPE'));

//Get one Variable by name
export async function getVariableByName(varName) {
  const q = query(refVariables, where("nom", "==", varName));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

//Update one variable
export async function updateVariableData(varId,limits,name,normalVal,predefinedVal){
  let refV = doc(refVariables,varId);  
  await updateDoc(refV,{
    limites: limits,
    nom: name,
    val_normale: normalVal,
    val_predefinie: predefinedVal,
  });
}

//Set multiples variables
//Don't work for the moment
export function writeVariablesData(listVariable){
  listVariable.forEach(v => 
    set(ref(db,"Variables", v.varId),{
    limites: v.limits,
    nom: v.name,
    val_normale: v.val_normal,
    val_predefinie: v.val_predefined,
  })
  );
}





