import React from "react";
import Algorithm from "./Algorithm";
import Questionnary from "./Questionnary"
import {doc, setDoc} from "firebase/firestore";
import {database} from "../initFirebase";

export default class ShowResult extends React.Component {

    myAlgo;
    userAnswer;

    constructor(props,questionnary) {
        super(props);
        this.handlClick = this.handlClick.bind(this);
        this.myAlgo = new Algorithm(this.props,0,70,0,110,3.5,1.9,1,0,28,3,3,2,0,5,0,0,1)
        this.userAnswer = new Questionnary();

        this.userAnswer.updatePersonalData(0,70,180,170,0,1,1,0,1,0);
        this.userAnswer.updateFamilyData(0,0);
        this.userAnswer.updateHabitsData(1,2,3,2)

        this.userAnswer.calculateFinalData()
    }

    async WriteResult() {
        try {
            await setDoc(doc(database, "answers/"  + 2 + "/data/" + Date.now()), {
                answer: {
                    afcancer: this.userAnswer.afCancer,
                    afinf: this.userAnswer.afinf,
                    age: this.userAnswer.age,
                    alcool: this.userAnswer.alcoolAlgo,
                    avc: this.userAnswer.avc,
                    date: Date.now(),
                    diab: this.userAnswer.diab,
                    diet: this.userAnswer.alimAlgo,
                    glyc: this.userAnswer.glycAlgo,
                    hdl: this.userAnswer.hdlAlgo,
                    height: this.userAnswer.height,
                    weight: this.userAnswer.weight,
                    inf: this.userAnswer.inf,
                    sex: this.userAnswer.sex,
                    smoking: this.userAnswer.smoke,
                    sport: this.userAnswer.sportAlgo,
                    syst: this.userAnswer.systAlgo,
                    resultCancer: this.myAlgo.resultCancer,
                    resultDiabete: this.myAlgo.resultDiabete,
                    resultInfarctus: this.myAlgo.resultInfarctus,
                    resultNonInfarctus: this.myAlgo.resultNonInfarctus
                }
            });
            console.log("Write success")
        } catch (e) {
            console.log(e)
        }

    }

    handlClick = () =>{
        this.WriteResult().then(r => {})
      }

render() {
        return(
        <div>
            <h1>You will die</h1>
            <p style={{color: this.myAlgo.resultDiabete > 20 ? 'red' : 'black'}}>{this.myAlgo.resultDiabete} % of diabete</p>
            <p style={{color: this.myAlgo.resultCancer > 20 ? 'red' : 'black'}}>{this.myAlgo.resultCancer} % of cancer</p>
            <p style={{color: this.myAlgo.resultInfarctus > 20 ? 'red' : 'black'}}>{this.myAlgo.resultInfarctus} % of infarctus</p>
            <p style={{color: this.myAlgo.resultNonInfarctus > 20 ? 'red' : 'black'}}>{this.myAlgo.resultNonInfarctus} % of non infarctus</p>
            <button onClick={this.handlClick}></button>
        </div>
        )
    }
}