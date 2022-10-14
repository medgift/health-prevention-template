import {useState} from "react";
import styled from "styled-components";
import iconLogin from '../images/iconLogin.png'
import iconPassword from '../images/iconPassword.png'
import loginBackground from '../images/Login.jpg'
import '../App.css'

export default function UserFormLogin({handleSubmit, submitButtonLabel}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <form
            onSubmit={(e) => {
                handleSubmit(e, email, password);
            }}
        >
            <div className="divUserFormLogin">
                <img src={iconLogin} style={{width: "10%"}}/>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className="emailInputLogin"
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="divUserFormLogin">
                <img src={iconPassword} style={{width: "10%"}}/>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className="passwordInputLogin"
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button className="buttonSubmitLogin" type="submit">{submitButtonLabel}</button>
        </form>
    );
}
