//TODO create Admin page to create doctors 
// make link with Firestore to create Doctors
//TODO change the COefficients
//Get the Data from Firestore and update it
//TODO Admin Login -> authentication
import Navbar from "../components/Navbar";
import {doc, setDoc} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import React from "react";
import {useState} from "react";
import DoctorForm from "../components/DoctorForm";

export default function AdminDoctorCreation() {

    //    const resetNewDoctor = () => {
    //     this.setState({newDoctor : this.emptyDoctor});
    // };
    var created = false;

    const createDoctor = async (e, email, password, firstname, lastname) => {

        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async (user) => {
                await setDoc(doc(database, "users", user.uid), {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    role: 0
                });
            });

            //navigate("/");
            //succeeded = true;
            //console.log("Doctor Created")
            created = true;

            // resetNewDoctor();

        } catch (e) {
            console.error(e);
            //console.log("not Created")
        }

    }


    return (
        <>
            <DoctorForm handleSubmit={createDoctor} submitButtonLabel="Create Doctor"/>
        </>
    );

}
