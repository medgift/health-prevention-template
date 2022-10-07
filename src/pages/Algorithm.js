import React  from "react";

export default class Algorithm extends React.Component{

    constructor() {
        super();
    }

    infarctusCoeff = [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854]
    result = 0

    cancerCoeff = [1.0,1.0,0.5,0.5,0.5,0.5]
    resultCancer = 0

    Cancer(afCancer, fume, bmi, sport, alcool, alim){
        
        //Take the props and stock them in varaibles
        let pSport = sport;
        let pAlcool = alcool;
        let pAlim = alim;

        //Calculate Points/Score of Alimm, Sport, Alcool
        pSport = (sport/3)*100;
        pAlcool = (alcool/4)*100;
        pAlim = (alim/3)*100;

        //Stock the variables in a tab
        var cancerVar = [afCancer, fume, bmi, pSport, pAlcool, pAlim];
        var sumCoefficient = 0;
        
        //Find the Total of Cancer Coefficient
        for(var i = 0; i < cancerVar.length; i++){
            sumCoefficient += this.cancerCoeff[i];
        }

        //Calculate the Value of Risk of getting Cancer
        for(var i = 0; i < cancerVar.length; i++) {
            this.resultCancer += ((this.cancerCoeff[i] * cancerVar[i])/sumCoefficient);
        }

        //+ 9  is the base risk of getting cancer
        return Math.round(this.resultCancer+9) ;
       
    }



    Infarctus(age, sex, fume, syst, dm, inf, chol, hdl,totalCHOL, eGRF,CRP) {
        for (var i = 0; i < arguments.length; i++) {
            this.result += this.infarctusCoeff[i] * arguments[i]
            console.log(this.result)
        }
        return this.OutputRisk(this.result)
    }


    OutputRisk(value) {
        return (1-(Math.pow(0.61785,Math.exp(value-2.0869)))) * 100
    }

    render() {
        return (
          this.Infarctus(70,0,0,110,0,0,3.5,1.9,0,120,0.1)+ " %" +
          this.Cancer(0,0,28,3,3,2));

    }
}





