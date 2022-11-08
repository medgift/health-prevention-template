import Navbar from "../components/Navbar";
import React, { useContext, useEffect, useState } from "react";
import AdminCoef from "./AdminCoef";
import AdminDoctorCreation from "./AdminDoctorCreation";
import AdminVarTest from "./AdminVarTest";
import { auth } from "../initFirebase";
import { Context } from "../App.js"
import {useNavigate} from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";


export default function AdminPage()  {
    const navigate = useNavigate();
    const role = useContext(Context);
    console.log("role dans l'admin " + role.role)

    useEffect(() => {
        if (role.role !== 8) {
            navigate("/")
        } 
    }, []);

    const [isShown, setIsShown] = useState(false);
    const [isShownVar, setIsShownVar] = useState(false);
    const [isShownCoef, setIsShownCoef] = useState(false);

    const handleClickDoc = event => {
        setIsShown(current => !current);
        setIsShownCoef(false);
        setIsShownVar(false);
    }

    const handleClickVar = event => {
        setIsShownVar(current => !current);
        setIsShownCoef(false); 
        setIsShown(false);
    }

    const handleClickCoef = event => {
        setIsShownCoef(current => !current);
        setIsShown(false);
        setIsShownVar(false);
    }


    return (
        <>
            <NavbarAdmin/>
            <h1>Welcome Back Admin !!</h1>
            <button onClick={handleClickDoc}>Create Doctor</button>
            {
                isShown && 
                (<>
                <hr/>
                    <AdminDoctorCreation/>
                <hr/>
                </>
                )
            }
            <hr/>
            <button onClick={handleClickVar}>Change Variables</button>
            {
                 
                isShownVar && (
                <>
                <hr/>
                    <AdminVarTest/>
                <hr/>
                </>
                )
                
            }
            <hr/>
            <button onClick={handleClickCoef}>Change coefficient</button>
            {
                isShownCoef && (
                <>
                <hr/>
                    <AdminCoef/>
                <hr/>
                </>
                )
            }
        </>
    );
    
}
