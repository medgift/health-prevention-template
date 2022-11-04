import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DoctorDB} from "../DAL/DoctorDB";
import {PatientDB} from "../DAL/PatientDB";
import MyPage from "./MyPage";


export default function DoctorPage({currentUser}) {
    const navigate = useNavigate();
    let doctor = null;
    let [patients, setPatients] = useState([]);
    let [idSelectedPatient, setIdSelectedPatient] = useState(null);

    useEffect(() => {
        //prohibit the access to non-doctor users
        isADoctorConnected();
    }, []);

    async function isADoctorConnected() {
        if (!currentUser) {
            navigate("/");
            return;
        }
        //search for a doctor the db
        //if found, set the doctor variable
        doctor = await DoctorDB.prototype.getDoctorById(currentUser.uid);
        if (typeof doctor === "undefined") {
            navigate("/");
        }
        console.log("doctor is:")
        console.log(doctor);

        await loadPatients();
    }

    async function loadPatients() {
        console.log("Loading patients")
        for (let i = 0; i < doctor.patients.length; i++) {
            let p = await PatientDB.prototype.getPatientById(doctor.patients[i]);
            p.id = doctor.patients[i];
            setPatients((patients) => [...patients, p]);
        }
    }

    //TODO: boutton pour changer de patient (idpatient)
    function patientButtonPress(idPatient) {
        console.log("Patient button pressed: " + idPatient);
        setIdSelectedPatient(idPatient);
        console.log("idSelectedPatient: " + idSelectedPatient);
    }

    return (
        <div className={"DocDiv"}>
            <h2>Doctor page</h2>
            <h3>Patients</h3>
            <div className={"PatientList"}>
                {patients.map((p) => (
                    <div key={p}>
                        <button to={"/view"} className={"PatientButton"} onClick={(e) => patientButtonPress(p.id)}>
                            {p.firstName} {p.lastName} {p.id}</button>
                    </div>
                ))}
            </div>
            {idSelectedPatient !== null && <MyPage idPatient={idSelectedPatient}/>}
        </div>

    );
}