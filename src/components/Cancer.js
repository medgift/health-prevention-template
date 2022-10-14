import React from "react";

export class Cancer {
    constructor({ afcancer, smoke, height, weight, physical,alim, alcohol }) {
        this.afcancer = afcancer;
        this.alcohol = alcohol
        this.smoke = smoke;
        this.height = height;
        this.weight = weight;
        this.sport = physical;
        this.alim = alim;
    
      }
    

    #getAfCancerPercent(afcancer) {
        if(afcancer == 1)
        {
            return 25
        }
        return 0
    }

    #getSmokePercent(smoke) {
        if(smoke == 1)
        {
            return 25
        }
        return 0
    }

    #getBMIPercent(weight, height) {
        let bmi = Math.round(weight / Math.pow(height/100, 2));
        let percent = ((((bmi-25)/10)*0.5)/4)*100;

        return percent;
    }

    #getSportPercent(sport) {
        let score = 3 - sport;
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }

    #getAlcoholPercent(alcohol) {
        let score = 4 - alcohol;
        let percent = (((score/4)*0.5)/4)*100;

        return percent;
    }

    #getAlimPercent(alim) {
        let score = 3 - alim;
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }

    resultCalc() {
        let risk = Math.round(this.#getAfCancerPercent(this.afcancer) + this.#getSmokePercent(this.smoke) + this.#getBMIPercent(this.weight,this.height) +
                    this.#getSportPercent(this.sport) + this.#getAlcoholPercent(this.alcohol) + this.#getAlimPercent(this.alim) + 9);

        return risk>100?100:risk;
    }

}

