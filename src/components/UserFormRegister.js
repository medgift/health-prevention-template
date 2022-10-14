import {useState} from "react";
import styled from "styled-components";
import iconLogin from '../images/iconLogin.png'
import iconPassword from '../images/iconPassword.png'
import loginBackground from '../images/Login.jpg'
import '../App.css'

export default function UserFormRegister({handleSubmit, submitButtonLabel}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e, firstName, lastName, email, password);
            }}
        >
            <div className="divUserFormRegister">
                <input
                    type="text"
                    placeholder="Firstname"
                    value={firstName}
                    className="firstNameInputRegister"
                    onChange={handleFirstNameChange}
                    required
                />
            </div>
            <div className="divUserFormRegister">
                <input
                    type="text"
                    placeholder="Lastname"
                    value={lastName}
                    className="lastNameInputRegister"
                    onChange={handleLastNameChange}
                    required
                />
            </div>
            <div className="divUserFormRegister">
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="emailInputRegister"
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="divUserFormRegister">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="passwordInputRegister"
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button className="buttonSubmit" type="submit">{submitButtonLabel}</button>
        </form>
    );
}
