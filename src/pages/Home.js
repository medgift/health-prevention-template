import React from "react";
import { Link } from "react-router-dom";
import { db } from "../initFirebase";
import {collection, getDocs} from "firebase/firestore"
import { async } from "@firebase/util";
import app from "../initFirebase";
import { getUsers } from "../initFirebase";
export default function Home({ currentUser }) {

  const result = getUsers();

  console.log("Result : " ,result);
  return (
   <React.Fragment>
     <div>
      <h1>Welcome to the Health Prevention Questionnaire</h1>
      {!currentUser ? (
        <>
          <Link to="/register" className="App-link">
            Register
          </Link>
          <span> / </span>
          <Link to="/login" className="App-link">
            Login
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
