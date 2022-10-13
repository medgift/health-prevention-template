import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {db} from "./initFirebase";
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import {useEffect, useState, Component} from "react";
import Logout from "./pages/Logout";
import * as PropTypes from "prop-types";
//import firebase from "firebase/compat";
//import firestore from "firebase/Firestore";

export default function App() {
    /* Current user state */
    const [currentUser, setCurrentUser] = useState(undefined)

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
                <QuestionList/>
            </header>
        </div>
    );
}

class Question extends React.Component {

    render() {
        let formattedQuestion;
        //For inputs of type RadioSlider and NumericSlider
        if (this.props.InputType === "RadioSlider" || this.props.InputType === "NumericSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type="range"
                       min={0}
                       max={this.props.Choices.length - 1}
                       step="1"
                       onInput={this.props.HandleInputChanges}/>
            );
        }

        //For inputs of type ToggleSlider
        if (this.props.InputType === "ToggleSlider") {
            formattedQuestion = (
                <label className="switch">
                    <input type="checkbox"
                           onInput={this.props.HandleInputChanges}
                           onChange={this.props.HandleInputChanges}
                           step="1"/>
                    <span className="slider round"></span>
                </label>
            );
        }

        return (
            <>
                <p>{this.props.Text}</p>
                {formattedQuestion}
            </>
        );
    }


};

//Replace state with props after tests-----------------------------------------
function QuestionList() {
    const QUESTIONNAIRE_NO = 1;
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function loadQuestions() {
            let questions = await GetQuestions(QUESTIONNAIRE_NO);
            setQuestions(prevState => [...prevState, ...questions])
        }

        loadQuestions();
    }, []);


    //FormSubmission


    //FormInput Change handler
    let HandleInputChanges = (event) => {
        event.preventDefault();
        console.log("Change Detected");
        console.log(event.target.toString());
    };

    //Form Submission
    let HandleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted");
    };

    return (
        <div>
            <h1>Questionnaire {QUESTIONNAIRE_NO}</h1>
            <form onSubmit={HandleFormSubmit}>
                <ul>
                    {questions.map((question, index) => (
                        <li key={index}>
                            <div>
                                <Question {...question} HandleInputChanges={HandleInputChanges.bind(this)}/>
                            </div>
                        </li>
                    ))}
                </ul>
                <button type="submit">Confirmer</button>
            </form>
        </div>
    );
}


async function GetQuestions(questionnaireNo) {
    const q = query(collection(db, "Question"), where("QuestionnaireNO", "==", questionnaireNo));
    const querySnapshot = await getDocs(q);
    let questions = [];
    querySnapshot.forEach((doc) => {
        questions = [convertToQuestion(doc), ...questions];
    });
    return questions;
}


function convertToQuestion(q) {
    return {
        Choices: q.get("Choices"),
        DefaultValue: q.get("DefaultValue"),
        InputType: q.get("InputType"),
        NormalValue: q.get("NormalValue"),
        QuestionNO: q.get("QuestionNO"),
        Text: q.get("Text"),
        VariableName: q.get("Variable")
    };
}
