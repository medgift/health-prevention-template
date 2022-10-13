import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import logo from './img/logo.png';


export default function Navbar() {
  return (
    <Container>
      <div className="navbar">
            <Link to="/home">
              <img className="logo_app" src={logo}/>
            </Link>
        <ul>
          <li>
            <Link to="/home" style={{ textDecoration: 'none' }}>
             My Account</Link>
          </li>
          <li>
            <Link to="/registration" style={{ textDecoration: 'none' }}>Documents</Link>
          </li>
          <li>
            <Link to="/survey" style={{ textDecoration: 'none' }}>Survey</Link>
          </li>
          <li>
            <Link to="/home" style={{ textDecoration: 'none' }}>Home</Link>
          </li>
        </ul>
      </div>
    </Container>  
  ); 
}


const Container = styled.div`
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    .navbar{
      height: 60px;
      width: 100%;
      text-decoration: none !important;
      background-color: #fff;
      margin-bottom: 20px

    }

    .navbar ul li{
    float: right;
    display: inline;
    background-size: cover;
    background-blend-mode: darken;
    text-decoration: none !important;
    margin-top: 13px;
    line-height: 30px;
    padding: 0px 20px;
    background: linear-gradient(currentColor, currentColor) bottom / 0 .1em no-repeat;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 800;
    white-space: nowrap;
    -webkit-text-fill-color: #77C5A6;
    text-transform: uppercase;
    transition: 0.5s background-size;
  }

  .navbar ul li:hover{
    background-size: 75% .1em;
    color: #444;
    text-transform: uppercase;
  }


  .logo_app{
    padding-left: 10px;
    float:left;
    width:50px;
    margin-top:13px;
  }



  .ri-linkedin-circle-line{
    animation-delay: 1s;
  }

  .ri-outlook-line{
    animation-delay: 2s;
  }

  @keyframes float{
    0%{
      transform: translateY(0);
    }

    50%{
      transform: translateY(-15px);
    }

    100%{
      transform: translateY(0);
    }
  }

`;

