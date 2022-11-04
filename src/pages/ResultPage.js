import React, {useEffect, useState} from "react";
import "./ShowResult.css"
import MyImage from "../img/avatar-gf34ddc003_1280.png";
import Algorithm from "./Algorithm";
import WriteAnswer from "./WriteAnswer";
import {useLocation} from "react-router-dom";
import {auth} from "../initFirebase";
import Navbar from "../components/Navbar";

function ResultPage() {

    const location = useLocation();
    //let date = location.state.test;
    let values = location.state.values;

    const allAnswers = new WriteAnswer();

    allAnswers.updatePersonalData(values.sexe, values.age, values.poids, values.taille, values.syst, values.glyc, values.chol, values.diab, values.inf, values.avc);
    allAnswers.updateFamilyData(values.afinf, values.afcancer);
    allAnswers.updateHabitsData(values.fume, values.alim, values.sport, values.alcool)
    allAnswers.calculateFinalData()

    /*useEffect(() => {
        allAnswers.readAnswers(date).then(r => {});
    }, [])*/

    const myAlgo = new Algorithm(null, allAnswers.sex, allAnswers.age, allAnswers.smoke, allAnswers.systAlgo, allAnswers.cholAlgo, allAnswers.hdlAlgo, allAnswers.afinf, allAnswers.afCancer, allAnswers.bmiAlgo, allAnswers.sportAlgo, allAnswers.alcoolAlgo, allAnswers.alimAlgo, allAnswers.systAlgo, allAnswers.glycAlgo, allAnswers.diab, allAnswers.inf)

    //set state for the slider value (middle column)
    const [smokeValue, setSmoke] = useState(allAnswers.smoke);
    const [alimValue, setAlim] = useState(allAnswers.alimAlgo);
    const [sportValue, setSport] = useState(allAnswers.sportAlgo);
    const [weightValue, setWeight] = useState(allAnswers.weight);
    const [alcoolValue, setAlcool] = useState(allAnswers.alcoolAlgo);

    //set state for the risk value based on the slider column
    const [cancerRisk, setCancer] = useState(myAlgo.Cancer(allAnswers.afCancer, allAnswers.smoke, allAnswers.bmiAlgo, allAnswers.sportAlgo, allAnswers.alcoolAlgo, allAnswers.alimAlgo));
    const [diabeteRisk, setDiabete] = useState(myAlgo.Diabete(allAnswers.sex, allAnswers.age, allAnswers.bmiAlgo, allAnswers.systAlgo, allAnswers.glycAlgo, allAnswers.sportAlgo, allAnswers.alimAlgo));
    const [infarctusRisk, setInfarctus] = useState(myAlgo.Infarctus(allAnswers.age, allAnswers.sex, allAnswers.systAlgo, allAnswers.diab, allAnswers.inf, allAnswers.cholAlgo, allAnswers.hdlAlgo));
    const [nonInfarctusRisk, setNonInfarctus] = useState(myAlgo.NonInfractus(allAnswers.age, allAnswers.smoke, allAnswers.systAlgo, allAnswers.cholAlgo, allAnswers.hdlAlgo, allAnswers.afinf, allAnswers.sex));

    //allAnswers.WriteResult(cancerRisk,diabeteRisk,infarctusRisk,nonInfarctusRisk).then(r => {})

    // change state of the risk column
    const changeCancer = (event) => {
        setCancer(myAlgo.Cancer(allAnswers.afCancer, smokeValue, allAnswers.bmiAlgo, sportValue, alcoolValue, allAnswers.alimAlgo))
    }
    const changeDiabete = (event) => {
        setDiabete(myAlgo.Diabete(allAnswers.sex, allAnswers.age, allAnswers.bmiAlgo, allAnswers.systAlgo, allAnswers.glycAlgo, sportValue, alimValue))
    }
    const changeInfarctus = (event) => {
        setInfarctus(myAlgo.Infarctus(allAnswers.age, allAnswers.sex, smokeValue, allAnswers.systAlgo, allAnswers.diab, allAnswers.inf, allAnswers.cholAlgo, allAnswers.hdlAlgo))
    }
    const changeNonInfarctus = (event) => {
        setNonInfarctus(myAlgo.NonInfractus(allAnswers.age, smokeValue, allAnswers.systAlgo, allAnswers.cholAlgo, allAnswers.hdlAlgo, allAnswers.afinf, allAnswers.sex))
    }
    // change state of the slidder column
    const changeSmoke = (event) => {
        setSmoke(event.target.value);
        changeCancer()
        changeDiabete()
        changeInfarctus()
        changeNonInfarctus()
    };
    const changeAlim = (event) => {
        setAlim(event.target.value);
        changeCancer()
        changeDiabete()
        changeInfarctus()
        changeNonInfarctus()
    };
    const changeSport = (event) => {
        setSport(event.target.value);
        changeCancer()
        changeDiabete()
        changeInfarctus()
        changeNonInfarctus()
    };
    const changeWeight = (event) => {
        setWeight(event.target.value);
        allAnswers.updateBMI(allAnswers.height, weightValue)
        changeCancer()
        changeDiabete()
        changeInfarctus()
        changeNonInfarctus()
    };
    const changeAlcool = (event) => {
        setAlcool(event.target.value);
        changeCancer()
        changeDiabete()
        changeInfarctus()
        changeNonInfarctus()
    };


    const SaveChanges = () => {
        allAnswers.WriteResult(auth.currentUser.uid).then(r => {})
    }

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="row" style={{display: "flex"}}>
                    <div className="column">
                        <div className="topBackground">
                            <p>Your informations</p>
                            <img src={MyImage} width="200px" height="200px"></img>
                        </div>
                        <div className="allColumnText">
                            <p>age {allAnswers.age}</p>
                            <p>sexe {allAnswers.sex < 1 ? "Femme" : "Homme"}</p>
                            <p>taille {allAnswers.height}</p>
                            <p>poids {allAnswers.weight}</p>
                        </div>
                    </div>

                    <div className="column">
                        <div className="topBackground">
                            <p>Your habits</p>
                            <img src={MyImage} width="200px" height="200px"></img>
                        </div>

                        <div className="allColumnText">
                            <div className="textAndSlider">
                                <p className="child" style={{alignSelf: "start"}}>Fumeur value {smokeValue}</p>
                                <input type="range" min="0" max="1" onChange={changeSmoke} value={smokeValue} step={1}
                                       className="slider"/>
                            </div>
                            <div className="textAndSlider">
                                <p className="child" style={{alignSelf: "start"}}>Alim value {alimValue}</p>
                                <input type="range" min="0" max="4" onChange={changeAlim} value={alimValue} step={1}
                                       className="slider"/>
                            </div>
                            <div className="textAndSlider">
                                <p className="child" style={{alignSelf: "start"}}>Sport value {sportValue}</p>
                                <input type="range" min="0" max="4" onChange={changeSport} value={sportValue} step={1}
                                       className="slider"/>
                            </div>
                            <div className="textAndSlider">
                                <p className="child" style={{alignSelf: "start"}}>weight value {weightValue}</p>
                                <input type="range" min="0" max="200" onChange={changeWeight} value={weightValue}
                                       step={1} className="slider"/>
                            </div>
                            <div className="textAndSlider">
                                <p className="child" style={{alignSelf: "start"}}>alcool value {alcoolValue}</p>
                                <input type="range" min="0" max="4" onChange={changeAlcool} value={alcoolValue} step={1}
                                       className="slider"/>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="topBackground">
                            <p>Your risks</p>
                            <img src={MyImage} width="200px" height="200px"></img>
                        </div>
                        <div className="allColumnText">
                            <p>Maladie Cardiaque {nonInfarctusRisk} %</p>
                            <p>Attaque Cérébrale {infarctusRisk} %</p>
                            <p>Diabète {diabeteRisk} %</p>
                            <p>super cancer {cancerRisk} %</p>
                            {auth.currentUser ? <button onClick={SaveChanges}>Save changes</button> : null}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPage
