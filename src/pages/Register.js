import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import "../css/Register.css";
import {useNavigate} from "react-router-dom";
import {PatientDB} from "../DAL/PatientDB";
import {useEffect, useState} from "react";
import simpleBlueBg from "./simple_blue_background.webp";

export default function Register({setBackgroundImage}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        validatePassword(e.target.value);
        setPassword(e.target.value);
    }
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    useEffect(() => {
        setBackgroundImage(simpleBlueBg);
    }, []);

    function validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailMessage("");
            return true;
        } else {
            setEmailMessage("Invalid mail address.");
            return false;
        }
    }

    function validatePassword(password) {
        if (password.length >= 6) {
            setPasswordMessage("");
            return true;
        } else {
            setPasswordMessage("The password must have 6 characters.");
            return false;
        }
    }

    const handleRegister = async (e, email, password, firstName, lastName) => {
        e.preventDefault();

        //register is aborted if the mail or password doesn't comply with the app rules
        if (!validateEmail(email) || !validatePassword(password))
            return;

        try {
            //create user in auth section
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            //create a patient account, using auth generated id
            let patient = {"FirstName": firstName, "LastName": lastName};
            PatientDB.prototype.addPatient(userCredential.user.uid, patient);
            navigate("/home");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="padded_div register ">
            <div>
                <h3>Create a patient account to save your data !</h3>
                <p className="disclaimer">*Only patients can save their answers and custom avatar.</p>
            </div>
            <form
                onSubmit={(e) => {
                    handleRegister(e, email, password, firstName, lastName);
                }}
            >
                <div className={"input-group"}>
                    <input className="formInput"
                           type="text"
                           value={email}
                           onChange={handleEmailChange}
                           required
                    />
                    <label for={"email"} class={"input-label"}>Email address</label>
                    <p className="inputValidation">{emailMessage}</p>
                </div>
                <br/>
                <div className={"input-group"}>
                    <input className="formInput"
                           type="password"
                           value={password}
                           onChange={handlePasswordChange}
                           required
                    />
                    <label for={"password"} class={"input-label"}>Password</label>
                    <p className="inputValidation">{passwordMessage}</p>
                </div>
                <div className={"input-group"} style={password.length < 6 ? {marginTop: "7.2%"} : {marginTop: "15%"}}>
                    <input className="formInput"
                           type="First name"
                           value={firstName}
                           onChange={handleFirstNameChange}
                           required
                    />
                    <label for={"firstName"} class={"input-label"}>First Name</label>
                </div>
                <br/>
                <div className={"input-group"}>
                    <input className="formInput"
                           type="Last name"
                           value={lastName}
                           onChange={handleLastNameChange}
                           required
                    />
                    <label for={"lastName"} class={"input-label"}>Last Name</label>
                </div>
                <br/>
                <button
                    type="submit"
                    className="formButton animatedButton"
                >Register
                </button>
            </form>
        </div>
    );
}
