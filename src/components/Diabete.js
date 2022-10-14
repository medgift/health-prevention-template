export class Diabete {
    constructor({ sex, age, height, weight, systolic,glyc, physical,alim }) {
        this.gender = sex;
        this.age = age
        this.height = height;
        this.weight = weight;
        this.highBloodPressure = systolic;
        this.highBloodSugar = glyc>0?true:false;
        this.sport = physical;
        this.alim = alim;
    
      }

    pointsF = [0,1,1,1,1,1,1,2,3,5,7,11,15,21,28,36,46,58,71,86,100,100,100];
    pointsM = [0,0,0,0,0,0,1,2,4,7,11,15,21,28,36,46,58,71,86,100,100,100,100];

    #getAgePoints(age) {
        if(age < 45)
        {
            return 1;
        }else if(age >= 45 && age <= 54)
        {
            return 2;
        }
        return 3;
    }

    #getBMIPoints(weight,height) {
        let bmi = Math.round(weight / Math.pow(height/100, 2));

        if(bmi < 27)
        {
            return 1;
        }else if(bmi >= 27 && bmi <= 30)
        {
            return 2;
        }
        return 3;
    }

    #getHighBloodPressurePoints (highBloodPressure) {
        if(highBloodPressure == 1)
        {
            return 2;
        }
        return 0;
    }

    #getHighBloodSugarPoints(highBloodSugar) {
        if(highBloodSugar == 1)
        {
            return 5;
        }
        return 0;
    }

    #getSportPoints(sport) {
        let points = 4 - sport;
        return points;
    }

    #getAlimPoints(alim) {
        let points = 4 - alim;
        return points;
    }

    resultCalc() {
        let points = this.#getAgePoints(this.age) + this.#getBMIPoints(this.weight,this.height) + 3
                    + this.#getHighBloodPressurePoints(this.highBloodPressure) + this.#getHighBloodSugarPoints(this.highBloodSugar) +
                    + this.#getSportPoints(this.sport) + this.#getAlimPoints(this.alim);
        let result = this.pointsF[points];
        if(this.gender === 1)
        {
            result =  this.pointsM[points]
        }

        return result>100 ? 100:result
         
    }



}