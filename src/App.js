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

    const questionnaire = GetQuestionnaire();

    /*const questionsRef = collection(firestore, 'Questionnaire'.doc(1).collection('Question'));
    console.log(questionsRef);*/
    //const queryRef = questionsRef.where('QuestionnaireNO', '==', 1).get();

        /*const q = query(collection(db, "Questionnaire"))
        const unsub = onSnapshot(q, (querySnapshot) => {
            console.log("Data", querySnapshot.docs.map(d => doc.data()));
        });
        console.log("after the function");*/

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
        //For inputs of type RadioSlider and NumericSlider
        if (this.props.inputType === "RadioSlider" || this.props.inputType === "NumericSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type ="range"
                       min ={0}
                       max ={this.props.choices.length-1}
                       step ="1"
                       onInput={this.props.HandleInputChanges}/>
            );
        }

        //For inputs of type ToggleSlider
        if (this.props.inputType === "ToggleSlider") {
            formattedQuestion = (
                <label class="switch">
                    <input type ="checkbox"
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

    //Test Questions--------------------------------
    //const questions = [{choices:[0,1], DefaultValue:0, inputType:"ToggleSlider", NormalValue:0, QuestionNo:1, Text:"Question 1", VariableName:"var1"},
    //             {choices:["left","middle","right"], DefaultValue:-1, inputType:"ToggleSlider", NormalValue:0, QuestionNo:2, Text:"Question 2", VariableName:"var2"}];
    //Test Questions--------------------------------

    let questionModel = {
        choices: [],
        DefaultValue: 0,
        inputType: "",
        NormalValue: 0,
        QuestionNO: 1,
        Text: "",
        VariableName: ""
    }
    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function loadQuestions() {
            let querySnapchot = await GetQuestions(2);
            for (const q of querySnapchot) {
                setQuestions(prevState => [...prevState, convertToQuestion(q)])
            }
        }
        loadQuestions();
    }, []);


    for (const q of questions) {
        console.log(q.inputType);
    }

    function convertToQuestion(q) {
        return {
            choices: q.get("Choices"),
            defaultValue: q.get("DefaultValue"),
            inputType: q.get("InputType"),
            normalValue: q.get("NormalValue"),
            questionNO: q.get("QuestionNO"),
            text: q.get("Text"),
            variableName: q.get("Variable")
        };
    }

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

    return  (
        <form onSubmit={HandleFormSubmit}>
            <ul>
            {questions.map((question,index) => (
                <li key={index}>
                    <p>
                    <Question {...question} HandleInputChanges={HandleInputChanges.bind(this)}/>
                    </p>
                </li>
            ))}
            </ul>
            <button type="submit">Confirmer</button>
        </form>
    );
}


async function GetQuestions(questionnaireNo) {
    const q = query(collection(db, "Question"), where("QuestionnaireNO", "==", questionnaireNo));
    const querySnapshot = await getDocs(q);
    let questions = [];
    querySnapshot.forEach((doc) => {
        questions = [doc, ...questions];
    });
    return questions;
}
