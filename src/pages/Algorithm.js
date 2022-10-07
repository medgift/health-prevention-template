import React  from "react";

export default class Algorithm extends React.Component{

    constructor() {
        super();
    }

    infarctusCoeff = [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854]

    // Constant for the risk calculation, to choose the right column we used the sex variable
    diabteConst = [[0.0226,0.0209],[0.2333,0.1167],[0.8209,0.1316]]

    result = 0
    totalPointDiabete = 0
    riskDiabete = 0


    NonInfractus(age, smoke, systo, Chol, hdl, afinf,sex){

        // The 9th first element (0-8) are for the coeff and
        // the 11 and 12(index 9-10) is for the formule line and the 12 is for the final risk
        let Coeff =[[0.4648,0.3742], [0.7744,0.6012],[0.3131,0.2777],[0.1002,0.1458],[-0.2606,-0.2698]
                ,[-0.1088,-0.0755],[-0.0277,-0.0255],[-0.0226,-0.0281],[0.0613,0.0426],[0.9776,0.9605],[-0.738,-0.5699],[0.7019,0.7476]]
        let risk = 0

        let ageCalcul = (age-60)/5
        let systoCalcul = (systo-120)/20
        let CholCalcul =  Chol-6
        let hdlCalcul = (hdl-1.30)/0.5

        let calcul = [ageCalcul,smoke,systoCalcul,CholCalcul,hdlCalcul,smoke * ageCalcul, ageCalcul  * systoCalcul,
                        ageCalcul * CholCalcul, ageCalcul *hdl]
        for(var i = 0; i < calcul.length-1; i++){
            risk += Coeff[i][sex] * calcul[i]
        }

        let formule = (1-Math.pow(Coeff[9][sex],Math.exp(risk)))
        let finalRisk = (1-Math.exp(-Math.exp(Coeff[10][sex]+
            Coeff[11][sex]*Math.log(-Math.log(1-formule)))))

        return (formule + finalRisk)*100
    }

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
        }
        return (1-(Math.pow(0.61785,Math.exp(this.result-2.0869)))) * 100
    }

    Diabete(sex, age, bmi, tension,gly, phys, alim){
        this.totalPointDiabete = age + bmi + tension + gly + phys + alim + 3
        return this.totalPointDiabete > 19 ?  100 :  Math.round(Math.pow(this.totalPointDiabete,3) * this.diabteConst[0][sex] - Math.pow(this.totalPointDiabete,2) *
            this.diabteConst[1][sex] + this.totalPointDiabete * this.diabteConst[2][sex] - 3*Math.exp(-13))
    }


    render() {
        return (
          this.Infarctus(70,0,0,110,0,0,3.5,1.9,0,120,0.1)+ " %" +
          this.Cancer(0,0,28,3,3,2) + 
          this.Diabete(0,1,0,0,5,4,1) + " %" +
          this.NonInfractus(12,1,120,6.3,1.4,1,1) + " %");
    }
}





