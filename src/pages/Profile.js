import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import NiceAvatar from "react-nice-avatar";
import {PatientDB} from "../DAL/PatientDB";

export default function Profile({currentUser}) {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);
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
        if (!currentUser) {
            navigate("/login");
            return;


        }
        getPatient();


    }, []);

    async function save() {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        await PatientDB.prototype.updatePatientName(currentUser.uid, firstName, lastName);
        alert("Profile saved!")

    }


    return (
        <div className={"padded_div avatarDiv"}>
            <h2>Profile</h2>
            <NiceAvatar id="avatar" shape={"rounded"}
                        style={{width: '10rem', height: '10rem'}} {...user?.avatarConfig || (defaultConfig)}/>
            <br/>
            <NavLink className={"homeGridButton"} to={"/editAvatar"}>Edit your avatar</NavLink>
            <div style={{marginBottom: "30px"}}/>
            <div className={"grid_2col"}>
                <label>Firstname</label>
                <input id={"firstName"} type="text" defaultValue={user?.firstName}/>
                <label>Lastname</label>
                <input id={"lastName"} type="text" defaultValue={user?.lastName}/>
            </div>
            <div style={{marginBottom: "20px"}}/>
            <button className={"homeGridButton"} onClick={save}>Save</button>
        </div>
    )

    async function getPatient() {
        const pat = await PatientDB.prototype.getPatientById(currentUser.uid).then();
        console.log(pat);
        setUser(pat);

    }


}