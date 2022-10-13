import React from "react";
import docs from "./img/docs.jpg";
import "./pages.css"
import Navbar from "./Navbar";

function Home() {
  return (
    <>
        <Navbar/>
      <div className="container left">
        <img className="docs_pics" src={docs}></img>
      </div>

      <div className="container right">
        <h2 className="center hi">Hi, [Username]</h2>
        <h2 className="center welcome">Welcome in HealthApp</h2>
        <p className="center text">Lorem ipsum fjdskfjsdkfjdskfjsdfjdskfjfjdksfjdskfjsdkfjsdk <br></br>
        fjdsskfjdskfjdskfjdskfjdskfjdsklfjdskfjdskfjdkfljdkfjdklfjdsl<br></br>
        fjkdfjdksfjdksfjdksfjdksfj</p>
      </div>
    </>
  );
}

export default Home;
