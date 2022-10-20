import {Link, useNavigate} from "react-router-dom";
import {QuestionDB} from "../DAL/QuestionDB";
import {useEffect, useState} from "react";
import React from "react";
import {AdminDB} from "../DAL/AdminDB";

let normalValues;

export default function NormalValueList({currentUser}) {
    const navigate = useNavigate();
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        isAnAdminConnected();

        async function loadQuestions() {
            let q = await QuestionDB.prototype.getAllQuestions();
            setQuestions(prevState => [...prevState, ...q]);
        }

        loadQuestions();

    }, []);

    //fill normalValues array each time the questions are reFetched
    useEffect(() => {
        const q = [...questions];
        normalValues = q.map(qu => qu.normalValue);
    }, [questions]);


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const q = [...questions]; //do not use state value directly
        let i = 0;
        for (const n of normalValues) {
            if (n !== q[i].normalValue) {
                //change was made, update in db
                await QuestionDB.prototype.setNormalValue((i + 1), n);
            }
            i++;
        }
        window.location.reload(); //reload page to re-fetch normal values
    }

    async function isAnAdminConnected() {
        if (!currentUser) {
            navigate("/");
            return;
        }
        //search for an admin the db
        let admin = await AdminDB.prototype.getAdminById(currentUser.uid);
        if (typeof admin === "undefined") {
            navigate("/");
        }
    }

    return (
        <div>
            <h1>Admin page, act wisely ...</h1>
            <form className="normalValueForm" onSubmit={handleFormSubmit}>
                <button
                    type="submit"
                    className="formButton rightButton"
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
        normalValues[props.questionNO - 1] = value;
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