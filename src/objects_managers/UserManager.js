import { db, auth } from "../initFirebase";
import { doc, setDoc, getDoc,getDocs,deleteDoc, updateDoc,query,where } from "firebase/firestore";
import { refUser } from "../initFirebase";


export async function CreateDocUser(user) {
  //By default : the constructor put the patient id as the id_role
  // Add a new document with the id of the auth user created.
  const docRef = await setDoc(doc(refUser, user.id_user), user);
  console.log("Auth User ID: ", auth.currentUser.uid);
  console.log("Doc User ID: ", user.id_user);
}

//Get data once
//Get all users
export async function getUsers() {
  const userSnapshot = await getDocs(refUser);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

//Get one user by id
export async function getUserById(userId) {

  const ref = doc(refUser, userId);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return user;
  } else {
    console.log("No such User document!");
    return null;
  }
}

//Get one user by id
export async function getUserByEmail(userEmail) {
  const q = query(refUser, where("email", "==", userEmail));
let user;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    user = doc.data();
  });
  if(user ===null){
    console.log("No such User document!");
    return null;
  }
  return user;
}

//Update information for the user
export async function updateUserData(user){
  const ref = doc(refUser, user.id_user);
  await updateDoc(ref,{
    nom: user.nom,
    email: user.mail,
    age: user.age,
    poids: user.weight,
    sexe: user.sex, //
    taille: user.height,
  });
}

//console.log(updateUserData('MPfBRXNkgmhJw24HihqsJILGVNS2',29,190,1,210));


//Delete a User Document
export async function DeleteUserDoc(id_user){
  await deleteDoc(doc(db, "User", id_user));
}