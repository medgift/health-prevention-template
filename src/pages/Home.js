import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/lexend-deca";
import { NavbarNotLogged } from "./Navbar";
import Navbar from "./Navbar";
import results from "./img/results.png";
import my_avatar from "./img/avatar5.png";

export default function Home({ currentUser }) {
  return (
    <React.Fragment>
      {!currentUser ? <NavbarNotLogged /> : <Navbar />}
      <div className="container">
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
            <Link to="/survey">
              <button className="btn survey_btn">Take a survey</button>
            </Link>
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
            <h2 className="center hi">Hi, welcome back {currentUser.email}</h2>
            <Link to="/survey">
              <button className="btn survey_btn">Take a survey</button>
            </Link>
            <br />
            <br />
            <div className="container result1">
          <h2 className="quiz_title">[insert quiz title]</h2>
          <img className="my_avatar" src={my_avatar} />
        </div>

        <div className="container result2">
          <h2 className="quiz_title">[insert quiz title]</h2>
          <img className="my_avatar" src={my_avatar} />
        </div>

        <div className="container result3">
          <h2 className="quiz_title">[insert quiz title]</h2>
          <img className="my_avatar" src={my_avatar} />
        </div>
          </div>
        )}

      </div>
    </React.Fragment>
  );
}
