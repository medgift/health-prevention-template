//TODO create Admin page to create doctors 
// make link with Firestore to create Doctors


//TODO change the COefficients
//Get the Data from Firestore and update it


//TODO Admin Login -> authentication

import {doc, setDoc} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import React from "react";
import Users from "../components/Users";

export default class AdminPage extends React.Component{s

    newDoctor;

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.newDoctor = new Users(this.props,"Dr. Hugo", "Vouillamoz", "drhugo@test.ch", "password", 2);
        
    }

    async CreateDoctor() {
        try {
            //await createUserWithEmailAndPassword(auth, this.newDoctor.mail, this.newDoctor.password);
            await setDoc(doc(database, "users/"+ auth ),{
                firstname : this.newDoctor.firstname,
                lastname : this.newDoctor.lastname,
                mail : this.newDoctor.mail,
                password : this.newDoctor.password,
                role : this.newDoctor.role

            });
            console.log("Doctor Created")
        } catch (e) {
            console.log(e)
            console.log("c'esst pas créééééé")
        }
    }

    handleClick = () => {
        this.CreateDoctor();
    }

    render() {
        return (
            <>
                <h1>Welcome Admin !!</h1>
                <h2>Create Doctor : </h2>
                <button onClick={this.handleClick}></button>
            </>
        )
    }

}