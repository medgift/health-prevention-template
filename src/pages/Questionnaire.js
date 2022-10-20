import React, {useEffect, useState} from "react";
import {QuestionDB} from "../DAL/QuestionDB";
import {Variables} from "../components/Variables";
import {ResponseDB} from "../DAL/ResponseDB";
import {ResponseDTO} from "../DTO/ResponseDTO";


// Manages a single question, its input and values
class Question extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            answer: this.props.normalValue
        };
    }

    //FormInput Change handler
    HandleInputChanges = (event) => {
        const target = event.target;
        let value;
        if( target.type === 'checkbox'){
            //To change a True/False value into a 1/0 value
            value = target.checked ? 1 : 0;
        }else{
            value =target.value;
        }
        this.setState({answer: value});

        //Assigns the value of the answer to the corresponding variable in Variables.js
        switch (this.props.variableName) {
            case "Poids": Variables.prototype.Poids = value;
                break;
            case "Alcool": Variables.prototype.Alcool = value;
                break;
            case "Glyc": Variables.prototype.Glyc = value;
                break;
            case "Alim": Variables.prototype.Alim = value;
                break;
            case "Sport": Variables.prototype.Sport = value;
                break;
            case "Inf": Variables.prototype.Inf = value;
                break;
            case "Gender" : Variables.prototype.Gender = value;
                break;
            case "DIAB" : Variables.prototype.DIAB = value;
                break;
            case "Afcancer" : Variables.prototype.Afcancer = value;
                break;
            case "Avc" : Variables.prototype.Avc = value;
                break;
            case "Age" : Variables.prototype.Age = value;
                break;
            case "Afinf" : Variables.prototype.Afinf = value;
                break;
            case "Syst" :Variables.prototype.Syst = value;
                break;
            case "Fume" : Variables.prototype.Fume = value;
                break;
            case "Taille" : Variables.prototype.Taille = value;
                break;
        }
        //debug---------------------------------------------------
        console.log("Answer: " + target.value);
        console.log("Checked: " + target.checked);
        console.log("Poids: " + Variables.prototype.Poids);
        console.log("Alcool: " + Variables.prototype.Alcool);
        console.log("Glyc: " + Variables.prototype.Glyc);
        console.log("Alim: " + Variables.prototype.Alim);
        console.log("Sport: " + Variables.prototype.Sport);
        console.log("Inf: " + Variables.prototype.Inf);
        console.log("Gender: " + Variables.prototype.Gender);
        console.log("DIAB: " + Variables.prototype.DIAB);
        console.log("Afcancer: " + Variables.prototype.Afcancer);
        console.log("Avc: " + Variables.prototype.Avc);
        console.log("Age: " + Variables.prototype.Age);
        console.log("Afinf: " + Variables.prototype.Afinf);
        console.log("Syst: " + Variables.prototype.Syst);
        console.log("Fume: " + Variables.prototype.Fume);
        console.log("Taille: " + Variables.prototype.Taille);
        console.log();
        //debug---------------------------------------------------
    };

    //Questions and inputs change depending on questions
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
                    {this.props.choices[this.state.answer]}
                </>
            );
        }

        //For inputs of type NumericSlider
        if (this.props.inputType === "NumericSlider"){
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <>
                    <input type="range"
                           min={this.props.choices[0]}
                           max={this.props.choices[this.props.choices.length - 1]}
                           step="1"
                           defaultValue={this.props.normalValue}
                           onChange={this.HandleInputChanges}/>
                    &nbsp;{this.state.answer}
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
                    </label>
                    &nbsp;{this.state.answer ?(this.props.choices[1]):(this.props.choices[0])}
                </>
            );
        }

        return (
            <div className="questionDiv">
                <div className="questionTitleDiv">
                <p className="questionTitle">{this.props.questionNO}. {this.props.text}</p>
                </div>
                <div className="inputDiv">
                {formattedQuestion}
                </div>
                <br/>
                <br/>
            </div>
        );
    }
};

//To manage questions
export default function QuestionList({currentUser}) {
    const QUESTIONNAIRE_NO = 2;
    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        (async function loadQuestions() {
            let questions = await QuestionDB.prototype.getAllQuestions();
            setQuestions(questions);
            setDefaultValues(questions);
            }())
    }, []);


    //Form Submission
    //Maybe change it to go to next couple of questions-----------------------------------------------------
    let HandleFormSubmit = (event) => {
        event.preventDefault();
        (async function postResponses() {
            let responses = {...Variables.prototype}; //put values from variables class in an array
            let userId = currentUser ? currentUser.uid : null ; //id is null if a guest fills the questionnaire
            let resDTO = new ResponseDTO(Date.now(), userId, responses);
            await ResponseDB.prototype.addResponses(resDTO);
        }())
    };

    //Create div for questions and submit button
    return (
        <div>
        <div id="questionnaire">
            <h2 id="questionnaireTitle">Questionnaire {QUESTIONNAIRE_NO}</h2>
            {questions.map((question) => (
                <div key={question.questionNO}>
                    <div className="padded_div question">
                        <Question {...question}/>
                    </div>
                </div>
            ))}
        </div>
    <button type="submit"
            className="formButton rightButton questionButton"
            onClick={HandleFormSubmit}>Confirm</button>
        </div>
    );
}

function setDefaultValues(questions) {
//Get the default values of the questions and set them in the Variables class
    questions.forEach(question => {
        switch (question.variableName) {
            case "Poids": Variables.prototype.Poids = question.normalValue;
                break;
            case "Alcool": Variables.prototype.Alcool = question.normalValue;
                break;
            case "Glyc": Variables.prototype.Glyc = question.normalValue;
                break;
            case "Alim": Variables.prototype.Alim = question.normalValue;
                break;
            case "Sport": Variables.prototype.Sport = question.normalValue;
                break;
            case "Inf": Variables.prototype.Inf = question.normalValue;
                break;
            case "Gender" : Variables.prototype.Gender = question.normalValue;
                break;
            case "DIAB" : Variables.prototype.DIAB = question.normalValue;
                break;
            case "Afcancer" : Variables.prototype.Afcancer = question.normalValue;
                break;
            case "Avc" : Variables.prototype.Avc = question.normalValue;
                break;
            case "Age" : Variables.prototype.Age = question.normalValue;
                break;
            case "Afinf" : Variables.prototype.Afinf = question.normalValue;
                break;
            case "Syst" :Variables.prototype.Syst = question.normalValue;
                break;
            case "Fume" : Variables.prototype.Fume = question.normalValue;
                break;
            case "Taille" : Variables.prototype.Taille = question.normalValue;
                break;
        }});
}
