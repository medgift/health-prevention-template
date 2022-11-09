import {Link} from "react-router-dom";
import Login from "./Login";
import Questionnary from "./Questionnary";
import Navbar from "../components/Navbar";
import Welcome from "./Welcome";
import { auth } from "../initFirebase";
import { Context } from "../App.js"
import {useNavigate} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import setBodyColor from "../components/setBackground";

export default function Home() {

    setBodyColor({color1: "#0473D5", color2: "#7DB4E5"})

    return (<>
        <Navbar/>
        <div className="box">
            <div className="wrapper">
                <div className="form-home">
                    <div>
                        <h1>Welcome</h1>
                        <p style={{marginBottom: "40px", textAlign: "justify"}}>
                            To fill in the questionnaire you have to press the button below. If you are not logged in,
                            your data will not be saved. To log in, you can click on the "person icon" in the upper
                            right corner and a submenu will open where you can log in.
                        </p>
                        <Link to="/questionnary" className="Home-link">
                            Start the questionnary
                        </Link>
                    </div>
                    <img src={require('../health_home.webp')}></img>
                </div>
            </div>
        </div>
    </>
        /*
        <>
            {!currentUser ? (
                <>

                </>
            ) : (
                <>
                    <Navbar />
                    <div className="box">
                        <Questionnary />
                    </div>
                </>
            )}
        </>*/);
}
