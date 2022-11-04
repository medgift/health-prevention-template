import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import "../css/Login.css";
import UserForm from "../components/UserForm";
import simpleBlueBg from "./simple_blue_background.webp";
import {useEffect, useState} from "react";

export default function Login({setBackgroundImage}) {

    const [loginMessage, setLoginMessage] = useState("");

    useEffect(() => {
        setBackgroundImage(simpleBlueBg);
    }, []);

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            setLoginMessage("Incorrect email or password");
            console.error(e);
        }
    };

    return (
        <div className="padded_div login">
            <h2>Sign in</h2>
            <p id="loginValidation" className="inputValidation">{loginMessage}</p>
            <UserForm handleSubmit={handleLogin} submitButtonLabel="Confirm"/>
        </div>
    );
}
