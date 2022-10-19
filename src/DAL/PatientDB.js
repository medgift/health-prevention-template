import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db, patientRef} from "../initFirebase";
import {patientConverter} from "../DTO/PatientDTO";

class PatientDB {

    async addPatient(uid, patient) {
        await setDoc(doc(db, "Patient", uid), patient);
    }

    async getPatientById(patientId) {
        const p = await getDoc(doc(db, "Patient", patientId).withConverter(patientConverter));
        return p.data();
    }

    async updateAvatar(patientId, avatarConfig) {
        const p = doc(db, "Patient", patientId);
        await updateDoc(p, {
            AvatarConfig: avatarConfig
        });
    }
}

export {PatientDB};