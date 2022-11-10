import React, {useEffect, useState} from "react";
import Algorithm from "../algorithm/Algorithm";
import ProgressBar from "../components/ProgressBar";
import CircularProgressBar from "../components/CircularProgressBar"
import _ from "lodash";
import "../css/MyPage.css";
import {ResponseDB} from "../DAL/ResponseDB";
import NiceAvatar, {genConfig} from "react-nice-avatar";
import {PatientDB} from "../DAL/PatientDB";

export function ResultHistoric({patientId, setBackgroundImage}) {
    const [userResponses, setUserResponses] = useState([]);
    useEffect(() => {
        async function loadResponses() {
            setUserResponses(await ResponseDB.prototype.getResponsesByUser(patientId));
        }
        loadResponses();
    }, [patientId]);
    return <>
        {userResponses.map((r) => (
            <MyPage key={r.dateFilled.seconds} patientResponse={r} setBackgroundImage={setBackgroundImage}/>
        ))}
    </>
}

export default function LatestResult({patientId, setBackgroundImage}) {
    const [latestResponse, setLatestResponse] = useState(null);
    useEffect(() => {
        async function loadLatestResponse() {
            setLatestResponse(await ResponseDB.prototype.getLatestResponseByUser(patientId));
        }
        loadLatestResponse();
    }, [patientId]);
    return <>
        <MyPage patientResponse={latestResponse} setBackgroundImage={setBackgroundImage} patientId={patientId}/>
    </>
}


const v = [1, 46, 100, 179, 0, 110, 0, 5.0, 0, 3.0, 2.0, 0, 0,/*avc*/ 0, 0, 0, 0, 2, 2, 2];
const defaultConfig = {
    "sex": "man",
    "faceColor": "#f5d6a1",
    "earSize": "small",
    "eyeStyle": "circle",
    "noseStyle": "short",
    "mouthStyle": "laugh",
    "shirtStyle": "hoody",
    "glassesStyle": "none",
    "hairColor": "#000000",
    "hairStyle": "normal",
    "hatStyle": "none",
    "hatColor": "#000000",
    "eyeBrowStyle": "up",
    "shirtColor": "#000000",
    "bgColor": "white",
};

