import React from "react";
import { Link } from "react-router-dom";
import { db } from "../initFirebase";
import {collection, getDocs} from "firebase/firestore"
import { async } from "@firebase/util";
import app from "../initFirebase";
import { getUsers } from "../initFirebase";
import logo from "../pages/img/logo.png"
export default function Home({ currentUser }) {

  const result = getUsers();

  console.log("Result : " ,result);
  return (
   <React.Fragment>
     <div>
      <img className="logo" src={logo}></img>
      <h1 className="app_title">HealthApp</h1>
      <h1 className="welcome">Welcome to the Health Prevention Questionnaire</h1>
      {!currentUser ? (
        <>
          <Link to="/register" className="App-link">
            <button className="btn register_btn">Register</button>
          </Link>
          <span> </span>
          <Link to="/login" className="App-link">
          <button className=" btn login_btn">Login</button>
          </Link>
        </>
      ) : (
        <Link to="/logout" className="App-link">
          Logout
        </Link>
      )}
    
    </div>
   </React.Fragment>
  );
}
