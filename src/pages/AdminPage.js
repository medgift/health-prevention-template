import Navbar from "../components/Navbar";
import React, {useContext, useEffect, useState} from "react";
import AdminCoef from "./AdminCoef";
import AdminDoctorCreation from "./AdminDoctorCreation";
import AdminVarTest from "./AdminVarTest";
import {Context} from "../App.js"
import {useNavigate} from "react-router-dom";
import setBodyColor from "../components/setBackground";
import NavbarAdmin from "../components/NavbarAdmin";


export default function AdminPage() {
    const navigate = useNavigate();
    const role = useContext(Context);
    console.log("role dans l'admin " + role.role)

    setBodyColor({color1: "#04d515", color2: "#cee57d"})

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
            <div className="box">
                <div className="wrapper">
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
                </div>
            </div>
        </>
    );

}
