import Algorithm from "./Algorithm";
import "firebase/firestore"
import { database } from '../initFirebase.js';
import { collection, getDocs, query, where } from "firebase/firestore"; 
//import {doc, getDoc, setDoc} from "firebase/firestore"
import React from "react";
import Users from "../components/Users";
import Data from "../components/Data";


//TODO Clean Info Page 
//TODO Create Doctor Page 
//TODO Create Admin page that creates doctors 

export default class Info extends React.Component {

  resultAlgo = new Algorithm(0,70,0,110,3.5,1.9,1,0,28,3,3,2,0,5,0,0)
  emptyUser = {firstname : "", lastname: "", mail: "", password: "", role: ""}
  emptyData = {afcancer : "", afinfo:"", age: "", alcool:"", avc:"", date:"", diab:"", diet:"", glyc:"", hdl:"", height:"", inf:"",  sex:"", smoking:"", sport:"", syst:"", weight:""}

  

  constructor(){
    super()
    this.state = {
      id : "2",
      newUser : this.emptyUser,
      newData : this.emptyData,
      data: [
        { afcancer : "", afinfo:"", age: "", alcool:"", avc:"", date:"", diab:"", diet:"", glyc:"", hdl:"", height:"", inf:"",  sex:"", smoking:"", sport:"", syst:"", weight:""}
        
      ],
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


//Method to Get the History Of The User connected
async getAllResultsFromUser(){


  const q = query(collection(database, "answers/"+ this.state.id +"/data"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {

    let myData = new Data();
    myData.afcancer = doc.data().afcancer;
    myData.afinf = doc.data().afinf;
    myData.age = doc.data().age;
    myData.alcool = doc.data().alcool;
    myData.avc = doc.data().avc;
    myData.date = doc.data().date;
    myData.diab = doc.data().diab;
    myData.glyc = doc.data().glyc;
    myData.hdl = doc.data().hdl;
    myData.height = doc.data().height;
    myData.inf = doc.data().inf;
    myData.sex = doc.data().sex;
    myData.smoking = doc.data().smoking;
    myData.sport = doc.data().sport;
    myData.syst = doc.data().syst;
    myData.weight = doc.data().weight;


  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());

  this.setState((prevState) => ({
    data: [myData, ...prevState.data],
    
  }));

  this.resetNewData();

});


}

//Method to getAllUsers
async getData(){

  
  const querySnapshot = await getDocs(collection(database, "users"));

  querySnapshot.forEach((doc) => {

    let myUser = new Users();

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

resetNewData = () => {
  this.setState({ newData: this.emptyData });
};

handleCkick = () =>{
  this.getData();
  this.getAllResultsFromUser();

}

render() {

  return <div><h1>{this.resultAlgo.resultInfarctus} % of infarctus</h1>
    <h1>{this.resultAlgo.resultNonInfarctus} % of non infarcuts</h1>
    <h1>{this.resultAlgo.resultCancer} % of Cancer</h1>
    <h1>{this.resultAlgo.resultDiabete} % of diabete</h1>

    <button onClick={this.handleCkick}></button>

    <ul>{this.state.data.map((data, index) => (
      <li key={index}>
        <Data {...data}></Data>
      </li>
    ))}</ul>


   <ul>{this.state.users.map((user, index) => (
           <li key={index}>
             <Users {...user}></Users>
           </li>
         ))}</ul> 

  </div>;


  };
};
