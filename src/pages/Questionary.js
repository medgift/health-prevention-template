import React  from "react";

export default class Algorithm extends React.Component{

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
}