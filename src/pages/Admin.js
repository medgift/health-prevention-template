import {Link} from "react-router-dom";
import {QuestionDB} from "../DAL/QuestionDB";
import {useEffect, useState} from "react";
import React from "react";

let normalValues;

export default function NormalValueList(currentUser) {

    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        async function loadQuestions() {
            let q = await QuestionDB.prototype.getAllQuestions();
            setQuestions(prevState => [...prevState, ...q]);
        }
        loadQuestions();

    }, []);

    //fill normalValues array each time the questions are reFetched
    useEffect(() => {
        normalValues = questions.map(qu => qu.normalValue);
    }, [questions]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(normalValues);
        normalValues.map((n, i) => console.log("Question " + (i + 1) + "\t" + n));
        //access db
    }

    return (
        <div>
            {!currentUser ? (
                <>
                    <Link to="/register" className="App-link">
                        Register
                    </Link>
                    <span> / </span>
                    <Link to="/login" className="App-link">
                        Login
                    </Link>
                </>
            ) : (
                <Link to="/logout" className="App-link">
                    Logout
                </Link>
            )}

            <h1>Admin page, act wisely ...</h1>
            <form className="normalValueForm" onSubmit={handleFormSubmit}>
                <button
                    type="submit"
                    className="formButton"
                >Confirm
                </button>
                <br/>
                <br/>
                {questions.map((question) => (
                    <div className="normalValueDiv" key={question.questionNO}>
                        <NormalValue{...question}/>
                    </div>
                ))}
            </form>
        </div>
    );
}

function NormalValue(props) {
    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.valueAsNumber
        normalValues[props.questionNO-1] = value;
    }

    return (
        <>
            <label>{props.questionNO}. {props.text}</label>
            <input type="number"
                   className="normalValueInput"
                   defaultValue={props.normalValue}
                   onChange={handleChange}
            />
        </>
    );
}