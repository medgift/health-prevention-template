import React, {useContext, useEffect, useState} from "react";
import "../css/Questionnaire.css";
import {QuestionDB} from "../DAL/QuestionDB";
import {ResponseDB} from "../DAL/ResponseDB";
import {ResponseDTO} from "../DTO/ResponseDTO";
import {Variables} from "../Context/Variables";
import {useNavigate} from "react-router-dom";
import questionBg from "./paint_bg.jpg"


// Manages a single question, its input and values
class Question extends React.Component {
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
        if (target.type === 'checkbox') {
            //To change a True/False value into a 1/0 value
            if (this.props.questionNO !== 5 && this.props.questionNO !== 6 && this.props.questionNO !== 7) {
                value = target.checked ? 1 : 0;
            }
        } else {
            value = target.value;
        }

        if (this.props.questionNO !== 5 && this.props.questionNO !== 6 && this.props.questionNO !== 7) {
            this.setState({answer: value});
        }

        //Assigns the value of the answer to the corresponding variable in Variables.js
        switch (this.props.variableName) {
            case "Poids":
                this.context.Poids = value;
                break;
            case "Alcool":
                this.context.Alcool = value;
                break;
            case "GlycBool":
                this.context.GlycBool = 1;
                //Display question 6.1 if answer is Yes
                this.props.setdisplay6(true);
                break;
            case "Alim":
                this.context.Alim = value;
                break;
            case "Sport":
                this.context.Sport = value;
                break;
            case "Inf":
                this.context.Inf = value;
                break;
            case "Gender" :
                this.context.Gender = value;
                break;
            case "DIAB" :
                this.context.DIAB = value;
                break;
            case "Afcancer" :
                this.context.Afcancer = value;
                break;
            case "Avc" :
                this.context.Avc = value;
                break;
            case "Age" :
                this.context.Age = value;
                break;
            case "Afinf" :
                this.context.Afinf = value;
                break;
            case "SystBool" :
                this.context.SystBool = 1;
                //Display question 5.1 if answer is Yes
                this.props.setdisplay5(true);
                break;
            case "Fume" :
                this.context.Fume = value;
                break;
            case "Taille" :
                this.context.Taille = value;
                break;
            case "CholBool" :
                this.context.CholBool = 1;
                //Display question 7.1 and 7.2 if answer is Yes
                this.props.setdisplay7(true);
                break;
            case "Syst" :
                this.context.Syst = value;
                break;
            case "Glyc" :
                this.context.Glyc = value;
                break;
            case "Chol" :
                this.context.Chol = value;
                break;
            case "HDL" :
                this.context.HDL = value;
                break;
        }

