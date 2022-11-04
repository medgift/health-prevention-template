import {AdminDB} from "../DAL/AdminDB";
import {useEffect, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {DoctorDB} from "../DAL/DoctorDB";
import {QuestionDB} from "../DAL/QuestionDB";
import {forEach} from "react-bootstrap/ElementChildren";
import {PatientDB} from "../DAL/PatientDB";
import MyPage from "./MyPage";
import "../css/DocPage.css";


export default function DoctorPage({currentUser, setBackgroundImage}) {
    const navigate = useNavigate();
    let doctor = null;
    let [patients, setPatients] = useState([]);
    let [idSelectedPatient, setIdSelectedPatient] = useState(null);

    useEffect(() => {
        setBackgroundImage(null);
        //prohibit the access to non-doctor users
        isADoctorConnected();
    },[]);

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
        for(let i = 0; i < doctor.patients.length; i++) {
            let p = await PatientDB.prototype.getPatientById(doctor.patients[i]);
            p.id = doctor.patients[i];
            setPatients((patients) => [...patients, p]);
        }
    }

    function patientButtonPress (idPatient) {
        setIdSelectedPatient(idPatient);
    }

    return(
        <div className={"DocDiv"}>
            <h2>Welcome back, Doctor</h2>
            <h3>Patients</h3>
            <td className={"PatientList"}>
                {patients.map((p) => (
                    <tbody  key={p} className={"patientButtonBody"}>
                        <button to={"/view"} className={"PatientButton"} onClick={(e) => patientButtonPress(p.id)}>
                        {p.firstName} {p.lastName}</button>
                    </tbody>
                    ))}
            </td>
            {idSelectedPatient !== null && <MyPage idPatient={idSelectedPatient} setBackgroundImage={setBackgroundImage}/>}
        </div>

    );
}