import React, {forwardRef} from "react";
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

//Variables containing the responses, one per question
let Poids
let Aclool
let Glyc
let Alim
let Sport
let Inf
let Gender
let DIAB
let Afcancer
let Avc
let Age
let Afinf//pour question 11, pas encore sur Firebase
let Syst
let Fume
let Taille


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
// Corriger les toggles pour afficher la valeur de la réponse
class Question extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.normalValue
        };
    }

    //FormInput Change handler
    //Do not put SendAnswer() here, it will send answer on every change
    HandleInputChanges = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({answer: value});
        switch (this.props.variableName) {
            //Poids does not work ---------------------------------------------------  (〃＞＿＜;〃)
            case "Poids": Poids = value;
                break;
            case "Aclool": Aclool = value;
                break;
            case "Glyc": Glyc = value;
                break;
            case "Alim": Alim = value;
                break;
            case "Sport": Sport = value;
                break;
            case "Inf": Inf = value;
                break;
            case "Gender" : Gender = value;
                break;
            case "DIAB" : DIAB = value;
                break;
            case "Afcancer" : Afcancer = value;
                break;
            case "Avc" : Avc = value;
                break;
            case "Age" : Age = value;
                break;
            case "Afinf" : Afinf = value;
                break;
            case "Syst" : Syst = value;
                break;
            case "Fume" : Fume = value;
                break;
            case "Taille" : Taille = value;
                break;
        }
        //debug
        console.log("Answer: " + target.value);
        console.log("Checked: " + target.checked);
        console.log("Poids: " + Poids);
        console.log("Aclool: " + Aclool);
        console.log("Glyc: " + Glyc);
        console.log("Alim: " + Alim);
        console.log("Sport: " + Sport);
        console.log("Inf: " + Inf);
        console.log("Gender: " + Gender);
        console.log("DIAB: " + DIAB);
        console.log("Afcancer: " + Afcancer);
        console.log("Avc: " + Avc);
        console.log("Age: " + Age);
        console.log("Afinf: " + Afinf);
        console.log("Syst: " + Syst);
        console.log("Fume: " + Fume);
        console.log("Taille: " + Taille);
        console.log();
    };


    render() {

        let formattedQuestion;
        //For inputs of type RadioSlider and NumericSlider
        if (this.props.inputType === "RadioSlider") {

            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <>
                    <input type="range"
                           min={0}
                           max={this.props.choices.length - 1}
                           step="1"
                           defaultValue={this.props.normalValue}
                           onChange={this.HandleInputChanges}/>
                    {this.state.answer}
                </>
            );
        }

        //For inputs of type NumericSlider
        if (this.props.inputType === "NumericSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <>
                    <input type="range"
                           min={this.props.choices[0]}
                           max={this.props.choices[this.props.choices.length - 1]}
                           step="1"
                           defaultValue={this.props.normalValue}
                           onChange={this.HandleInputChanges}/>
                    {this.state.answer}
                </>
            );
        }

        //For inputs of type ToggleSlider
        if (this.props.inputType === "ToggleSlider") {
            formattedQuestion = (
                <>
                    <label className="switch">
                        <input type="checkbox"
                               onInput={this.HandleInputChanges}
                        />
                        <span className="slider round"></span>
                        {this.state.answer? "Oui" : "Non"}
                    </label>
                </>
            );
        }

        return (
            <div>
                <p>{this.props.text}</p>
                {formattedQuestion}
                <br/>
                <br/>
            </div>
        );
    }
};



function QuestionList() {
    const QUESTIONNAIRE_NO = 1;
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function loadQuestions() {
            let questions = await QuestionDB.prototype.getQuestionsByQuestionnaire(QUESTIONNAIRE_NO);
            setQuestions(prevState => [...prevState, ...questions]);
        }
        loadQuestions();
    }, []);


    //Form Submission
    //Maybe change it to go to next couple of questions-----------------------------------------------------
    let HandleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Form Submitted");
        console.log(...questions);
    };

    return (
        <div>
            <h1>Questionnaire {QUESTIONNAIRE_NO}</h1>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <div>
                                <Question {...question}/>
                            </div>
                        </div>
                    ))}
            <button type="submit" onClick={HandleFormSubmit}>Confirmer</button>
        </div>
    );
}





