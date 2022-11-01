import Navbar from "../components/Navbar";
import React, { useState } from "react";
import AdminCoef from "./AdminCoef";
import AdminDoctorCreation from "./AdminDoctorCreation";
import AdminVarTest from "./AdminVarTest";

export default function AdminPage()  {
     
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
            <Navbar/>
            <h1>Welcome Admin !!</h1>
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
