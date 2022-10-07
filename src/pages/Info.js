import { useEffect, useState } from "react";
import initFirebase from "../initFirebase";
import Algorithm from "./Algorithm";
import { firestore } from '../initFirebase.js';
import { collection, getDocs } from "firebase/firestore"; 



export default async function Info() {
 
  const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().firstname} => ${doc.data().lastname} => ${doc.data().mail} => ${doc.data().password} => ${doc.data().role}`);
    });


  return (
  <>
      
  </>
  
  );
}
