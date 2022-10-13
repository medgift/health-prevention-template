import React from "react";
import docs from "./img/docs.jpg";
import Navbar from "./Navbar";
import styled from "styled-components";
import my_avatar from "./img/avatar5.png";

function Results() {
  return (
    <>
      <Navbar />
      <div className="container quiz1">
        <img className="my_avatar" src={my_avatar} />
      </div>

      <div className="container quiz2">
        <img className="my_avatar" src={my_avatar} />
      </div>

      <div className="container quiz3">
        <img className="my_avatar" src={my_avatar} />
      </div>
    </>
  );
}

export default Results;

// const Container2 = styled.div`

// .container {
//   margin-left: auto;
//   margin-right: auto;
//   height: 100%;
//   width: 100%;
//   position: fixed;
//   z-index: 1;
//   top: 10%;
//   overflow-x: hidden;
// }

// .my_avatar{
//   height:100px;
//   width:100px;
// }

// .left {
//   width: 33%;
//   left: 0;
//   background-color: pink;
// }

// .right {
//   width: 33%;
//   right: -15px;
//   background-color: #BBF3DD;
//   transform: translateZ(0);
//   z-index: -1;
// }

// .middle {
//   width: 33%;
//   align-items: center;
//   color: blueviolet;

// }

// /* .quiz3{
//     right:0;
//     width: 33%;
//     background-color:blueviolet;
// } */

// `
