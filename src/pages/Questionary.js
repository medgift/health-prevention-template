import React  from "react";

export default class Questionary extends React.Component{

        //Data about the user
        sex = 0;
        age= 0;
        weight= 0;
        height= 0;
        syst= 0;
        glyc= 0;
        chol= 0;
        diab=0;
        inf=0;
        avc= 0;

        //Data about his family
        afinf=0;
        afCancer= 0;

        //Data about his habits
        smoke= 0;
        sport= 0;
        alcool= 0;
        alim= 0;


          //calculate Data
        systAlgo = 0;
        glycAlgo = 0;
        cholAlgo = 0;
        hdlAlgo = 0;
        bmiAlgo = 0;
        sportAlgo = 0;
        alcoolAlgo = 0;
        alimAlgo = 0;

    constructor() {
        super();
        }



        updatePersonalData(sex,age,weight,heigt,syst,glyc,chol,diab,inf,avc){
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

        updateFamilyData(afinf, afcancer){
        this.afinf = afinf;
        this.afCancer = afcancer;
        }
        updateHabitsData(smoke,food,sport,alcool){
        this.smoke = smoke;
        this.alim = food;
        this.sport = sport;
        this.alcool = alcool;
        }

        calculateFinalData(){
            this.systAlgo = this.syst == 1 ? 150 : 0;
            this.glycAlgo = this.glyc == 1 ? 5.6 : 0;
            this.cholAlgo = this.chol == 1 ? 5.9 : 0;
            this.hdlAlgo = this.chol == 1 ? 0.9 : 0;
            this.bmiAlgo = Math.pow(this.weight/this.height,2);

            //TODO changement point sport etc...
        }
}