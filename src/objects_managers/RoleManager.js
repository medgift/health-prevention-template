import { auth } from "../initFirebase";
import { db } from "../initFirebase";
import { doc, setDoc, getDoc,getDocs,deleteDoc,query,where } from "firebase/firestore";
import { refRoles } from "../initFirebase";
import { roleConverter } from "../objects/Role";
import { async } from "@firebase/util";

//Get data once
export async function GetAllRole() {
  const roleSnapshot = await getDocs(refRoles);
  const roleList = roleSnapshot.docs.map((doc) => doc.data());
  return roleList;
}

//Get one role by name
export async function getRoleByName(roleName) {
  const q = query(refRoles, where("nom", "==", roleName));

  let role;
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    role = doc.data();
    role.id_role = doc.id;
  });
  return role;
}

//Get one user by id
export async function getRoleById(roleId) {
  const ref = doc(db, "Roles", roleId.toString()).withConverter(roleConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const role = docSnap.data();
    return role;
  } else {
    console.log("No such role document!");
    return null;
  }
}
