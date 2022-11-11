import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../initFirebase";
import {BiUser} from "react-icons/bi";

export default function NavbarAdmin() {

    return (
        <nav className="navbar">
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