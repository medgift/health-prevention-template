import React from "react";
import Navbar from "./Navbar";


function Survey (){
    return (
        <>
          <Navbar/>
      <div className="container center">
        <div className="container quiz">
        <h2 className="survey_title">[Survey name]</h2>
        </div>
      </div>
    </>
    )
}

export default Survey;