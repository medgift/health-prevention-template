import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import "../css/Login.css";
import UserForm from "../components/UserForm";
import simpleBlueBg from "./simple_blue_background.webp";
import {useEffect} from "react";

export default function Login({setBackgroundImage}) {
    useEffect(()=> {
        setBackgroundImage(simpleBlueBg);
    }, []);

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e);
            alert(e);
        }
    };

    return (
        <div className="padded_div login">
            <h2>Sign in</h2>
            <UserForm handleSubmit={handleLogin} submitButtonLabel="Confirm"/>
        </div>
    );
}
