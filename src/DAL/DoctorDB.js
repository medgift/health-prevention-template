import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../initFirebase";
import {doctorConverter} from "../DTO/DoctorDTO";

class DoctorDB {
    async getDoctorById(doctorId) {
        const a = await getDoc(doc(db, "Doctor", doctorId).withConverter(doctorConverter));
        return a.data();
    }

    async getAllDoctors() {
        const doctors = await getDocs(collection(db, "Doctor").withConverter(doctorConverter));
        return doctors.docs.map(d => d);
    }

    async removePatientFromDoctor(doctorId, patientId) {
        await updateDoc(doc(db, "Doctor", doctorId), {Patients: arrayRemove(patientId)});
    }

    async addPatientToDoctor(doctorId, patientId) {
        await updateDoc(doc(db, "Doctor", doctorId), {Patients: arrayUnion(patientId)});

    }

    async getPatientsOfDoctor(docUid) {

    }
}

export {DoctorDB};
