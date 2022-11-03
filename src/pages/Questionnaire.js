import React, {useContext, useEffect, useState} from "react";
import {QuestionDB} from "../DAL/QuestionDB";
import {ResponseDB} from "../DAL/ResponseDB";
import {ResponseDTO} from "../DTO/ResponseDTO";
import {Variables} from "../Context/Variables";
import {useNavigate} from "react-router-dom";


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
            if(this.props.questionNO !== 5 && this.props.questionNO !== 6 && this.props.questionNO !== 7){
                value = target.checked ? 1 : 0;
            }
        } else {
            value = target.value;
        }

        if(this.props.questionNO !== 5 && this.props.questionNO !== 6 && this.props.questionNO !== 7){
            this.setState({answer: value});
        }

        //Assigns the value of the answer to the corresponding variable in Variables.js
        switch (this.props.variableName) {
            case "Poids":
                Variables.Poids = value;
                break;
            case "Alcool":
                Variables.Alcool = value;
                break;
            case "GlycBool":
                Variables.GlycBool = 1;
                //Display question 6.1 if answer is Yes
                this.props.setdisplay6(true);
                break;
            case "Alim":
                Variables.Alim = value;
                break;
            case "Sport":
                Variables.Sport = value;
                break;
            case "Inf":
                Variables.Inf = value;
                break;
            case "Gender" :
                Variables.Gender = value;
                break;
            case "DIAB" :
                Variables.DIAB = value;
                break;
            case "Afcancer" :
                Variables.Afcancer = value;
                break;
            case "Avc" :
                Variables.Avc = value;
                break;
            case "Age" :
                Variables.Age = value;
                break;
            case "Afinf" :
                Variables.Afinf = value;
                break;
            case "SystBool" :
                Variables.SystBool = 1;
                //Display question 5.1 if answer is Yes
                this.props.setdisplay5(true);
                break;
            case "Fume" :
                Variables.Fume = value;
                break;
            case "Taille" :
                Variables.Taille = value;
                break;
            case "CholBool" :
                Variables.CholBool = 1;
                //Display question 7.1 and 7.2 if answer is Yes
                this.props.setdisplay7(true);
                break;
            case "Syst" :
                Variables.Syst = value;
                break;
            case "Glyc" :
                Variables.Glyc = value;
                break;
            case "Chol" :
                Variables.Chol = value;
                break;
            case "HDL" :
                Variables.HDL = value;
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
                Variables.SystBool = 0;
                this.props.setdisplay5(false);
               // console.log("FLIP! SystBool: " + Variables.SystBool);
                break;
            case 6.1 :
                Variables.GlycBool = 0;
                this.props.setdisplay6(false);
               // console.log("FLIP! GlycBool: " + Variables.GlycBool);
                break;
            case 7.1 :
                Variables.CholBool = 0;
                this.props.setdisplay7(false);
               // console.log("FLIP! CholBool: " + Variables.CholBool);
                break;
            case 7.2 :
                Variables.CholBool = 0;
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
                    Variables.Syst = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("Syst at base value: " + Variables.Syst);
                    return null;
                }
                break;

            case 6 :
                if (this.props.display6)
                    return null;
                break;

            case 6.1 :
                if (this.props.display6 === false) {
                    Variables.Glyc = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("Glyc at base value: " + Variables.Glyc);
                    return null;
                }
                break;

            case 7 :
                if (this.props.display7)
                    return null;
                break;

            case 7.1:
                if (this.props.display7 === false) {
                    Variables.Chol = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("Chol at base value: " + Variables.Chol);
                    return null;
                }
                break;
            case 7.2:
                if (this.props.display7 === false) {
                    Variables.HDL = this.props.normalValue;
                    //Debug---------------------------------------------------
                    console.log("HDL at base value: " + Variables.HDL);
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

//To manage questions

export default function QuestionList({currentUser}) {
    let [questions, setQuestions] = useState([]);
    let [Display5, setDisplay5] = useState(false);
    let [Display6, setDisplay6] = useState(false);
    let [Display7, setDisplay7] = useState(false);
    const navigate = useNavigate();

    let title = currentUser ? "fill in the questionnaire to obtain custom results !" : "log in to save your answers"

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
            let responses = convertVariablesToMap(); //put values from variables context in a map
            let userId = currentUser ? currentUser.uid : null; //id is null if a guest fills the questionnaire
            let resDTO = new ResponseDTO(Date.now(), userId, responses);
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

function setDefaultValues(questions) {
//Get the default values of the questions and set them in the Variables class
    questions.forEach(question => {
        switch (question.variableName) {
            case "Poids":
                Variables.Poids = question.normalValue;
                break;
            case "Alcool":
                Variables.Alcool = question.normalValue;
                break;
            case "GlycBool":
                Variables.GlycBool = question.normalValue;
                break;
            case "Alim":
                Variables.Alim = question.normalValue;
                break;
            case "Sport":
                Variables.Sport = question.normalValue;
                break;
            case "Inf":
                Variables.Inf = question.normalValue;
                break;
            case "Gender" :
                Variables.Gender = question.normalValue;
                break;
            case "DIAB" :
                Variables.DIAB = question.normalValue;
                break;
            case "Afcancer" :
                Variables.Afcancer = question.normalValue;
                break;
            case "Avc" :
                Variables.Avc = question.normalValue;
                break;
            case "Age" :
                Variables.Age = question.normalValue;
                break;
            case "Afinf" :
                Variables.Afinf = question.normalValue;
                break;
            case "SystBool" :
                Variables.SystBool = question.normalValue;
                break;
            case "Fume" :
                Variables.Fume = question.normalValue;
                break;
            case "Taille" :
                Variables.Taille = question.normalValue;
                break;
            case "CholBool" :
                Variables.CholBool = question.normalValue;
                break;
            case "Syst" :
                Variables.Syst = question.normalValue;
                break;
            case "Glyc" :
                Variables.Glyc = question.normalValue;
                break;
            case "Chol" :
                Variables.Chol = question.normalValue;
                break;
            case "HDL" :
                Variables.HDL = question.normalValue;
                break;
        }
    });
}

function convertVariablesToMap() {
    let map = {
        Poids: Variables.Poids,
        Alcool: Variables.Alcool,
        GlycBool: Variables.GlycBool,
        Alim: Variables.Alim,
        Sport: Variables.Sport,
        Inf: Variables.Inf,
        Gender: Variables.Gender,
        DIAB: Variables.DIAB,
        Afcancer: Variables.Afcancer,
        Avc: Variables.Avc,
        Age: Variables.Age,
        Afinf: Variables.Afinf,
        SystBool: Variables.SystBool,
        Syst: Variables.Syst,
        Fume: Variables.Fume,
        Taille: Variables.Taille,
        CholBool: Variables.CholBool,
        Chol: Variables.Chol,
        Glyc: Variables.Glyc,
        HDL: Variables.HDL
    }
    return map;
}
