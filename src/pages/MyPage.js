import React from "react";
import Algorithm from "../algorithm/Algorithm";
import ProgressBar from "../components/ProgressBar";
import _ from "lodash";
import "./MyPage.css";

const v = [1, 39 ,100 ,179 , 0, 110 , 0, 5.0, 0, 3.0, 2.0, 0, 0,/*avc*/ 0, 0, 0, 0  , 2 , 2, 2];

export default class MyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            algorithm: new Algorithm(v)
        };
    }
    handleInputBool = (e) => {
        this.setState(s => {
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.fume = clonedAlgorithm.fume===0?1:0;
            console.log(clonedAlgorithm.infRate);
            clonedAlgorithm.infRate = (clonedAlgorithm.CalculateInfarctus()*
                (100+(clonedAlgorithm.defaultAlim-clonedAlgorithm.alim)*clonedAlgorithm.modifAlimTauxInf)/100)*
                (100+(clonedAlgorithm.defaultSport-clonedAlgorithm.sport)*clonedAlgorithm.modifExerTauxInf)/100;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            return {algorithm: clonedAlgorithm};
        });
    }

    changeAlim = (e) => {
        this.setState(s => {
                let al = +e.target.value;
                let clonedAlgorithm = _.clone(s.algorithm);
                clonedAlgorithm.infRate = clonedAlgorithm.CalculateInfarctus()
                    *(100+(clonedAlgorithm.defaultAlim- + al)*clonedAlgorithm.modifAlimTauxInf)/100
                    *(100+(clonedAlgorithm.defaultSport-clonedAlgorithm.sport)*clonedAlgorithm.modifExerTauxInf)/100;
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
                *(100+(clonedAlgorithm.defaultSport- + sp)*clonedAlgorithm.modifExerTauxInf)/100
                *(100+(clonedAlgorithm.defaultAlim-clonedAlgorithm.alim)*clonedAlgorithm.modifAlimTauxInf)/100;
            clonedAlgorithm.sport = sp;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            clonedAlgorithm.diaRate = clonedAlgorithm.CalculateDiabete();
            return {algorithm: clonedAlgorithm};
        });
    }
    changeWeight = (e) => {
        this.setState(s =>{
            let clonedAlgorithm = _.clone(s.algorithm);
            let weight = +e.target.value;
            if (weight<50)
                weight=50;
            else if(weight>180)
                weight=180
            let perfPoids = 22*Math.pow(clonedAlgorithm.taille/100,2);
            clonedAlgorithm.poids = weight;
            clonedAlgorithm.BMI = clonedAlgorithm.SetBMI();
            clonedAlgorithm.diaRate = clonedAlgorithm.CalculateDiabete()/*
                *(100-(clonedAlgorithm.poids-(weight>perfPoids?weight:Math.floor(perfPoids)))*clonedAlgorithm.modifPoidTauxDia)/100;
            console.log((100-(clonedAlgorithm.poids-(weight>perfPoids?weight:Math.floor(perfPoids)))*clonedAlgorithm.modifPoidTauxDia))*/;
            return {algorithm: clonedAlgorithm};
        });
    }
    changeAlcool = (e) => {
        this.setState(s =>{
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.alcool = e.target.value;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            return {algorithm: clonedAlgorithm};

        })
    }

    reset = () => {
        this.setState( s=>{
            let clonedAlgorithm = _.clone(s.algorithm);
            clonedAlgorithm.Reset();
            return {algorithm: clonedAlgorithm};
        })
    };



    render() {
        return (
            <>
                <h1>Your results</h1>
                {this.props.idPatient} test
                <div className={"viewGrid"}>
                    <div className={"column"}>
                        <h2>Your situation</h2>
                        <p>*photo avatar*</p>
                        <p className={"line"}>Sex: <text className={"variable"}>{this.state.algorithm.sexe?"Man":"Woman"}</text></p>
                        <p className={"line"}>Age: <text className={"variable"}>{this.state.algorithm.age} years</text></p>
                        <p className={"line"}>Height: <text className={"variable"}>{this.state.algorithm.taille} cm</text></p>
                        <p className={"line"}>Syst: <text className={"variable"}>{this.state.algorithm.syst} mmHg</text></p>
                        <p className={"line"}>Glyc: <text className={"variable"}>{this.state.algorithm.glyc} g/L</text></p>
                        <p className={"line"}>Chol: <text className={"variable"}>{this.state.algorithm.chol} g/L</text></p>
                        <p className={"line"}>HDL: <text className={"variable"}>{this.state.algorithm.hdl} g/L</text></p>
                        <p className={"line"}>Diabete: <text className={"variable"}>{this.state.algorithm.diab?"Yes":"No"}</text></p>
                        <p className={"line"}>Infarctus: <text className={"variable"}>{this.state.algorithm.inf?"Already have":"No"}</text></p>
                        <p className={"line"}>AVC: <text className={"variable"}>{this.state.algorithm.avc?"Already have":"No"}</text></p>
                        <h2>Family</h2>
                        <p className={"line"}>Infarctus: <text className={"variable"}>{this.state.algorithm.avc?"Yes":"No"}</text></p>
                        <p className={"line"}>Cancer: <text className={"variable"}>{this.state.algorithm.avc?"Yes":"No"}</text></p>

                    </div>
                    <div className={"column"}>
                        <h2>Your rhythm</h2>
                        <p>*photo avatar*</p>

                        <div>
                        <label className={"labelView"}>Smoke: </label>
                        <input type={"checkbox"} checked={this.state.algorithm.fume} placeholder={`${this.state.algorithm.fume}`} name="fume"
                                         onClick={this.handleInputBool}/></div>
                        <ProgressBar name={"fume"} min={0} max={1} bgcolor={"#1a73e8"} now={this.state.algorithm.fume*100/1}/>

                        <label className={"labelView"}>Healthy Food: </label>
                        <select className={"choicesView"} id="alim" onChange={this.changeAlim} value={this.state.algorithm.alim}>
                            <option value={0}>Never</option>
                            <option value={1}>From time to time</option>
                            <option value={2}>Frequently</option>
                            <option value={3}>Most of the time</option>
                        </select><br/>
                        <ProgressBar name={"alim"} min={0} max={3} bgcolor={"#1a73e8"} now={this.state.algorithm.alim*100/3}/>

                        <label className={"labelView"}>Physical activity: </label>
                        <select className={"choicesView"} id="sport" onChange={this.changeSport} value={this.state.algorithm.sport}>
                            <option value={0}>I don't move around much</option>
                            <option value={1}>Half an hour of physical activity 2-3 days a week</option>
                            <option value={2}>Half an hour of physical activity 5 days a week</option>
                            <option value={3}>More than 2 hours of intense activity a week</option>
                        </select><br/>
                        <ProgressBar name={"sport"} min={0} max={3} bgcolor={"#1a73e8"} now={this.state.algorithm.sport*100/3}/>

                        <label className={"labelView"}>Weight:  </label>
                        <input type={"number"} min={50} max={180} value={`${this.state.algorithm.poids}`} className={"choices"}
                                         onChange={this.changeWeight}/><br/>
                        <ProgressBar name={"poids"} min={50} max={180} bgcolor={"#1a73e8"} now={(this.state.algorithm.poids-50)*100/130}/>

                        <label className={"labelView"}>Alcohol:</label>
                        <select className={"choicesView"} id="alcool" onChange={this.changeAlcool} value={this.state.algorithm.alcool}>
                            <option value={0}>Everyday</option>
                            <option value={1}>3 to 6 days a week</option>
                            <option value={2}>1 to 2 days a week</option>
                            <option value={3}>Less than 1 day a week</option>
                            <option value={4}>I don't drink</option>
                        </select><br/>
                        <ProgressBar name={"alcool"} min={0} max={4} bgcolor={"#1a73e8"} now={this.state.algorithm.alcool*100/4}/>
                        {
                            this.state.algorithm.poids!=this.state.algorithm.defaultPoids ||
                            this.state.algorithm.alim!=this.state.algorithm.defaultAlim ||
                            this.state.algorithm.sport!=this.state.algorithm.defaultSport ||
                            this.state.algorithm.alcool!=this.state.algorithm.defaultAlcool ||
                            this.state.algorithm.fume!=this.state.algorithm.defaultFume?
                            <button className={"resetButton"} onClick={this.reset}>Reset my rythm</button>:<></>
                        }
                    </div>
                    <div className={"column"}>
                        <h2>Your risks</h2>
                        <p>*photo avatar*</p>
                        <p className={"line"}>Stroke: <text id={"result"} className={"variable"}>{Math.floor(this.state.algorithm.infRate)}%</text></p>
                        <ProgressBar bgcolor={"#25FDE9"} now={this.state.algorithm.infRate}/>

                        <p className={"line"}>Diabetes: <text id={"result"} className={"variable"}>{Math.floor(this.state.algorithm.diaRate)}%</text></p>
                        <ProgressBar bgcolor={"#90EE90"} now={this.state.algorithm.diaRate}/>

                        <p className={"line"}>Cancer: <text id={"result"} className={"variable"}>{Math.floor(this.state.algorithm.canRate)}%</text></p>
                        <ProgressBar bgcolor={"#FFE436"} now={this.state.algorithm.canRate}/>

                    </div>
                </div>

            </>
        )
    }
}
