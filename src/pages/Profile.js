import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import NiceAvatar from "react-nice-avatar";
import {PatientDB} from "../DAL/PatientDB";
import {DoctorDB} from "../DAL/DoctorDB";


export default function Profile({currentUser, setBackgroundImage}) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
    const [doctors, setDoctors] = React.useState([]);
    const defaultConfig = {
        "sex": "man",
        "faceColor": "#f5d6a1",
        "earSize": "small",
        "eyeStyle": "circle",
        "noseStyle": "short",
        "mouthStyle": "laugh",
        "shirtStyle": "hoody",
        "glassesStyle": "none",
        "hairColor": "#000000",
        "hairStyle": "normal",
        "hatStyle": "none",
        "hatColor": "#000000",
        "eyeBrowStyle": "up",
        "shirtColor": "#000000",
        "bgColor": "white",
    };

    useEffect(() => {
        setBackgroundImage(null);
        if (!currentUser) {
            navigate("/login");
            return;


        }
        getPatient();
        getDoctors();


    }, []);

    async function save() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        await PatientDB.prototype.updatePatientName(currentUser.uid, firstName, lastName);
        alert("Profile saved!")

    }

    const handleChange = (e) => {
        const doctorId = document.getElementById("selectDoctor").value;
        setUser({...user, ["doctorId"]: doctorId});
    }


    return (
        <div className={"padded_div avatarDiv"}>
            <h2>Profile</h2>
            <NiceAvatar id="avatar" shape={"rounded"}
                        style={{width: '10rem', height: '10rem'}} {...user?.avatarConfig || (defaultConfig)}/>
            <br/>
            <NavLink className={"homeGridButton"} to={"/editAvatar"}>Edit your avatar</NavLink>
            <div style={{marginBottom: "20px"}}/>
            <hr/>
            <div style={{marginBottom: "30px"}}/>
            <div className={"grid_2col"}>
                <label>Firstname</label>
                <input id={"firstName"} type="text" defaultValue={user?.firstName}/>
                <label>Lastname</label>
                <input id={"lastName"} type="text" defaultValue={user?.lastName}/>
            </div>
            <div style={{marginBottom: "30px"}}/>
            <button className={"homeGridButton"} onClick={save}>Save</button>
            <hr/>
            <div style={{marginBottom: "30px"}}/>
            <div className={"grid_2col"}>
                <label>Change/Choose Doctor</label>
                <select id={"selectDoctor"} value={user?.doctorId} onChange={handleChange}>
                    <option value={"none"}>None</option>
                    {optionsDoctors()}
                </select>
            </div>
            {user?.pendingDoctorId!=="" && user?.pendingDoctorId!==null && user?.pendingDoctorId!== undefined?
                <div className={"PendingMessage"}>Your request has been registered</div> : null}
            <button className={"homeGridButton"} onClick={submitDoctor}>Submit Request</button>
        </div>
    )

    async function getPatient() {
        const pat = await PatientDB.prototype.getPatientById(currentUser.uid);
        console.log(pat);
        pat.prevDoctor = pat.doctorId;
        setUser(pat);

    }

    async function getDoctors() {
        const docs = await DoctorDB.prototype.getAllDoctors();
        setDoctors(docs);

    }

    async function submitDoctor() {
        const doctorId = document.getElementById("selectDoctor").value;
        if (doctorId === "none") {
            await PatientDB.prototype.updatePatientDoctor(currentUser.uid, null);
            await PatientDB.prototype.removePendingDoctor(currentUser.uid);
            if (user?.prevDoctor != null) {
                await DoctorDB.prototype.removePatientFromDoctor(user.prevDoctor, currentUser.uid);
                alert("Doctor removed!");
            }
            setUser({...user, ["prevDoctor"]: null});
        } else {
            await PatientDB.prototype.updatePendingDoctor(currentUser.uid, doctorId);
            await DoctorDB.prototype.addPendingPatientToDoctor(doctorId, currentUser.uid);
            setUser({...user, ["prevDoctor"]: doctorId});
            alert("Doctor changed!");
        }
        navigate("/profile")
        //Cheat trick to refresh page because state don't like to be re-updated after being set a null value

    }

    function optionsDoctors() {
        let options = [];
        for (const doct of doctors) {
            const d = doct.data();
            let text = "Dr. " + d.firstName + " " + d.lastName;
            options.push(<option value={doct.id}>{text}</option>)
            console.log(d);
        }
        return options;

    }


}