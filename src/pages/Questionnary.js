import React, {useState} from "react";
import Family from "../components/Family";
import You from "../components/You";
import Habits from "../components/Habits";
import WriteAnswer from "./WriteAnswer";
import Navbar from "../components/Navbar";
import {useNavigate} from "react-router-dom";

export default function Questionnary() {

    const navigate = useNavigate();

    const allAnswers = new WriteAnswer();

    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        sexe: 0,
        age: "",
        poids: "",
        taille: "",
        syst: 0,
        glyc: 0,
        chol: 0,
        diab: 0,
        inf: 0,
        avc: 0,
        afinf: 0,
        afcancer: 0,
        fume: 0,
        alim: 0,
        sport: 0,
        alcool: 0
    });

    // go back to previous step
    const prevStep = (e) => {
        e.preventDefault();
        setStep(step - 1)
    }

    // proceed to the next step
    const nextStep = (e) => {
        //e.preventDefault();
        if (step === formTitles.length - 1) {

            //navigate('/ResultPage')
            navigate('/ResultPage', {
                state: {
                    values: values,
                }
            });

            //navigate("/ResultPage");
        } else {
            setStep(step + 1)
        }
    }

    const displayStep = () => {
        switch (step) {
            case 0:
                return (
                    <You nextStep={ nextStep } values={ values } setValues={ setValues }/>
                )
            case 1:
                return (
                    <Family nextStep={ nextStep } prevStep={ prevStep } values={ values } setValues={ setValues }/>
                )
            case 2:
                return (
                    <Habits nextStep={ nextStep } prevStep={ prevStep } values={ values } setValues={ setValues }/>
                )
            // never forget the default case, otherwise VS code would be mad!
            default:
            // do nothing
        }
    }

    const formTitles = ["You", "Your family", "Your habits"];

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <div className="progress-bar">
                        <span style={{width: step === 0 ? "33.3%" : step === 1 ? "66.6%" : "102%"}}></span>
                    </div>
                    <header>
                        <h1>{formTitles[step]}</h1>
                    </header>
                    { displayStep(step) }
                </div>
            </div>
        </>
    );
}