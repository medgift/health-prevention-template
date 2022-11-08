import React from "react";
import {Link} from "react-router-dom";

export default function NavbarAdmin() {

    return (
        <nav className="navbar">
            <div className="navbar-links" style={{float: "right"}}>
                <Link to="/" className="App-link">
                    Back
                </Link>
            </div>
        </nav>
    );

}