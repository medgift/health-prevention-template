import Algorithm from "./Algorithm";
import "firebase/firestore"
import { database } from '../initFirebase.js';
import { collection, getDocs } from "firebase/firestore"; 
import {doc, setDoc} from "firebase/firestore"
import { render } from "@testing-library/react";
import React from "react";
import Users from "../components/Users";

export default class Info extends React.Component {

  resultAlgo = new Algorithm(0,70,0,110,3.5,1.9,1,0,28,3,3,2,0,5,0,0)
  emptyUser = {firstname : "", lastname: "", mail: "", password: "", role: ""}

  constructor(){
    super()
    this.state = {
      newUser : this.emptyUser,
      users: [
        {
          firstname : "Bonjours", 
        lastname: "Buenos Dias", 
        mail: "fddfdfdf", 
        password: "fdfdfdf", 
        role: "fdfdfd"}
      ]
    };
    this.handleCkick = this.handleCkick.bind(this);
  }

//  try {
//   await setDoc(doc(database, "users","hugo"), {
//    firstname: "h",
//    lastname: "h",
//    mail: "h",
//    password: "h",
//    role: "w"
//   });
//  }catch (e) {
//   console.log(e)
//  }

async getData(){

  
  const querySnapshot = await getDocs(collection(database, "users"));

  querySnapshot.forEach((doc) => {

    let myUser = new Users();

    // this.state.newUser.firstname = doc.data().firstname;
    // this.state.newUser.lastname = doc.data().lastname;
    // this.state.newUser.mail = doc.data().mail;
    // this.state.newUser.password = doc.data().password;
    // this.state.newUser.role = doc.data().role;


    myUser.firstname = doc.data().firstname;
    myUser.lastname = doc.data().lastname;
    myUser.mail = doc.data().mail;
    myUser.password = doc.data().password;
    myUser.role = doc.data().role;

    console.log("new user " + myUser.firstname)

      this.setState((prevState) => ({
        users: [myUser, ...prevState.users],
        
      }));

    // this.setState((prevState) => ({
    //   users: [this.state.newUser, ...prevState.users],
    // }));

    this.resetNewUser();

  console.log(`${doc.id} => ${doc.data().firstname} => ${doc.data().lastname} => ${doc.data().mail} => ${doc.data().password} => ${doc.data().role}`);
  });

  
}

resetNewUser = () => {
  this.setState({ newUser: this.emptyUser });
};

handleCkick = () =>{
  this.getData();

}

render() {

  return <div><h1>{this.resultAlgo.resultInfarctus} % of infarctus</h1>
    <h1>{this.resultAlgo.resultNonInfarctus} % of non infarcuts</h1>
    <h1>{this.resultAlgo.resultCancer} % of Cancer</h1>
    <h1>{this.resultAlgo.resultDiabete} % of diabete</h1>

    <button onClick={this.handleCkick}></button>

   <ul>{this.state.users.map((user, index) => (
           <li key={index}>
             <Users {...user}></Users>
           </li>
         ))}</ul> 

  </div>;


  };
};
