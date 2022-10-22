import React  from "react";
import {doc, setDoc} from "firebase/firestore";
import {database} from "../initFirebase";


export default class WriteAnswer extends React.Component{

    //Data about the user
    sex = -1;
    age= -1;
    weight= -1;
    height= -1;
    syst= -1;
    glyc= -1;
    chol= -1;
    diab= -1;
    inf= -1;
    avc= -1;

    //Data about his family
    afinf=-1;
    afCancer= -1;

    //Data about his habits
    smoke= -1;
    sport= -1;
    alcool= -1;
    alim= -1;

    //calculate Data
    systAlgo = -1;
    glycAlgo = -1;
    cholAlgo = -1;
    hdlAlgo = -1;
    bmiAlgo = -1;
    sportAlgo = -1;
    alcoolAlgo = -1;
    alimAlgo = -1;

    updatePersonalData = (sex,age,weight,heigt,syst,glyc,chol,diab,inf,avc) => {
        this.sex = sex;
        this.age = age;
        this.weight = weight;
        this.height = heigt;
        this.syst = syst;
        this.glyc = glyc;
        this.chol = chol;
        this.diab = diab;
        this.inf = inf;
        this.avc = avc;
    }

    updateFamilyData = (afinf, afcancer) =>{
        this.afinf = afinf;
        this.afCancer = afcancer;
    }
    updateHabitsData = (smoke,food,sport,alcool) =>{
        this.smoke = smoke;
        this.alim = food;
        this.sport = sport;
        this.alcool = alcool;
    }

    updateBMI(height, weight){
        this.bmiAlgo = Math.pow(weight/height,2);
    }

    calculateFinalData = () =>{
        this.systAlgo = this.syst == 1 ? 150 : 0;
        this.glycAlgo = this.glyc == 1 ? 5.6 : 0;
        this.cholAlgo = this.chol == 1 ? 5.9 : 0;
        this.hdlAlgo = this.chol == 1 ? 0.9 : 0;
        this.bmiAlgo = Math.pow(this.weight/this.height,2);
        this.sportAlgo = this.sport;
        this.alcoolAlgo = this.alcool;
        this.alimAlgo = this.alim;
        //TODO changement point sport etc...
    }

    async WriteResult() {
        try {
            await setDoc(doc(database, "answers/"  + 3), {
                afcancer: this.afCancer,
                afinf: this.afinf,
                age: this.age,
                alcool: this.alcoolAlgo,
                avc: this.avc,
                date: Date.now(),
                diab: this.diab,
                diet: this.alimAlgo,
                glyc: this.glycAlgo,
                hdl: this.hdlAlgo,
                height: this.height,
                weight: this.weight,
                inf: this.inf,
                sex: this.sex,
                smoking: this.smoke,
                sport: this.sportAlgo,
                syst: this.systAlgo,
                RISK:{
                    resultCancer: 0,
                    resultDiabete: 0,
                    resultInfarctus: 0,
                    resultNonInfarctus: 0
                }
            });
            console.log("Write success")
        } catch (e) {
            console.log(e)
        }
    }
}