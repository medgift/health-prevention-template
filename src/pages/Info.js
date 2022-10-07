import Algorithm from "./Algorithm";
import {database} from "../initFirebase";
import "firebase/firestore"
import { firestore } from '../initFirebase.js';
import { collection, getDocs } from "firebase/firestore"; 

import {doc, setDoc} from "firebase/firestore"

export default async function Info() {

 try {
  await setDoc(doc(database, "users","hugo"), {
   firstname: "h",
   lastname: "h",
   mail: "h",
   password: "h",
   role: "w"
  });
 }catch (e) {
  console.log(e)
 }

 const querySnapshot = await getDocs(collection(firestore, "users"));
 querySnapshot.forEach((doc) => {
 console.log(`${doc.id} => ${doc.data().firstname} => ${doc.data().lastname} => ${doc.data().mail} => ${doc.data().password} => ${doc.data().role}`);
});


 var resultAlgo = new Algorithm(0,70,0,110,3.5,1.9,1,0,28,3,3,2,0,5,0,0)

 return <div><h1>{resultAlgo.resultInfarctus} % of infarctus</h1>
  <h1>{resultAlgo.resultNonInfarctus} % of non infarcuts</h1>
  <h1>{resultAlgo.resultCancer} % of Cancer</h1>
  <h1>{resultAlgo.resultDiabete} % of diabete</h1>
 </div>;



}
