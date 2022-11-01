import React from "react";
import { useState } from "react";

export default function DoctorForm( {handleSubmit, submitButtonLabel}) {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstnameChange = (e) => setFirstname(e.target.value);
    const handleLastnameChange = (e) => setLastname(e.target.value);

    const cleanData = (e) => {
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
    }

    return (
        <>
            <h2>Health Doctor Creation</h2>
            <form onSubmit={(e) => {
                handleSubmit(e, email, password, firstname, lastname)
                cleanData()
                alert("doctor : " + lastname + " has been created")
            }}
            >
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
                <br />
                <br />
                <input
                    type="text"
                    placeholder="first name"
                    value={firstname}
                    onChange={handleFirstnameChange}
                    required
                />
                <br />
                <input
                    type="text"
                    placeholder="last Name"
                    value={lastname}
                    onChange={handleLastnameChange}
                    required
                />
                <br />
                <button type="submit">{submitButtonLabel}</button>
                
            </form>
        </>
    );
}


    