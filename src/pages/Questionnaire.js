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
            answer: this.props.normalValue,
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
            case "GlycBool": Variables.prototype.GlycBool = value;
                //Display question 6.1 if answer is Yes
                this.props.setdisplay6(current => !current);
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
            case "SystBool" :Variables.prototype.SystBool = value;
                //Display question 5.1 if answer is Yes
                this.props.setdisplay5(current => !current);
                break;
            case "Fume" : Variables.prototype.Fume = value;
                break;
            case "Taille" : Variables.prototype.Taille = value;
                break;
            case "CholBool" : Variables.prototype.CholBool = value;
                //Display question 7.1 and 7.2 if answer is Yes
                this.props.setdisplay7(current => !current);
                break;
            case "Syst" : Variables.prototype.Syst = value;
                break;
            case "Glyc" : Variables.prototype.Glyc = value;
                break;
            case "Chol" : Variables.prototype.Chol = value;
                break;
            case "HDL" : Variables.prototype.HDL = value;
                break;
        }

        //debug---------------------------------------------------
        console.log("Answer: " + target.value);
        console.log("Checked: " + target.checked);
        console.log("Poids: " + Variables.prototype.Poids);
        console.log("Alcool: " + Variables.prototype.Alcool);
        console.log("GlycBool: " + Variables.prototype.GlycBool);
        console.log("Alim: " + Variables.prototype.Alim);
        console.log("Sport: " + Variables.prototype.Sport);
        console.log("Inf: " + Variables.prototype.Inf);
        console.log("Gender: " + Variables.prototype.Gender);
        console.log("DIAB: " + Variables.prototype.DIAB);
        console.log("Afcancer: " + Variables.prototype.Afcancer);
        console.log("Avc: " + Variables.prototype.Avc);
        console.log("Age: " + Variables.prototype.Age);
        console.log("Afinf: " + Variables.prototype.Afinf);
        console.log("SystBool: " + Variables.prototype.SystBool);
        console.log("Fume: " + Variables.prototype.Fume);
        console.log("Taille: " + Variables.prototype.Taille);
        console.log("CholBool: " + Variables.prototype.CholBool);
        console.log("Syst: " + Variables.prototype.Syst);
        console.log("Glyc: " + Variables.prototype.Glyc);
        console.log("Chol: " + Variables.prototype.Chol);
        console.log("HDL: " + Variables.prototype.HDL);
        console.log();
        //debug---------------------------------------------------
    };


    //Questions and inputs change depending on question type
    render() {

        let formattedQuestion;

        //these must be displayed only if the answer to the previous question is Yes
        switch (this.props.questionNO) {
            case 5.1 : if(this.props.display5 === false){
                Variables.prototype.Syst = this.props.normalValue;
                //Debug---------------------------------------------------
                console.log("Syst reset: " + Variables.prototype.Syst);
                return null;
            }
                break;
            case 6.1 : if(this.props.display6 === false){
                Variables.prototype.Glyc = this.props.normalValue;
                //Debug---------------------------------------------------
                console.log("Glyc reset: " + Variables.prototype.Glyc);
                return null;
            }
                break;
            case 7.1: if(this.props.display7 === false){
                Variables.prototype.Chol = this.props.normalValue;
                //Debug---------------------------------------------------
                console.log("Chol reset: " + Variables.prototype.Chol);
                return null;
            }
                break;
            case 7.2: if(this.props.display7 === false){
                Variables.prototype.HDL = this.props.normalValue;
                //Debug---------------------------------------------------
                console.log("HDL reset: " + Variables.prototype.HDL);
                return null;
            }
                break;
        }


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
            //For questions 6.1 , 7.1 and 7.2
            //Input step is set to 0.1
            if (this.props.questionNO === 6.1|| this.props.questionNO === 7.1 || this.props.questionNO === 7.2) {
                formattedQuestion = (
                        //Min and Max of range refer to the index in choices array of the question
                        <>
                            <input type="range"
                                   min={this.props.choices[0]}
                                   max={this.props.choices[this.props.choices.length - 1]}
                                   step="0.1"
                                   defaultValue={this.props.defaultValue}
                                   onChange={this.HandleInputChanges}/>
                            &nbsp;{this.state.answer}
                        </>
                );
            }else{
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
    let [questions, setQuestions] = useState([]);
    let [Display5, setDisplay5] = useState(false);
    let [Display6, setDisplay6] = useState(false);
    let [Display7, setDisplay7] = useState(false);

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
            <h2 id="questionnaireTitle">Questionnaire</h2>
            {questions.map((question) => (
                <div key={question.questionNO}>
                    <div className="padded_div question">
                        <Question {...question}
                                  display5={Display5} setdisplay5={setDisplay5}
                                  display6={Display6} setdisplay6={setDisplay6}
                                  display7={Display7} setdisplay7={setDisplay7}/>
                    </div>
                </div>
            ))}
        </div>
            <button type="submit"
            className="formButton rightButton questionButton animatedButton"
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
            case "GlycBool": Variables.prototype.GlycBool = question.normalValue;
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
            case "SystBool" :Variables.prototype.SystBool = question.normalValue;
                break;
            case "Fume" : Variables.prototype.Fume = question.normalValue;
                break;
            case "Taille" : Variables.prototype.Taille = question.normalValue;
                break;
            case "CholBool" : Variables.prototype.CholBool = question.normalValue;
                break;
            case "Syst" : Variables.prototype.Syst = question.normalValue;
                break;
            case "Glyc" : Variables.prototype.Glyc = question.normalValue;
                break;
            case "Chol" : Variables.prototype.Chol = question.normalValue;
                break;
            case "HDL" : Variables.prototype.HDL = question.normalValue;
                break;
        }});
}
