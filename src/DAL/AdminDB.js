import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../initFirebase";

export class AdminDB {
    async getAdminById(uid) {
        const p = await getDoc(doc(db, "Administrator", uid));
        return p;
    }
}