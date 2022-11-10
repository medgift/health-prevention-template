import React, {useContext, useEffect, useState} from "react";
import "../css/Questionnaire.css";
import {QuestionDB} from "../DAL/QuestionDB";
import {ResponseDB} from "../DAL/ResponseDB";
import {ResponseDTO} from "../DTO/ResponseDTO";
import {Variables} from "../Context/Variables";
import {useNavigate} from "react-router-dom";
import questionBg from "./paint_bg.jpg"
import {RoleContext} from "../Context/UserRoles"


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
            value = target.checked ? 1 : 0;
            this.setState({answer: value});
        }else {
            value = target.value;
            this.setState({answer: value});
        }

        //Assigns the value of the answer to the corresponding variable in Variables.js
        this.context[this.props.variableName] = value;

        //Call setDisplay to update the display of the question 5,6,7
        switch (this.props.questionNO) {
            case 5: this.props.setdisplay5(true);
                break;
            case 6: this.props.setdisplay6(true);
                break;
            case 7: this.props.setdisplay7(true);
                break;
        }
        //debug---------------------------------------------------
        //console.log(this.context);
        //debug---------------------------------------------------
    };

    //On flip, the value of the question is reset and we re-display the "parent" question
    handleFlip = () => {
        switch (this.props.questionNO) {
            case 5.1 :
                this.context.SystBool = 0;
                this.props.setdisplay5(false);
                break;
            case 6.1 :
                this.context.GlycBool = 0;
                this.props.setdisplay6(false);
                break;
            case 7.1 :
                this.context.CholBool = 0;
                this.props.setdisplay7(false);
                break;
            case 7.2 :
                this.context.CholBool = 0;
                this.props.setdisplay7(false);
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
                    return null;
                }
                break
            case 6 :
                if (this.props.display6)
                    return null;
                break;
            case 6.1 :
                if (this.props.display6 === false) {
                    this.context.Glyc = this.props.normalValue;
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
                    return null;
                }
                break;
            case 7.2:
                if (this.props.display7 === false) {
                    this.context.HDL = this.props.normalValue;
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
            //flip button for questions 5.1, 6.1, 7.1, 7.2
            formattedQuestion = (
                <>
                    {this.props.questionNO === 5.1 || this.props.questionNO === 6.1 || this.props.questionNO === 7.1 || this.props.questionNO === 7.2 ?
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
                    &nbsp;{this.props.choices[this.state.answer]}
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
    const userRoleContext = useContext(RoleContext);
    const varContext = useContext(Variables);
    const navigate = useNavigate();

    useEffect(() => {
        setBackgroundImage(questionBg);

        //stop doctors and admins from visiting this page
        if (userRoleContext.role === "doctor" || userRoleContext.role === "admin") {
            navigate("/home");
        }
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
                    <h3 id="questionnaireTitle">{title}</h3>
                <div id="questionGrid">
                    {questions.map((question) => (
                        <Question key={question.questionNO} {...question}
                                  display5={Display5} setdisplay5={setDisplay5}
                                  display6={Display6} setdisplay6={setDisplay6}
                                  display7={Display7} setdisplay7={setDisplay7}
                        />
                    )).filter(q => q != null) /*null questions are questions that shouldn't be displayed (5, 6, and 7)*/}
                    <p></p>{/*Empty cell to shift the button to the right*/}
                    <div id="questionnaireButtonDiv">
                        <button type="submit"
                                className="formButton questionButton animatedButton"
                                onClick={HandleFormSubmit}>Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function setDefaultValues(questions, varContext) {
//Get the default values of the questions and map them in the Variables context class
    questions.forEach((question) => {
        varContext[question.variableName] = question.normalValue;
    });
}

function convertVariablesToMap(varContext) {
    //transfert the content of the context to a new object
    let res = {};
    for (let key in varContext) {
        res[key] = varContext[key];
    }
    return res;
}
