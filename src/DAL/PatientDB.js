import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../initFirebase";
import {patientConverter} from "../DTO/PatientDTO";

//TODO: écrire ou modifier des méthodes pour les pending
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

    async updatePatientName(patientId, firstName, lastName) {
        const p = doc(db, "Patient", patientId);
        await updateDoc(p, {
            FirstName: firstName,
            LastName: lastName,
        });
    }

    async updatePatientDoctor(patientId, doctorId) {
        const p = doc(db, "Patient", patientId);
        await updateDoc(p, {
            DoctorId: doctorId
        });
    }

    async updatePendingDoctor(patientId, pendingDoctorId) {
        const p = doc(db, "Patient", patientId);
        await updateDoc(p, {
            PendingDoctorId: pendingDoctorId
        });
    }

    async removePendingDoctor(patientId) {
        const p = doc(db, "Patient", patientId);
        await updateDoc(p, {
            PendingDoctorId: ""
        });
    }

}

export {PatientDB};