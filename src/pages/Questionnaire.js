import React, {useEffect, useState} from "react";
import {QuestionDB} from "../DAL/QuestionDB";


let Poids = 0;

class Question extends React.Component {
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
        /*switch (this.props.VariableName) {
            case "Poids": Poids = value;
        }*/
        //debug
        console.log("Answer: " + target.value);
        console.log("Checked: " + target.checked);
        console.log("Poids: " + Poids);
    };

    render() {

        let formattedQuestion;
        //For inputs of type RadioSlider and NumericSlider

        if (this.props.inputType === "RadioSlider") {

            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type="range"
                       min={0}
                       max={this.props.choices.length - 1}
                       step="1"
                       defaultValue={this.props.normalValue}
                       onChange={this.HandleInputChanges}/>
            );
        }

        //For inputs of type NumericSlider
        if (this.props.inputType === "NumericSlider") {
            formattedQuestion = (
                //Min and Max of range refer to the index in choices array of the question
                <input type="range"
                       min={this.props.choices[0]}
                       max={this.props.choices[this.props.choices.length - 1]}
                       step="1"
                       defaultValue={this.props.normalValue}
                       onChange={this.HandleInputChanges}/>
            );
        }

        //For inputs of type ToggleSlider
        if (this.props.inputType === "ToggleSlider") {
            formattedQuestion = (
                <label className="switch">
                    <input type="checkbox"
                           onInput={this.HandleInputChanges}
                           step="1"/>
                    <span className="slider round"></span>
                </label>
            );
        }

        return (
            <>
                <p>{this.props.text}</p>
                {formattedQuestion}
                {this.state.answer}
            </>
        );
    }
};

//Replace state with props after tests-----------------------------------------
export default function QuestionList() {
    const QUESTIONNAIRE_NO = 1;
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function loadQuestions() {
            let questions = await QuestionDB.prototype.getQuestionsByQuestionnaire(QUESTIONNAIRE_NO);
            setQuestions(prevState => [...prevState, ...questions]);
        }

        loadQuestions();
    }, []);


//----------------------------------------------
    //use for debug, for now
    //list of answers, only the values
    let [answers, setAnswers] = useState([]);
    let handleCallback = (childData) => {
        setAnswers(prevState => [...prevState, childData]);
    }
//----------------------------------------------


    //Form Submission
    let HandleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.answer);
    };

    return (
        <div>
            <h1>Questionnaire {QUESTIONNAIRE_NO}</h1>
            <form onSubmit={HandleFormSubmit}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <div>
                            <Question {...question}
                                      normalValue={question.NormalValue}
                                      SendAnswer={handleCallback}
                            />
                        </div>
                    </div>
                ))}
                <button type="submit">Confirmer</button>
            </form>
        </div>
    );
}
