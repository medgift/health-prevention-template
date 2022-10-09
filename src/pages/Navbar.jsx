import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';


export default function Navbar() {
  return (
    <Container>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/" style={{ textDecoration: 'none' }}>About</Link>
          </li>
          <li>
            <Link to="/cv" style={{ textDecoration: 'none' }}>Survey</Link>
          </li>
          <li>
            <Link to="/projects" style={{ textDecoration: 'none' }}>Documents</Link>
          </li>
          <li>
            <Link to="/designs" style={{ textDecoration: 'none' }}>Accounts</Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>

const Container = styled.div`
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    .navbar{
      padding-left: 30%;
      height: 55px;
      width: 100%;
      text-decoration: none !important;
      background-color: white;
      margin-bottom: 20px

    }

    .navbar ul li{
    display: inline;
    background-size: cover;
    background-blend-mode: darken;
    text-decoration: none !important;
    line-height: 55px;
    margin-left: 20px;
    font-size: 1rem;
    font-family: 'Arial Black','Arial Bold',Gadget,sans-serif;
    font-weight: 900;
    white-space: nowrap;
    -webkit-text-stroke: 0px #fff;
    -webkit-text-fill-color: #444;
    -webkit-transition: 0.5s;
    text-transform: uppercase;
    transition: 0.5s;
  }

  .navbar ul li:hover{
    -webkit-text-stroke: 1.3px #AC8E60;
    -webkit-text-fill-color: transparent;
    color: #444;
    text-transform: uppercase;
  }

  .icon{
    display: inline-block;
    font-size: 44px;
    animation: float 5s ease-in-out infinite;
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

