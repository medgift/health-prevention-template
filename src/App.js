import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {db} from "./initFirebase";
import { collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import { useEffect, useState, Component} from "react";
import Logout from "./pages/Logout";
import * as PropTypes from "prop-types";
//import firebase from "firebase/compat";
//import firestore from "firebase/Firestore";

export default function App() {
    /* Current user state */
    const [currentUser, setCurrentUser] = useState(undefined);

    /* Watch for authentication state changes */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User is", user);
            setCurrentUser(user);
        });

        // Unsubscribe from changes when App is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    if (currentUser === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Loading...</h1>
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<Home currentUser={currentUser}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
                <h1>Questionnaire 1</h1>
                <QuestionList/>
            </header>
        </div>
    );
}

class Question extends React.Component {

    render() {

        let formattedQuestion;
        if (this.props.inputType === "ToggleSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type ="range"
                       min ={0}
                       max ={this.props.choices.length-1}
                       step ="1"
                       list ="bite"/>
            );
        }
        return (
            <>
                <datalist id="bite">
                    {this.props.choices.map((choice) => (
                        <option value={choice}/>
                    ))}
                </datalist>
                <p>{this.props.question}</p>
                {formattedQuestion}
            </>
        );
    }


};

//Replace state with props after tests-----------------------------------------
function QuestionList (){

    //Test Questions--------------------------------
   const questions = [{choices:[0,1], DefaultValue:0, inputType:"ToggleSlider", NormalValue:0, QuestionNo:1, Text:"Question 1", VariableName:"var1"},
                {choices:["left","middle","right"], DefaultValue:-1, inputType:"ToggleSlider", NormalValue:0, QuestionNo:2, Text:"Question 2", VariableName:"var2"}];
    //Test Questions--------------------------------




    //FormSubmission


    //FormInput Change handler


    return  (
        <form>
            <ul>
            {questions.map((question,index) => (
                <li key={index}>
                    <Question {...question}/>
                    <br/>
                    <br/>
                </li>
            ))}
            </ul>
            <button type="submit">Confirmer</button>
        </form>
    );
}


async function GetQuestion (questionnaireNo) {
    const q = query(collection(db, "Question"), where("QuestionnaireNO", "==", questionnaireNo));
    const querySnapshot = await getDocs(q);
    let questions = [];
    querySnapshot.forEach((doc) => {
        questions = [doc, ...questions]
    });
    for (const q of questions) {
       console.log(q.get("Text"));
    }
}
