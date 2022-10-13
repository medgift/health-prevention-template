import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/lexend-deca";
import   {NavbarNotLogged}  from "./Navbar";
import Navbar from "./Navbar";

import docs from "./img/docs.jpg";
export default function Home({ currentUser }) {
  return (
    <React.Fragment>
      {!currentUser ? (<NavbarNotLogged />): (<Navbar/>)}
      <div>
        <div className="container left">
          <img className="docs_pics" src={docs}></img>
        </div>
        <div className="container right">
          {!currentUser ? (
            <>
              <h2 className="center welcome">Welcome in HealthApp</h2>
              <p className="center text">
                Lorem ipsum fjdskfjsdkfjdskfjsdfjdskfjfjdksfjdskfjsdkfjsdk{" "}
                <br></br>
                fjdsskfjdskfjdskfjdskfjdskfjdsklfjdskfjdskfjdkfljdkfjdklfjdsl
                <br></br>
                fjkdfjdksfjdksfjdksfjdksfj
              </p>
              <br />
              <br />
              <Link to="/register" className="App-link">
                <button className="btn register_btn">Register</button>
              </Link>
              <span> </span>
              <Link to="/login" className="App-link">
                <button className=" btn login_btn">Login</button>
              </Link>
              <br />
            </>
          ) : (
            <div>
              <h2 className="center hi">Hi, {currentUser.email}</h2>
              <br/>
              <br/>
              <Link to="/logout" className="App-link">
              <button className=" btn login_btn">Logout</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
