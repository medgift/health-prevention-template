import {doc, getDoc, collection} from "firebase/firestore";
import {db} from "../initFirebase";
import {doctorConverter} from "../DTO/DoctorDTO";

export class DoctorDB {
    async getDoctorById(uid) {
        const a = await getDoc(doc(db, "Doctor", uid).withConverter(doctorConverter));
        return a.data();
    }

    async getPatientsOfDoctor(docUid) {



    }
}