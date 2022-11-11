import React  from "react";
import {doc, setDoc} from "firebase/firestore";
import { database } from '../initFirebase.js';

export default class Algorithm extends React.Component{

    constructor(props) {
        super(props);
    }
    // Constant for the risk calculation, to choose the right column we used the sex variable
    NonInfractus(age, smoke, systolique, chol, hdl, afinf,sex){

        // The 9th first element (0-8) are for the coeff and
        // the 11 and 12(index 9-10) is for the formule line and the 12 is for the final risk
        let Coeff =[[0.4648,0.3742], [0.7744,0.6012],[0.3131,0.2777],[0.1002,0.1458],[-0.2606,-0.2698]
                ,[-0.1088,-0.0755],[-0.0277,-0.0255],[-0.0226,-0.0281],[0.0613,0.0426],[0.9776,0.9605],[-0.738,-0.5699],[0.7019,0.7476]]
        let risk = 0

        let ageCalcul = (age-60)/5
        let systoCalcul = (systolique-120)/20
        let CholCalcul =  chol-6
        let hdlCalcul = (hdl-1.30)/0.5

        let calcul = [ageCalcul,smoke,systoCalcul,CholCalcul,hdlCalcul,smoke * ageCalcul, ageCalcul  * systoCalcul,
                        ageCalcul * CholCalcul, ageCalcul *hdlCalcul]
        for(var i = 0; i < calcul.length; i++){
            risk += Coeff[i][sex] *  calcul[i]
        }

        let formule = (1-Math.pow(Coeff[9][sex],Math.exp(risk)))
        let finalRisk = (1-Math.exp(-Math.exp(Coeff[10][sex]+
            Coeff[11][sex]*Math.log(-Math.log(1-formule))))) * 100

         return Math.round((finalRisk * 1.3) * 100)/100
    }

    Cancer(afCancer, smoke, bmi, sport, alcool, alim){
        let cancerCoeff = [1.0,1.0,0.5,0.5,0.5,0.5]
        let resultCancer = 0
        //Take the props and stock them in varaibles
        let pSport = sport;
        let pAlcool = alcool;
        let pAlim = alim;

        //Calculate Points/Score of Alim, Sport, Alcool
        pSport = (sport/3)*100;
        pAlcool = (alcool/4)*100;
        pAlim = (alim/3)*100;

        //Stock the variables in a tab
        var cancerVar = [afCancer, smoke, bmi, pSport, pAlcool, pAlim];
        var sumCoefficient = 0;
        
        //Find the Total of Cancer Coefficient
        for(let i = 0; i < cancerVar.length; i++){
            sumCoefficient += cancerCoeff[i];
        }

        //Calculate the Value of Risk of getting Cancer
        for(let i = 0; i < cancerVar.length; i++) {
            resultCancer += ((cancerCoeff[i] * cancerVar[i])/sumCoefficient);
        }
        //+ 9  is the base risk of getting cancer
        return Math.round((resultCancer+9)*100)/100 ;
    }

    Infarctus(age, sex, smoke, systolique, diab, inf, chol, hdl) {
        let result = 0
        let coeff= [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854]
        for (let i = 0; i < arguments.length; i++) {
            result += coeff[i] * arguments[i]
        }
        let tot = result + coeff[9]*120 + coeff[10] * -1
        let res = Math.round(((1-(Math.pow(0.61785,Math.exp(tot-2.0869))))* 100)*100)/100;
        return res;
    }

    Diabete(sex, age, bmi, tension, glyc, sport, alim){
        let totalPointDiabete = 0;
        console.log("BMI : " + bmi)
        let diabteConst = [[0.0226,0.0209],[0.2333,0.1167],[0.8209,0.1316]]
        let pointAge = age < 45 ? 1 : age < 56 ? 2 : 3
        let pointBMI = bmi < 27 ? 1 : bmi < 31 ? 2 : 3

        totalPointDiabete = +pointAge + +pointBMI + +tension + +glyc + +sport + +alim +3

        let tot =  totalPointDiabete > 19 ?  100 :  Math.round(Math.pow(totalPointDiabete,3) * diabteConst[0][sex] - Math.pow(totalPointDiabete,2) *
            diabteConst[1][sex] + totalPointDiabete * diabteConst[2][sex] - 3*Math.exp(-13))

        return tot;
    }
}





