import React from "react";
import Navbar from "./Navbar";


function Settings (){
    return (
        <>
          <Navbar/>
      <div className="container center">
        <div className="container variables">
        <h2 className="survey_title">[Survey name]</h2>
        </div>
      </div>
    </>
    )
}

export default Settings;