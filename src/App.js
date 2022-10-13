import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {db} from "./initFirebase";
import {collection, query, where, doc, getDoc, getDocs, setDoc, addDoc} from "firebase/firestore";
import {questionRef} from "./initFirebase";
import {useEffect, useState, Component} from "react";
import Logout from "./pages/Logout";
import * as PropTypes from "prop-types";
import {QuestionDB} from "./DAL/QuestionDB";
import {QuestionDTO} from "./DTO/QuestionDTO"
import {ResponseDB} from "./DAL/ResponseDB";
import {ResponseDTO} from "./DTO/ResponseDTO";

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
        if (this.props.inputType === "RadioSlider" || this.props.inputType === "NumericSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type="range"
                       min={0}
                       max={this.props.choices.length - 1}
                       step="1"
                       onInput={this.props.HandleInputChanges}/>
            );
        }

        //For inputs of type ToggleSlider
        if (this.props.inputType === "ToggleSlider") {
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
                <p>{this.props.text}</p>
                {formattedQuestion}
            </>
        );
    }


};

//Replace state with props after tests-----------------------------------------
function QuestionList() {
    const QUESTIONNAIRE_NO = 2;
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function loadQuestions() {
            let questions = await QuestionDB.prototype.getQuestionsByQuestionnaire(QUESTIONNAIRE_NO);
            setQuestions(prevState => [...prevState, ...questions]);
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





