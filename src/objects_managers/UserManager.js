import { auth } from "../initFirebase";
import { db } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import { refUser } from "../initFirebase";
import { userConverter } from "../objects/User";

export async function CreateDocUser(user) {
  //By default : the constructor put the patient id as the id_role
  // Add a new document with the id of the auth user created.
  const docRef = await setDoc(doc(refUser, auth.currentUser.uid), user);
  console.log("Auth User ID: ", auth.currentUser.uid);
  console.log("Document User written with ID: ", docRef.id);
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
  const ref = doc(db, "User", userId).withConverter(userConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to User object
    const user = docSnap.data();
    // Use a User instance method
    console.log(user.toString());
    return user;
  } else {
    console.log("No such document!");
    return null;
  }
}

//Get one user by id
export async function getUserByEmail(userEmail) {
  const q = query(refUser, where("nom", "==", userEmail));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
