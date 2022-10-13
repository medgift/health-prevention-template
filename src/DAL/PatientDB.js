import {addDoc, doc, getDoc, getDocs, query, where, collection} from "firebase/firestore";
import {db, patientRef} from "../initFirebase";
import {patientConverter} from "../DTO/PatientDTO";

class PatientDB {

    async addPatient(patient) {
        await addDoc(patientRef, patient);
    }

    async getPatientById(patientId) {
        const p = await getDoc(doc(db, "Patient", patientId).withConverter(patientConverter));
        return p.data();
    }
}

export {PatientDB};