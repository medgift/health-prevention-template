import UserForm from "../components/UserForm";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth, database} from "../initFirebase";
import {useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";
import Navbar from "../components/Navbar";
import React, {useState} from "react";

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState();

    const handleRegister = async (e, email, password, firstname, lastname) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async (user) => {
                await setDoc(doc(database, "users", user.uid), {
                    firstname: firstname,
                    lastname: lastname,
                    mail: email,
                    password: password,
                    role: 1
                });
            });

            navigate("/");
        } catch (e) {
            switch (e.code) {
                case "auth/email-already-in-use":
                    setErrors("There already exists an account with the given email address.");
                    break;
                case "auth/weak-password":
                    setErrors("Password should be at least 6 characters.");
                    break;
                case "auth/invalid-email":
                    setErrors("The email address is not valid.")
                    break;
                case "auth/operation-not-allowed":
                    setErrors("Email/Password accounts are not enabled. Please contact the administrator")
                    break;
            }
        }
    };

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <h1>Register</h1>
                    <p className="error"> {errors}</p>
                    <UserForm handleSubmit={handleRegister} submitButtonLabel="Register"/>
                </div>
            </div>
        </>
    );
}
