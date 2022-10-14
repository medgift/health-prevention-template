import { db } from "../initFirebase";
import { doc, setDoc, getDoc, getDocs,updateDoc, query, where } from "firebase/firestore";
import { resultatsConverter, Resultats } from "../objects/Resultats";


export async function CreateDocResultats(id_user,resultat) {
  let refDoc = db.collection("Resultat").doc(id_user).collection("Resultats").doc(resultat.id_resultats).withConverter(resultatsConverter);

 

  // Add a new document with today's date as the id
  const doc = await setDoc(refDoc, resultat);
  console.log("Auth User ID: ", id_user);
  console.log("Document Resultat written with ID: ", doc.id);
}


//Update information for the user
export async function UpdateResultatData(id_user, res){
  let refCollection = db.collection("Resultat").doc(id_user).collection("Resultats").withConverter(resultatsConverter);

  const ref = doc(refCollection,res.todayDate);
  await updateDoc(ref,...res);
}
//console.log(UpdateResultatData(new Resultats(12,13,14,15)));

//Get all resultats of one user
export async function GetAllResultatsByUser(id_user) {
  let refCollection = db.collection("Resultat").doc(id_user).collection("Resultats").withConverter(resultatsConverter);

  const resultatsSnapshot = await getDocs(refCollection);
  const resList = resultatsSnapshot.docs.map((doc) => doc.data());
  return resList;
}

//Get one resultat of one user on a precise date
export async function GetResultatsByDate(id_user,id_resultats) {
  let refCollection = db.collection("Resultat").doc(id_user).collection("Resultats").withConverter(resultatsConverter);

  const ref = doc(db, refCollection, id_resultats).withConverter(resultatsConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to Resultat object
    const resultat = docSnap.data();
    // Use a Resultat instance method
    console.log(resultat.toString());
    return resultat;
  } else {
    console.log("No such document!");
    return null;
  }
}
