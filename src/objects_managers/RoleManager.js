import { auth } from "../initFirebase";
import { db } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import { refRoles } from "../initFirebase";
import { roleConverter } from "../objects/Role";


//Get data once
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
