import {doc, getDoc, collection} from "firebase/firestore";
import {db} from "../initFirebase";
import {adminConverter} from "../DTO/AdminDTO";
import {patientConverter} from "../DTO/PatientDTO";

export class AdminDB {
    async getAdminById(uid) {
        const a = await getDoc(doc(db, "Administrator", uid).withConverter(adminConverter));
        return a.data();
    }
}