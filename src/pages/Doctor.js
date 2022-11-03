import {AdminDB} from "../DAL/AdminDB";
import {useEffect, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {DoctorDB} from "../DAL/DoctorDB";
import {QuestionDB} from "../DAL/QuestionDB";
import {forEach} from "react-bootstrap/ElementChildren";
import {PatientDB} from "../DAL/PatientDB";
import MyPage from "./MyPage";


export default function DoctorPage({currentUser}) {
    const navigate = useNavigate();
    let doctor = null;
    let [patients, setPatients] = useState([]);

    useEffect(() => {
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


    return(
        <div className={"DocDiv"}>
            <h2>Doctor page</h2>
            <h3>Patients</h3>
            <div className={"PatientList"}>
                {patients.map((p) => (
                    <div  key={p}>
                        <Link to={"/view"} className={"PatientDiv"}>
                        {p.firstName} {p.lastName} {p.id}</Link>
                    </div>
                    ))}
            </div>
        </div>
    );
}