import {Link, useNavigate} from "react-router-dom";
import {QuestionDB} from "../DAL/QuestionDB";
import "../css/Admin.css";
import {useEffect, useState} from "react";
import React from "react";
import {AdminDB} from "../DAL/AdminDB";

let normalValues;

export default function NormalValueList({currentUser, setBackgroundImage}) {
    const navigate = useNavigate();
    let [questions, setQuestions] = useState([]);
    useEffect(() => {
        //prohibit the access to non-admin users
        isAnAdminConnected();

        setBackgroundImage(null);

        (async function loadQuestions() {
            console.log("Loading question")
            let q = await QuestionDB.prototype.getAllQuestions();
            setQuestions(q);
        }())

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
        alert('Changes saved');
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
        <div id="admin" className="leftAlignedDiv">
            <h2>Edit normal variables</h2>
            <form onSubmit={handleFormSubmit}>
                <button
                    type="submit"
                    className="formButton rightButton animatedButton bigButton"
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
            <label id="normalValuesLabel">{props.questionNO}. {props.text}</label>
            <input type="number"
                   className="normalValueInput"
                   defaultValue={props.normalValue}
                   onChange={handleChange}
            />
        </>
    );
}