        //debug---------------------------------------------------
        /*console.log();
        console.log("Poids: " + Variables.Poids);
        console.log("Alcool: " + Variables.Alcool);
        console.log("GlycBool: " + Variables.GlycBool);
        console.log("Alim: " + Variables.Alim);
        console.log("Sport: " + Variables.Sport);
        console.log("Inf: " + Variables.Inf);
        console.log("Gender: " + Variables.Gender);
        console.log("DIAB: " + Variables.DIAB);
        console.log("Afcancer: " + Variables.Afcancer);
        console.log("Avc: " + Variables.Avc);
        console.log("Age: " + Variables.Age);
        console.log("Afinf: " + Variables.Afinf);
        console.log("SystBool: " + Variables.SystBool);
        console.log("Fume: " + Variables.Fume);
        console.log("Taille: " + Variables.Taille);
        console.log("CholBool: " + Variables.CholBool);
        console.log("Syst: " + Variables.Syst);
        console.log("Glyc: " + Variables.Glyc);
        console.log("Chol: " + Variables.Chol);
        console.log("HDL: " + Variables.HDL);
        console.log();*/
        //debug---------------------------------------------------
    };


    handleFlip = () => {
        console.log();
        switch (this.props.questionNO) {
            case 5.1 :
                this.context.SystBool = 0;
                this.props.setdisplay5(false);
                // console.log("FLIP! SystBool: " + Variables.SystBool);
                break;
            case 6.1 :
                this.context.GlycBool = 0;
                this.props.setdisplay6(false);
                // console.log("FLIP! GlycBool: " + Variables.GlycBool);
                break;
            case 7.1 :
                this.context.CholBool = 0;
                this.props.setdisplay7(false);
                // console.log("FLIP! CholBool: " + Variables.CholBool);
                break;
            case 7.2 :
                this.context.CholBool = 0;
                this.props.setdisplay7(false);
                //  console.log("FLIP! CholBool: " + Variables.CholBool);
                break;
        }
    }


    //Questions and inputs change depending on question type
    render() {
        let formattedQuestion;

        //these must be displayed only if the answer to the previous question is Yes
        switch (this.props.questionNO) {

            case 5 :
                if (this.props.display5)
                    return null;
                break;

            case 5.1:
                if (this.props.display5 === false) {
                    this.context.Syst = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("Syst at base value: " + this.context.Syst);
                    return null;
                }
                break;

            case 6 :
                if (this.props.display6)
                    return null;
                break;

            case 6.1 :
                if (this.props.display6 === false) {
                    this.context.Glyc = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("Glyc at base value: " + this.context.Glyc);
                    return null;
                }
                break;

            case 7 :
                if (this.props.display7)
                    return null;
                break;

            case 7.1:
                if (this.props.display7 === false) {
                    this.context.Chol = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("Chol at base value: " + this.context.Chol);
                    return null;
                }
                break;
            case 7.2:
                if (this.props.display7 === false) {
                    this.context.HDL = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("HDL at base value: " + this.context.HDL);
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
        if (this.props.inputType === "NumericSlider") {
            //For questions 6.1 , 7.1 and 7.2
            //Input step is set to 0.1
            if (this.props.questionNO === 6.1 || this.props.questionNO === 7.1 || this.props.questionNO === 7.2) {
                formattedQuestion = (
                    //Min and Max of range refer to the index in choices array of the question
                    <>
                        <button className="flip" onClick={this.handleFlip}>Flip</button>
                        <input type="range"
                               min={this.props.choices[0]}
                               max={this.props.choices[this.props.choices.length - 1]}
                               step="0.1"
                               defaultValue={this.props.normalValue}
                               onChange={this.HandleInputChanges}/>
                        &nbsp;{this.state.answer} {this.props.unit}
                    </>
                );
            } else {
                formattedQuestion = (
                    <>
                        {this.props.questionNO === 5.1 ?
                            <button className="flip" onClick={this.handleFlip}>Flip</button> : null}
                        {/*Min and Max of range refer to the index in choices array of the question*/}
                        <input type="range"
                               min={this.props.choices[0]}
                               max={this.props.choices[this.props.choices.length - 1]}
                               step="1"
                               defaultValue={this.props.normalValue}
                               onChange={this.HandleInputChanges}/>
                        &nbsp;{this.state.answer} {this.props.unit}
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
                    &nbsp;{this.state.answer ? (this.props.choices[1]) : (this.props.choices[0])}
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
Question.contextType = Variables;

//To manage questions

export default function QuestionList({currentUser, setBackgroundImage}) {
    let [questions, setQuestions] = useState([]);
    let [Display5, setDisplay5] = useState(false);
    let [Display6, setDisplay6] = useState(false);
    let [Display7, setDisplay7] = useState(false);
    const varContext = useContext(Variables);
    const navigate = useNavigate();

    useEffect(() => {
        setBackgroundImage(questionBg);
    }, []);

    let title = currentUser ? "Fill in the questionnaire to obtain custom results !" : "Log in to save your answers."

    useEffect(() => {
        (async function loadQuestions() {
            let questions = await QuestionDB.prototype.getAllQuestions();
            setQuestions(questions);
            setDefaultValues(questions, varContext);
        }())
    }, []);

    //Form Submission
    //Maybe change it to go to next couple of questions-----------------------------------------------------
    let HandleFormSubmit = (event) => {
        event.preventDefault();
        (async function postResponses() {
            let responses = convertVariablesToMap(varContext); //put values from variables context in a map
            let userId = currentUser ? currentUser.uid : null; //id is null if a guest fills the questionnaire
            let resDTO = new ResponseDTO(new Date(), userId, responses);
            await ResponseDB.prototype.addResponses(resDTO);
            //user shall be redirected to the results page
            navigate("/view")
        }())
    };

    //Create div for questions and submit button
    return (
        <div>
            <div id="questionnaire">
                <h3 style={{textAlign: "left"}}>{title}</h3>
                <div id="questionGrid">
                    {questions.map((question) => (
                        <Question key={question.questionNO} {...question}
                                  display5={Display5} setdisplay5={setDisplay5}
                                  display6={Display6} setdisplay6={setDisplay6}
                                  display7={Display7} setdisplay7={setDisplay7}
                        />
                    )).filter(q => q != null) /*null questions are questions that shouldn't be displayed (5, 6, and 7)*/}
                </div>
            </div>
            <div id="questionnaireButtonDiv">
            <button type="submit"
                    className="formButton questionButton animatedButton"
                    onClick={HandleFormSubmit}>Confirm
            </button>
            </div>
        </div>
    );
}

function setDefaultValues(questions, varContext) {
//Get the default values of the questions and set them in the Variables class
    questions.forEach(question => {
        switch (question.variableName) {
            case "Poids":
                varContext.Poids = question.normalValue;
                break;
            case "Alcool":
                varContext.Alcool = question.normalValue;
                break;
            case "GlycBool":
                varContext.GlycBool = question.normalValue;
                break;
            case "Alim":
                varContext.Alim = question.normalValue;
                break;
            case "Sport":
                varContext.Sport = question.normalValue;
                break;
            case "Inf":
                varContext.Inf = question.normalValue;
                break;
            case "Gender" :
                varContext.Gender = question.normalValue;
                break;
            case "DIAB" :
                varContext.DIAB = question.normalValue;
                break;
            case "Afcancer" :
                varContext.Afcancer = question.normalValue;
                break;
            case "Avc" :
                varContext.Avc = question.normalValue;
                break;
            case "Age" :
                varContext.Age = question.normalValue;
                break;
            case "Afinf" :
                varContext.Afinf = question.normalValue;
                break;
            case "SystBool" :
                varContext.SystBool = question.normalValue;
                break;
            case "Fume" :
                varContext.Fume = question.normalValue;
                break;
            case "Taille" :
                varContext.Taille = question.normalValue;
                break;
            case "CholBool" :
                varContext.CholBool = question.normalValue;
                break;
            case "Syst" :
                varContext.Syst = question.normalValue;
                break;
            case "Glyc" :
                varContext.Glyc = question.normalValue;
                break;
            case "Chol" :
                varContext.Chol = question.normalValue;
                break;
            case "HDL" :
                varContext.HDL = question.normalValue;
                break;
        }
    });
}

function convertVariablesToMap(varContext) {
    let map = {
        Poids: varContext.Poids,
        Alcool: varContext.Alcool,
        GlycBool: varContext.GlycBool,
        Alim: varContext.Alim,
        Sport: varContext.Sport,
        Inf: varContext.Inf,
        Gender: varContext.Gender,
        DIAB: varContext.DIAB,
        Afcancer: varContext.Afcancer,
        Avc: varContext.Avc,
        Age: varContext.Age,
        Afinf: varContext.Afinf,
        SystBool: varContext.SystBool,
        Syst: varContext.Syst,
        Fume: varContext.Fume,
        Taille: varContext.Taille,
        CholBool: varContext.CholBool,
        Chol: varContext.Chol,
        Glyc: varContext.Glyc,
        HDL: varContext.HDL
    }
    return map;
}
