import {addDoc, doc, getDoc, getDocs, query, where, collection, setDoc} from "firebase/firestore";
import {db, patientRef} from "../initFirebase";
import {patientConverter} from "../DTO/PatientDTO";

class PatientDB {

    async addPatient(uid, patient) {
      //  await addDoc(patientRef, patient);
        await setDoc(doc(db, "Patient", uid), patient);
    }

    async getPatientById(patientId) {
        const p = await getDoc(doc(db, "Patient", patientId).withConverter(patientConverter));
        return p.data();
    }
}

export {PatientDB};