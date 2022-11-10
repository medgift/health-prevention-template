import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../initFirebase";
import {BiUser} from 'react-icons/bi';
import {BiHomeAlt} from 'react-icons/bi';
import {RiSurveyLine} from 'react-icons/ri';

export default function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="App-link">
                    <BiHomeAlt/> Home
                </Link>
                <Link to="/questionnary" className="App-link">
                    <RiSurveyLine/> Survey
                </Link>
            </div>
            <div className="navbar-profile" style={{float: "right"}}>
                <button className="btn-profile">
                    <BiUser/>
                </button>
                <div className="dropdown-content">
                    {!auth.currentUser ? (
                        <Link to="/login" className="App-link">
                            Login
                        </Link>
                    ) : (
                        <>
                            <Link to="/Customization" className="App-link">
                                Custom Avatar
                            </Link>
                            <Link to="/UserProfilePage" className="App-link">
                                Profile
                            </Link>
                            <Link to="/logout" className="App-link">
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}