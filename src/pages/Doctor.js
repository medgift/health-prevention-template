import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DoctorDB} from "../DAL/DoctorDB";
import {PatientDB} from "../DAL/PatientDB";
import {ResultHistoric} from "./MyPage";
import "../css/Doctor.css";

import {AvailableRoles, RoleContext} from "../Context/UserRoles";

export default function DoctorPage({currentUser, setBackgroundImage}) {
    const navigate = useNavigate();
    let doctor = null;
    let [patients, setPatients] = useState([]);
    let [pendingPatients, setPendingPatients] = useState([]);
    let [idSelectedPatient, setIdSelectedPatient] = useState(null);
    const userRoleContext = useContext(RoleContext);

    useEffect(() => {
        setBackgroundImage(null);
        //prohibit the access to non-doctor users
        if (userRoleContext.role !== AvailableRoles.DOCTOR)
            navigate("/");
        loadDoctor();

    }, []);

    async function loadDoctor() {
        //search for a doctor the db
        //if found, set the doctor variable
        doctor = await DoctorDB.prototype.getDoctorById(currentUser.uid);
        if (typeof doctor === "undefined") {
            navigate("/");
        }
        await loadPatients();
    }

    async function loadPatients() {
        //load the patients of the doctor
        //skip for if the doctor has no patients
        if (doctor.patients.length !== 0|| doctor.patients.length !== null || typeof doctor.patients.length !== "undefined") {
            for (let i = 0; i < doctor.patients.length; i++) {
                let p = await LoadOnePatient(doctor.patients[i]);
                setPatients((patients) => [...patients, p]);
            }
        }
        //load the pending patients of the doctor
        //skip for if the doctor has no pending patients
        if (doctor.pendingPatients.length !== 0|| doctor.pendingPatients.length !== null || typeof doctor.pendingPatients.length !== "undefined") {
            for (let i = 0; i < doctor.pendingPatients.length; i++) {
                let p = await LoadOnePatient(doctor.pendingPatients[i]);
                setPendingPatients((pendingPatients) => [...pendingPatients, p]);
            }
        }
        setIdSelectedPatient(doctor.patients[0]);
    }

    //To load a patient from the db
    async function LoadOnePatient(patientId) {
        let p = await PatientDB.prototype.getPatientById(patientId);
        p.id = patientId;
        return p;
    }

    const patientButtonPress = async (e) => {
        setIdSelectedPatient(e.target.value);
    }

    const acceptPatient= async (e) => {
        const patientId = e.target.value;

        //officially add the patient to the doctor's list
        await DoctorDB.prototype.addPatientToDoctor(currentUser.uid, patientId);
        await PatientDB.prototype.updatePatientDoctor(patientId, currentUser.uid);

        //remove the patient from the pending list
        await PatientDB.prototype.removePendingDoctor(patientId);
        await DoctorDB.prototype.removePendingPatientFromDoctor(currentUser.uid, patientId);

        //remove the patient from the state
        setPendingPatients(pendingPatients.filter(p => p.id !== patientId));

        //add the patient to the state
        let p = await LoadOnePatient(patientId);
        setPatients((patients) => [...patients, p]);
    }

    async function refusePatient(e) {
        const patientId = e.target.value;

        //remove the patient from the pending list
        await PatientDB.prototype.removePendingDoctor(patientId);
        await DoctorDB.prototype.removePendingPatientFromDoctor(currentUser.uid, patientId);

        //remove the patient from the state
        setPendingPatients(pendingPatients.filter(p => p.id !== patientId));
    }

    let patientRequests = pendingPatients.map((patient) => {
        return (
            <div key={patient.id} className={"patientRequestDiv"}>
                {patient.firstName} {patient.lastName} <div className={"PendingButtons"}> <button value={patient.id} onClick={acceptPatient} className={"PatientAccept"}>Accept</button> <button value={patient.id} onClick={refusePatient} className={"PatientRefuse"}>Refuse</button></div>
            </div>
        );
    });

    let newPatientRequests = (
        <div className={"PendingPatientDiv"}>
            <h4 className={"PatientListTitle"}>You have new patient requests:</h4>
            <div className={"PendingPatientList"}>
            {patientRequests}
            </div>
        </div>
    )


    return (
        <div className={"DocDiv"}>
            <h2>Welcome back, Doctor</h2>
            {pendingPatients.length > 0 ? newPatientRequests : null}
            <h3 className={"PatientListTitle"}>Your patients:</h3>
            <select className={"PatientList"} onChange={patientButtonPress}>
                {patients.map((p) => (
                    <option value={p.id} key={p} className={"patientButtonBody"}>
                        {p.firstName} {p.lastName}
                    </option>
                ))}
            </select>
            <ResultHistoric patientId={idSelectedPatient} setBackgroundImage={setBackgroundImage}/>
        </div>
    );
}