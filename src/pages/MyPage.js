import React from "react";
import Algorithm from "../algorithm/Algorithm";
import ProgressBar from "../components/ProgressBar";
import _ from "lodash";


const v = [1, 100 ,100 ,179 , 0, 110 , 0, 5.0, 0, 3.0, 2.0, 0, 0,/*avc*/ 0, 0, 0, 0  , 2 , 2, 2];
const now=60;

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
                (100-(clonedAlgorithm.defaultAlim-clonedAlgorithm.alim)*clonedAlgorithm.modifAlimTauxInf)/100)*
                (100-(clonedAlgorithm.defaultSport-clonedAlgorithm.sport)*clonedAlgorithm.modifExerTauxInf)/100;
            clonedAlgorithm.canRate = clonedAlgorithm.CalculateCancer();
            return {algorithm: clonedAlgorithm};
        });
    }

    changeAlim = (e) => {
        this.setState(s => {
                let al = +e.target.value;
                let clonedAlgorithm = _.clone(s.algorithm);
                clonedAlgorithm.infRate = clonedAlgorithm.CalculateInfarctus()
                    *(100-(clonedAlgorithm.alim- + al)*clonedAlgorithm.modifAlimTauxInf)/100
                    *(100-(clonedAlgorithm.defaultSport-clonedAlgorithm.sport)*clonedAlgorithm.modifExerTauxInf)/100;
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
                *(100-(clonedAlgorithm.sport- + sp)*clonedAlgorithm.modifExerTauxInf)/100
                *(100-(clonedAlgorithm.defaultAlim-clonedAlgorithm.alim)*clonedAlgorithm.modifAlimTauxInf)/100;
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

    render() {
        return (
            <>
                <div className={"situation"}>
                    <h2>Your situation</h2>
                    <p>*photo avatar*</p>
                </div>
                <div className={"rhythm"}>
                    <h2>Your rhythm</h2>
                    <p>*photo avatar*</p>

                    <p>Smoker <input type={"checkbox"} placeholder={`${this.state.algorithm.fume}`} name="fume"
                                     onClick={this.handleInputBool}/><br/></p>
                    <ProgressBar name={"fume"} min={0} max={1} now={this.state.algorithm.fume*100/1}/>

                    <label>Healthy Food:</label>
                    <select name="alim" id="alim" onChange={this.changeAlim} value={this.state.algorithm.alim}>
                        <option value={0}>Never</option>
                        <option value={1}>From time to time</option>
                        <option value={2}>Frequently</option>
                        <option value={3}>Most of the time</option>
                    </select><br/>
                    <ProgressBar name={"alim"} min={0} max={3} now={this.state.algorithm.alim*100/3}/>

                    <label>Physical activity:</label>
                    <select name="sport" id="sport" onChange={this.changeSport} value={this.state.algorithm.sport}>
                        <option value={0}>I don't move around much</option>
                        <option value={1}>Half an hour of physical activity 2-3 days a week</option>
                        <option value={2}>Half an hour of physical activity 5 days a week</option>
                        <option value={3}>More than 2 hours of intense activity a week</option>
                    </select><br/>
                    <ProgressBar name={"sport"} min={0} max={3} now={this.state.algorithm.sport*100/3}/>

                    <p>Weight <input type={"number"} min={50} max={180} value={`${this.state.algorithm.poids}`} name="poids"
                                     onChange={this.changeWeight}/><br/></p>
                    <ProgressBar name={"poids"} min={50} max={180} now={(this.state.algorithm.poids-50)*100/130}/>

                    <label>Alcohol:</label>
                    <select name="alcool" id="alcool" onChange={this.changeAlcool} value={this.state.algorithm.alcool}>
                        <option value={0}>Everyday</option>
                        <option value={1}>3 to 6 days a week</option>
                        <option value={2}>1 to 2 days a week</option>
                        <option value={3}>Less than 1 day a week</option>
                        <option value={4}>I don't drink</option>
                    </select><br/>
                    <ProgressBar name={"alcool"} min={0} max={4} now={this.state.algorithm.alcool*100/4}/>
                </div>
                <div className={"risks"}>
                    <h2>Your risks</h2>
                    <p>*photo avatar*</p>
                    <p>Stroke</p> <ProgressBar now={this.state.algorithm.infRate}/>
                    <p>Diabetes</p> <ProgressBar now={this.state.algorithm.diaRate}/>
                    <p>Cancer</p> <ProgressBar now={this.state.algorithm.canRate}/>
                </div>
            </>
        )
    }
}