export class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            algorithm: new Algorithm(v),
            config: defaultConfig,
            date: "Want you very own result ? Fill in the questionnaire !"
        }

    }


    componentDidMount() {
        this.props.setBackgroundImage(null);
        this.getAvatar();
        this.updateState();
        this.updateSmoke();
        this.updateDrinks();
        this.updateCanRate();
        this.updateDiaRate();
        this.updateInfRate();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.patientResponse !== this.props.patientResponse)
            this.updateState();

        if (prevProps.patientId !== this.props.patientId)
            this.getAvatar();

        //update computed fields
        this.updateSmoke();
        this.updateDrinks();
        this.updateCanRate();
        this.updateDiaRate();
        this.updateInfRate();
    }

    updateState() {
        //if patient has not filled in a questionnaire yet, display default data
        if (this.props.patientResponse === null || this.props.patientResponse === undefined){
            return;
        }
        this.state.date = this.formatDate(this.props.patientResponse.dateFilled);
        let list = this.props.patientResponse.responses;
        let answers = [list.Gender, list.Age, list.Poids, list.Taille, list.SystBool,
            list.Syst, list.GlycBool, list.Glyc, list.CholBool, list.Chol, list.HDL, list.DIAB,
            list.Inf, list.Avc, list.Afinf, list.Afcancer, list.Fume, list.Alim, list.Sport, list.Alcool]
        this.setState({
            algorithm: new Algorithm(answers)
        });
    }

    formatDate(dateSeconds) {
        let date = new Date(dateSeconds.seconds * 1000);
        //month in js goes from 0-11 that's why one is added for proper display
        return "Filled on the " + date.getDate() + "/" + (date.getMonth() + 1) + "/" +
            date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes();
    }

    handleInputBool = (e) => {
        this.setState(s => {
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.fume = clonedAlgorithm.fume === 0 ? 1 : 0;
            console.log(clonedAlgorithm.infRate);
            clonedAlgorithm.infRate = (clonedAlgorithm.CalculateInfarctus() *
                    (100 + (clonedAlgorithm.defaultAlim - clonedAlgorithm.alim) * clonedAlgorithm.modifAlimTauxInf) / 100) *
                (100 + (clonedAlgorithm.defaultSport - clonedAlgorithm.sport) * clonedAlgorithm.modifExerTauxInf) / 100;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            return {algorithm: clonedAlgorithm};
        });
    }

    changeAlim = (e) => {
        this.setState(s => {
            let al = +e.target.value;
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.infRate = clonedAlgorithm.CalculateInfarctus()
                * (100 + (clonedAlgorithm.defaultAlim - +al) * clonedAlgorithm.modifAlimTauxInf) / 100
                * (100 + (clonedAlgorithm.defaultSport - clonedAlgorithm.sport) * clonedAlgorithm.modifExerTauxInf) / 100;
            clonedAlgorithm.alim = al;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            clonedAlgorithm.diaRate = clonedAlgorithm.CalculateDiabete();
            return {algorithm: clonedAlgorithm};
        });
    };

    changeSport = (e) => {
        this.setState(s => {
            let sp = +e.target.value;
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.infRate = clonedAlgorithm.CalculateInfarctus()
                * (100 + (clonedAlgorithm.defaultSport - +sp) * clonedAlgorithm.modifExerTauxInf) / 100
                * (100 + (clonedAlgorithm.defaultAlim - clonedAlgorithm.alim) * clonedAlgorithm.modifAlimTauxInf) / 100;
            clonedAlgorithm.sport = sp;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            clonedAlgorithm.diaRate = clonedAlgorithm.CalculateDiabete();
            return {algorithm: clonedAlgorithm};
        });
    }
    changeWeight = (e) => {
        this.setState(s => {
            let clonedAlgorithm = _.clone(s.algorithm);
            let weight = +e.target.value;
            if (weight < 50)
                weight = 50;
            else if (weight > 180)
                weight = 180
            let perfPoids = 22 * Math.pow(clonedAlgorithm.taille / 100, 2);
            clonedAlgorithm.poids = weight;
            clonedAlgorithm.BMI = clonedAlgorithm.SetBMI();
            clonedAlgorithm.diaRate = clonedAlgorithm.CalculateDiabete()/*
                *(100-(clonedAlgorithm.poids-(weight>perfPoids?weight:Math.floor(perfPoids)))*clonedAlgorithm.modifPoidTauxDia)/100;
            console.log((100-(clonedAlgorithm.poids-(weight>perfPoids?weight:Math.floor(perfPoids)))*clonedAlgorithm.modifPoidTauxDia))*/;
            return {algorithm: clonedAlgorithm};
        });
    }
    changeAlcool = (e) => {
        this.setState(s => {
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.alcool = e.target.value;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            return {algorithm: clonedAlgorithm};

        })
    }

    reset = () => {
        this.setState(s => {
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.Reset();
            return {algorithm: clonedAlgorithm};
        })

    }

    async getAvatar() {
        //if no user is connected do not read avatar config
        if (this.props.patientId === null)
            return;
        const patientData = await PatientDB.prototype.getPatientById(this.props.patientId);
        //if user has no avatar, display default avatar config
        if (typeof patientData.avatarConfig === "undefined")
            return;
        patientData.avatarConfig.mouthStyle = "peace";
        patientData.avatarConfig.shape = null;
        patientData.avatarConfig.bgColor = "gray";
        const myConfig = genConfig(patientData.avatarConfig);
        this.setState({
            config: myConfig
        })
    }

    setDrinksHidden() {
        document.getElementById("drink1Img").style.visibility = "hidden"
        document.getElementById("drink2Img").style.visibility = "hidden"
        document.getElementById("drink3Img").style.visibility = "hidden"
    }

    updateDrinks() {
        this.setDrinksHidden();
        switch (this.state.algorithm.alcool) {
            case "0":
                document.getElementById("drink3Img").style.visibility = "visible"
                break;
            case "1":
                document.getElementById("drink2Img").style.visibility = "visible"
                break;
            case "2":
                document.getElementById("drink1Img").style.visibility = "visible"
                break;
        }

    }

    updateSmoke() {
        if (this.state.algorithm.fume) {
            document.getElementById("smokeImg").style.visibility = "visible"

        } else {
            document.getElementById("smokeImg").style.visibility = "hidden"

        }
    }

    updateDiaRate() {
        if (this.state.algorithm.diaRate > 50) {
            document.getElementById("diabeteImg").style.visibility = "visible"

        } else {
            document.getElementById("diabeteImg").style.visibility = "hidden"

        }
    }

    updateCanRate() {
        if (this.state.algorithm.canRate > 50) {
            document.getElementById("cancerImg").style.visibility = "visible"

        } else {
            document.getElementById("cancerImg").style.visibility = "hidden"

        }
    }

    updateInfRate() {
        if (this.state.algorithm.infRate > 50) {
            document.getElementById("infarctusImg").style.visibility = "visible"

        } else {
            document.getElementById("infarctusImg").style.visibility = "hidden"

        }
    }


    render() {
        return (
            <>
                <h5>{this.state.date}</h5>
                <div className={"viewGrid"}>
                    <div className={"column"}>
                        <h2>Situation</h2>
                        <div className={"divAvatar"}>
                            <NiceAvatar className={"avatar"} shape={"rounded"}
                                        bgColor={"lightgray"} {...this.state.config}/>
                        </div>
                        <p className={"line"}>Sex: <span
                            className={"variable"}>{this.state.algorithm.sexe ? "Man" : "Woman"}</span></p>
                        <p className={"line"}>Age: <span className={"variable"}>{this.state.algorithm.age} years</span>
                        </p>
                        <p className={"line"}>Height: <span
                            className={"variable"}>{this.state.algorithm.taille} cm</span></p>
                        <p className={"line"}>Syst: <span className={"variable"}>{this.state.algorithm.syst} mmHg</span>
                        </p>
                        <p className={"line"}>Glyc: <span className={"variable"}>{this.state.algorithm.glyc} mmol/L</span>
                        </p>
                        <p className={"line"}>Chol: <span className={"variable"}>{this.state.algorithm.chol} mmol/L</span>
                        </p>
                        <p className={"line"}>HDL: <span className={"variable"}>{this.state.algorithm.hdl} mmol/L</span>
                        </p>
                        <p className={"line"}>Diabete: <span
                            className={"variable"}>{this.state.algorithm.diab ? "Yes" : "No"}</span></p>
                        <p className={"line"}>Infarctus: <span
                            className={"variable"}>{this.state.algorithm.inf ? "Already have" : "No"}</span></p>
                        <p className={"line"}>AVC: <span
                            className={"variable"}>{this.state.algorithm.avc ? "Already have" : "No"}</span></p>
                        <h2>Family</h2>
                        <p className={"line"}>Infarctus: <span
                            className={"variable"}>{this.state.algorithm.afinf ? "Yes" : "No"}</span></p>
                        <p className={"line"}>Cancer: <span
                            className={"variable"}>{this.state.algorithm.afcancer ? "Yes" : "No"}</span></p>

                    </div>
                    <div className={"column"}>
                        <h2>Rhythm</h2>
                        <div className={"divAvatar"}>
                            <NiceAvatar className={"avatar"} shape={"rounded"}
                                        bgColor={"lightgray"} {...this.state.config}/>
                            <img id={"drink1Img"} className={"imgAvatar"} src={"results/drink1.png"}/>
                            <img id={"drink2Img"} className={"imgAvatar"} src={"results/drink2.png"}/>
                            <img id={"drink3Img"} className={"imgAvatar"} src={"results/drink3.png"}/>
                            <img id={"smokeImg"} className={"imgAvatar"} src={"results/smoke.png"}/>
                        </div>
                        <div>
                            <label className={"labelView"}>Smoke: </label>
                            <input type={"checkbox"} checked={this.state.algorithm.fume}
                                   placeholder={`${this.state.algorithm.fume}`} name="fume"
                                   onChange={this.handleInputBool}/></div>
                        <ProgressBar name={"fume"} min={0} max={1} bgcolor={"#1a73e8"}
                                     now={this.state.algorithm.fume * 100 / 1}/>

                        <label className={"labelView"}>Healthy Food: </label>
                        <select className={"choicesView"} id="alim" onChange={this.changeAlim}
                                value={this.state.algorithm.alim}>
                            <option value={0}>Never</option>
                            <option value={1}>From time to time</option>
                            <option value={2}>Frequently</option>
                            <option value={3}>Most of the time</option>
                        </select><br/>
                        <ProgressBar name={"alim"} min={0} max={3} bgcolor={"#1a73e8"}
                                     now={this.state.algorithm.alim * 100 / 3}/>

                        <label className={"labelView"}>Physical activity: </label>
                        <select className={"choicesView"} id="sport" onChange={this.changeSport}
                                value={this.state.algorithm.sport}>
                            <option value={0}>I don't move around much</option>
                            <option value={1}>Half an hour of physical activity 2-3 days a week</option>
                            <option value={2}>Half an hour of physical activity 5 days a week</option>
                            <option value={3}>More than 2 hours of intense activity a week</option>
                        </select><br/>
                        <ProgressBar name={"sport"} min={0} max={3} bgcolor={"#1a73e8"}
                                     now={this.state.algorithm.sport * 100 / 3}/>

                        <label className={"labelView"}>Weight: </label>
                        <input type={"number"} min={50} max={180} value={`${this.state.algorithm.poids}`}
                               className={"choices"}
                               onChange={this.changeWeight}/><br/>
                        <ProgressBar name={"poids"} min={50} max={180} bgcolor={"#1a73e8"}
                                     now={(this.state.algorithm.poids - 50) * 100 / 130}/>

                        <label className={"labelView"}>Alcohol:</label>
                        <select className={"choicesView"} id="alcool" onChange={this.changeAlcool}
                                value={this.state.algorithm.alcool}>
                            <option value={0}>Everyday</option>
                            <option value={1}>3 to 6 days a week</option>
                            <option value={2}>1 to 2 days a week</option>
                            <option value={3}>Less than 1 day a week</option>
                            <option value={4}>I don't drink</option>
                        </select><br/>
                        <ProgressBar name={"alcool"} min={0} max={4} bgcolor={"#1a73e8"}
                                     now={this.state.algorithm.alcool * 100 / 4}/>
                        {
                            (this.state.algorithm.poids != this.state.algorithm.defaultPoids ||
                            this.state.algorithm.alim != this.state.algorithm.defaultAlim ||
                            this.state.algorithm.sport != this.state.algorithm.defaultSport ||
                            this.state.algorithm.alcool != this.state.algorithm.defaultAlcool ||
                            this.state.algorithm.fume != this.state.algorithm.defaultFume) &&
                                <button className={"resetButton"} onClick={this.reset}>Reset my rhythm</button>
                        }
                    </div>
                    <div className={"column"}>
                        <h2>Risks</h2>
                        <div className={"divAvatar"}>
                            <NiceAvatar className={"avatar"} shape={"rounded"}
                                        bgColor={"lightgray"} {...this.state.config}/>
                            <img id={"infarctusImg"} className={"imgAvatar"} src={"results/heart.png"}/>
                            <img id={"diabeteImg"} className={"imgAvatar"} src={"results/sugar.png"}/>
                            <img id={"cancerImg"} className={"imgAvatar"} src={"results/cancer.png"}/>
                        </div>
                        <center>
                            <h3 className={"disease"}>Infarctus rate</h3>
                            <CircularProgressBar
                                strokeWidth="13"
                                sqSize="120"
                                color={"#25FDE9"}
                                percentage={this.state.algorithm.infRate>100 ? 100:Math.floor(this.state.algorithm.infRate)}/>
                        </center>
                        <center>
                            <h3 className={"disease"}>Diabetes rate</h3>
                            <CircularProgressBar
                                strokeWidth="13"
                                sqSize="120"
                                color={"#90EE90"}
                                percentage={this.state.algorithm.diaRate>100 ? 100:Math.floor(this.state.algorithm.diaRate)}/>
                        </center>
                        <center>
                            <h3 className={"disease"}>Cancer rate</h3>
                            <CircularProgressBar
                                strokeWidth="13"
                                sqSize="120"
                                color={"#FFE436"}
                                percentage={this.state.algorithm.canRate>100 ? 100: Math.floor(this.state.algorithm.canRate)}/>
                        </center>
                    </div>
                </div>

            </>
        )
    }
}
