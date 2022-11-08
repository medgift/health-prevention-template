import {Link} from "react-router-dom";
import Login from "./Login";
import Questionnary from "./Questionnary";
import Navbar from "../components/Navbar";
import Welcome from "./Welcome";
import { auth } from "../initFirebase";
import { Context } from "../App.js"
import {useNavigate} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

export default function Home() {

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="form">
                    <div className="form-home">
                        <div>
                            <h1>Welcome</h1>
                            <p style={{marginBottom: "40px", textAlign: "justify"}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore
                                et dolore magna aliqua. At tellus at urna condimentum mattis. In vitae turpis massa sed
                                elementum
                                tempus egestas. Egestas congue quisque egestas diam in arcu. Vitae sapien pellentesque
                                habitant
                                morbi tristique senectus et netus. Penatibus et magnis dis parturient. Tellus mauris a
                                diam
                                maecenas
                                sed. Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Erat
                                velit
                                scelerisque in dictum. Suspendisse faucibus interdum posuere lorem ipsum. Accumsan lacus
                                vel
                                facilisis volutpat est velit egestas dui.
                            </p>
                            <Link to="/questionnary" className="Home-link">
                                Start the questionnary
                            </Link>
                        </div>
                        <img src={require('../health_home.webp')} style={{height: "400px"}}></img>
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
        </>*/
    );
}
