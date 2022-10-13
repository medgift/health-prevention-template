import React from "react";
import {Link} from "react-router-dom";
import logo from "../images/Logo.png"
import styled from "styled-components";

export default function Navbar() {
    return (
        <Container>
            <div className="navbar">
                <Link to="/home">
                    <img className="logo_app" src={logo}/>
                </Link>
                <ul>
                    <li>
                        <Link className="links" to="/survey" style={{textDecoration: 'none'}}>Take a Survey</Link>
                    </li>
                    <li>
                        <Link className="links" to="/account" style={{textDecoration: 'none'}}>My profile</Link>
                    </li>
                    <li>
                        <Link className="links" to="/register" style={{textDecoration: 'none'}}>Register</Link>
                    </li>
                    <li>
                        <Link className="links" to="/login" style={{textDecoration: 'none'}}>Login</Link>
                    </li>
                    <li>
                        <Link className="links" to="/home" style={{textDecoration: 'none'}}>Home</Link>
                    </li>
                </ul>
            </div>
        </Container>
    );
}


const Container = styled.div`
  padding: 0;
  margin: 0;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  text-decoration: none;
  
  .logo_app {
    width: 60%;
    float: left;
  }

  .navbar {
    width: 100%;
    height:60px;
    display: flex;
    align-items: center;
    padding: 0.5rem 0rem;
  }
  
  .navbar ul {
    list-style-type: none;
    margin-left: 15%;
  }
  
  .navbar ul li {
    display: inline;
    float:right;
    padding-right: 30px;
  }
  
  .links {
    float: right;
    color: #8DC6FF;
    padding: 10px;
    font-weight: bold;
  }
  
  .links:hover {
    color: white;
    padding: 10px;
    background: #8DC6FF;
    text-underline: #8DC6FF;
  }
  
  
`;