import UserForm from "../components/UserForm";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import {useNavigate} from "react-router-dom";
import {PatientDB} from "../DAL/PatientDB";
import {useState} from "react";

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    const handleRegister = async (e, email, password, firstName, lastName) => {
        e.preventDefault();

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
                        <p id={"passCheck"}>{password.length<6?"the password must have 6 characters":""}</p>
                </div>
                <div className={"input-group"} style={password.length<6?{marginTop:"7.2%"}:{marginTop:"15%"}}>
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
