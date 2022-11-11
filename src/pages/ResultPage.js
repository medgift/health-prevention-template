import React, {useEffect, useState} from "react";
import MyImage from "../img/avatar.png";
import Algorithm from "./Algorithm";
import WriteAnswer from "./WriteAnswer";
import {useLocation} from "react-router-dom";
import {auth, database} from "../initFirebase";
import Navbar from "../components/Navbar";
import {doc, getDoc} from "firebase/firestore";
import Habits, {switchAlcool, switchAlim, switchSport} from "../components/Habits";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function ResultPage() {

    const location = useLocation();
    const mySwal = withReactContent(Swal);
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
        setCancer(myAlgo.Cancer(allAnswers.afCancer, smokeValue, allAnswers.bmiAlgo, sportValue, alcoolValue, alimValue))
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
        console.log("Smoke: " +  event.target.value)
    };
    useEffect(() =>{
        changeCancer()
        changeInfarctus()
        changeNonInfarctus()
    }, [smokeValue])

    const changeAlim = (event) => {
        setAlim(event.target.value);
    };
    useEffect(()=>{
        changeCancer()
        changeDiabete()
    }, [alimValue])

    const changeSport = (event) => {
        setSport(event.target.value)
        console.log("Sport : " + event.target.value)

    };
    useEffect(() =>{
        changeCancer()
        changeDiabete()
    }, [sportValue])

    const changeWeight = (event) => {
        setWeight(event.target.value);
        console.log("Weight : " + event.target.value)

    };
    useEffect(()=>{
        allAnswers.updateBMI(allAnswers.height, weightValue)
        changeDiabete()
        changeCancer()
        changeInfarctus()
        changeNonInfarctus()
    }, [weightValue])

    const changeAlcool = (event) => {
        setAlcool(event.target.value);
        console.log("Alcool : " + event.target.value)
    };
    useEffect(()=>{
        changeCancer()
    }, [alcoolValue])


    const SaveChanges = () => {
        allAnswers.updateResults(cancerRisk, diabeteRisk, infarctusRisk, nonInfarctusRisk);
        allAnswers.WriteResult(auth.currentUser.uid).then(r => {})
        mySwal.fire({
            title: <strong>Your data are saved in the database</strong>,
            icon: 'success'
        }).then(r => {})
    }

    const [avatar, setAvatar] = useState("")
    useEffect(() => {
        getAvatar();

        async function getAvatar() {
            const docRef = doc(database, "users/", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            const ava = docSnap.get("avatarURL");
            setAvatar(ava);
            console.log(ava)
        }
    }, [])

    const [risk, setRisk] = useState('')
    useEffect(() => {
        calculateRisk()

        function calculateRisk() {
            const riskCalc = cancerRisk //6-15 + 25-50
            if (riskCalc < 35)
                setRisk('low')
            else if (riskCalc < 42)
                setRisk('medium')
            else
                setRisk('high')
        }
    });

    const [actualState, setActualState] = useState('')
    useEffect(() => {
        calculateRisk()

        function calculateRisk() {
            const riskCalc = cancerRisk //6-15 + 25-50
            if (riskCalc < 35)
                setActualState('low')
            else if (riskCalc < 42)
                setActualState('medium')
            else
                setActualState('high')

            console.log(riskCalc)
        }
    }, []);


    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <div className="row" style={{display: "flex"}}>
                        <div className="column">
                            {actualState === 'low' ?
                                <div className="backgroundLow">
                                    <p>Your habits</p>
                                    {avatar !== "" && typeof avatar != "undefined" ?
                                        <div> {actualState === 'low' ?
                                            <img src={avatar} className={"imageLow"}/> :
                                            actualState === 'medium' ?
                                                <img src={avatar} className={"imageMedium"}/> :
                                                <img src={avatar} className={"imageBig"}/>
                                        }</div> :
                                        <img src={MyImage} width="200px" height="200px"></img>
                                    }
                                </div>
                                :
                                actualState === 'medium' ?
                                    <div className="backgroundMedium">
                                        <p>Your habits</p>
                                        {avatar !== "" && typeof avatar != "undefined" ?
                                            <div> {actualState === 'low' ?
                                                <img src={avatar} className={"imageLow"}/> :
                                                actualState === 'medium' ?
                                                    <img src={avatar} className={"imageMedium"}/> :
                                                    <img src={avatar} className={"imageBig"}/>
                                            }</div> :
                                            <img src={MyImage} width="200px" height="200px"></img>
                                        }
                                    </div>
                                    :
                                    <div className="backgroundHigh">
                                        <p>Your habits</p>
                                        {avatar !== "" && typeof avatar != "undefined" ?
                                            <div> {actualState === 'low' ?
                                                <img src={avatar} className={"imageLow"}/> :
                                                actualState === 'medium' ?
                                                    <img src={avatar} className={"imageMedium"}/> :
                                                    <img src={avatar} className={"imageBig"}/>
                                            }</div> :
                                            <img src={MyImage} width="200px" height="200px"></img>
                                        }
                                    </div>
                            }

                            <div className="allColumnText">
                                <h2 className="title-results">Your personal details</h2>
                                <p>Age {allAnswers.age}</p>
                                <p>Sex {allAnswers.sex < 1 ? "Femme" : "Homme"}</p>
                                <p>Height {allAnswers.height}kg</p>
                                <p>Weight {allAnswers.weight}cm</p>
                            </div>


                        </div>

                        <div className="column">
                            <div className="allColumnText">
                                <h2 className="title-results">Your habits</h2>
                                <div className="textAndSlider">
                                    <p className="child" style={{alignSelf: "start"}}> Smoker <br/> {smokeValue}</p>
                                    <input type="range" min="0" max="1" onChange={changeSmoke} value={smokeValue}
                                           step={1}
                                           className="slider"/>
                                </div>
                                <div className="textAndSlider">
                                    <p className="child" style={{alignSelf: "start"}}>Diet <br/> {switchAlim(alimValue)}
                                    </p>
                                    <input type="range" min="0" max="3" onChange={changeAlim} value={alimValue} step={1}
                                           className="slider"/>
                                </div>
                                <div className="textAndSlider">
                                    <p className="child"
                                       style={{alignSelf: "start"}}>Sport <br/> {switchSport(sportValue)}</p>
                                    <input type="range" min="0" max="3" onChange={changeSport} value={sportValue}
                                           step={1}
                                           className="slider"/>
                                </div>
                                <div className="textAndSlider">
                                    <p className="child" style={{alignSelf: "start"}}>Weight <br/> {weightValue}</p>
                                    <input type="range" min="0" max="200" onChange={changeWeight} value={weightValue}
                                           step={1} className="slider"/>
                                </div>
                                <div className="textAndSlider">
                                    <p className="child"
                                       style={{alignSelf: "start"}}>Alcool <br/> {switchAlcool(alcoolValue)}</p>
                                    <input type="range" min="0" max="4" onChange={changeAlcool} value={alcoolValue}
                                           step={1}
                                           className="slider"/>
                                </div>
                            </div>

                            {/*actualState === 'low' ?
                                <div className="backgroundLow">
                                    <p>Your habits</p>
                                    {avatar !== "" && typeof avatar != "undefined" ?
                                        <div> {actualState === 'low' ?
                                            <img src={avatar} className={"imageLow"}/> :
                                            actualState === 'medium' ?
                                                <img src={avatar} className={"imageMedium"}/> :
                                                <img src={avatar} className={"imageBig"}/>
                                        }</div> :
                                        <img src={MyImage} width="200px" height="200px"></img>
                                    }
                                </div>
                                :
                                actualState === 'medium' ?
                                    <div className="backgroundMedium">
                                        <p>Your habits</p>
                                        {avatar !== "" && typeof avatar != "undefined" ?
                                            <div> {actualState === 'low' ?
                                                <img src={avatar} className={"imageLow"}/> :
                                                actualState === 'medium' ?
                                                    <img src={avatar} className={"imageMedium"}/> :
                                                    <img src={avatar} className={"imageBig"}/>
                                            }</div> :
                                            <img src={MyImage} width="200px" height="200px"></img>
                                        }
                                    </div>
                                    :
                                    <div className="backgroundHigh">
                                        <p>Your habits</p>
                                        {avatar !== "" && typeof avatar != "undefined" ?
                                            <div> {actualState === 'low' ?
                                                <img src={avatar} className={"imageLow"}/> :
                                                actualState === 'medium' ?
                                                    <img src={avatar} className={"imageMedium"}/> :
                                                    <img src={avatar} className={"imageBig"}/>
                                            }</div> :
                                            <img src={MyImage} width="200px" height="200px"></img>
                                        }
                                    </div>*/
                            }
                        </div>


                        <div className="column">
                            {risk === 'low' ?
                                <div className="backgroundLow">
                                    <p>Your risks</p>
                                    {avatar !== "" && typeof avatar != "undefined" ?
                                        <div> {risk === 'low' ?
                                            <img src={avatar} className={"imageLow"}/> :
                                            risk === 'medium' ?
                                                <img src={avatar} className={"imageMedium"}/> :
                                                <img src={avatar} className={"imageBig"}/>
                                        }</div> :
                                        <img src={MyImage} width="200px" height="200px"></img>
                                    }
                                </div>
                                :
                                risk === 'medium' ?
                                    <div className="backgroundMedium">
                                        <p>Your risks</p>
                                        {avatar !== "" && typeof avatar != "undefined" ?
                                            <div> {risk === 'low' ?
                                                <img src={avatar} className={"imageLow"}/> :
                                                risk === 'medium' ?
                                                    <img src={avatar} className={"imageMedium"}/> :
                                                    <img src={avatar} className={"imageBig"}/>
                                            }</div> :
                                            <img src={MyImage} width="200px" height="200px"></img>
                                        }
                                    </div>
                                    :
                                    <div className="backgroundHigh">
                                        <p>Your risks</p>
                                        {avatar !== "" && typeof avatar != "undefined" ?
                                            <div> {risk === 'low' ?
                                                <img src={avatar} className={"imageLow"}/> :
                                                risk === 'medium' ?
                                                    <img src={avatar} className={"imageMedium"}/> :
                                                    <img src={avatar} className={"imageBig"}/>
                                            }</div> :
                                            <img src={MyImage} width="200px" height="200px"></img>
                                        }
                                    </div>
                            }

                            <div className="allColumnText">
                                <h2 className="title-results">Your risks</h2>
                                <p>Hearth Attack {nonInfarctusRisk} %</p>
                                <p>Infarctus {infarctusRisk} %</p>
                                <p>Diabete {diabeteRisk} %</p>
                                <p>Cancer {cancerRisk} %</p>
                            </div>

                            {auth.currentUser ? <button onClick={SaveChanges}>Save</button> : null}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResultPage
