class Cancer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            afcancer: 1,
            smoke: 1,
            height: 180,
            weight: 90,
            sport: 3,
            alcohol: 1,
            alim: 3
        }
    }

    #getAfCancerPercent() {
        if (this.state.afcancer == 1) {
            return 25
        }
        return 0
    }

    #getSmokePercent() {
        if (this.state.smoke == 1) {
            return 25
        }
        return 0
    }

    #getBMIPercent() {
        let bmi = Math.round(this.state.weight / Math.pow(this.state.height / 100, 2));
        let percent = ((((bmi - 25) / 10) * 0.5) / 4) * 100;
        return percent;
    }

    #getSportPercent() {
        let score = 3 - this.state.sport;
        let percent = (((score / 3) * 0.5) / 4) * 100;
        return percent;
    }

    #getAlcoholPercent() {
        let score = 4 - this.state.alcohol;
        let percent = (((score / 4) * 0.5) / 4) * 100;
        return percent;
    }

    #getAlimPercent() {
        let score = 3 - this.state.alim;
        let percent = (((score / 3) * 0.5) / 4) * 100;
        return percent;
    }

    getCancerRisk() {
        let risk = Math.round(this.#getAfCancerPercent() + this.#getSmokePercent() + this.#getBMIPercent() +
            this.#getSportPercent() + this.#getAlcoholPercent() + this.#getAlimPercent() + 9);
        return risk;
    }

    render() {

        return (
            <div>
                <p>Age: {this.#getAfCancerPercent()}%</p>
                <p>Smoke: {this.#getSmokePercent()}%</p>
                <p>BMI: {this.#getBMIPercent()}%</p>
                <p>Sport: {this.#getSportPercent()}%</p>
                <p>Alcohol: {this.#getAlcoholPercent()}%</p>
                <p>Alim: {this.#getAlimPercent()}%</p>
                <p>Risk: {this.getCancerRisk()}%</p>
            </div>
        )
    }
}

class Diabetes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: 1,
            age: 60,
            height: 180,
            weight: 50,
            highBloodPressure: 1,
            highBloodSugar: 1,
            sport: 1,
            alim: 3
        }
    }

    pointsF = [0, 1, 1, 1, 1, 1, 1, 2, 3, 5, 7, 11, 15, 21, 28, 36, 46, 58, 71, 86, 100, 100, 100];
    pointsM = [0, 0, 0, 0, 0, 0, 1, 2, 4, 7, 11, 15, 21, 28, 36, 46, 58, 71, 86, 100, 100, 100, 100];

    #getAgePoints() {
        if (this.state.age < 45) {
            return 1;
        } else if (this.state.age >= 45 && this.state.age <= 54) {
            return 2;
        }
        return 3;
    }

    #getBMIPoints() {
        let bmi = Math.round(this.state.weight / Math.pow(this.state.height / 100, 2));

        if (bmi < 27) {
            return 1;
        } else if (bmi >= 27 && bmi <= 30) {
            return 2;
        }
        return 3;
    }

    #getHighBloodPressurePoints() {
        if (this.state.highBloodPressure === 1) {
            return 2;
        }
        return 0;
    }

    #getHighBloodSugarPoints() {
        if (this.state.highBloodSugar === 1) {
            return 5;
        }
        return 0;
    }

    #getSportPoints() {
        let points = 4 - this.state.sport;
        return points;
    }

    #getAlimPoints() {
        let points = 4 - this.state.alim;
        return points;
    }

    getDiabetesRisk() {
        let points = this.#getAgePoints() + this.#getBMIPoints() + 3
            + this.#getHighBloodPressurePoints() + this.#getHighBloodSugarPoints() +
            +this.#getSportPoints() + this.#getAlimPoints();

        if (this.state.gender === 1) {
            return this.pointsM[points]
        }
        return this.pointsF[points];
    }

    render() {

        return (
            <div>
                <p>Age {this.#getAgePoints()}</p>
                <p>BMI {this.#getBMIPoints()}</p>
                <p>Pressure {this.#getHighBloodPressurePoints()}</p>
                <p>Sugar {this.#getHighBloodSugarPoints()}</p>
                <p>Sport {this.#getSportPoints()}</p>
                <div>Alim {this.#getAlimPoints()}</div>
                <div>Total {this.getDiabetesRisk()}%</div>
            </div>
        )
    }
}

export class Infarctus {

    constructor({sex, age, doSmoke, systolic, isDiabetic, hadInfarctus, chol, hdl}) {
        this.pSex = sex;
        this.pAge = age;
        this.pDoSmoke = doSmoke;
        this.pIsDiabetic = isDiabetic;
        this.pHadInfarctus = hadInfarctus;
        this.pSyst = systolic;
        this.pChol = chol;
        this.pHdl = hdl;
    }

    #ageCalc(age, coeff) {
        return age * coeff;
    }

    #sexCalc(sex, coeff) {
        return sex * coeff;
    }

    #smokeCalc(doSmoke, coeff) {
        return doSmoke * coeff;
    }

    #systolicCalc(syst, coeff) {
        return syst * coeff;
    }

    #diabeteCalc(diab, coeff) {
        return diab * coeff;
    }

    #infarctusCalc(infarctus, coeff) {
        return infarctus * coeff;
    }

    #cholCalc(chol, coeff) {
        return chol * coeff;
    }

    #HDLCalc(hdl, coeff) {
        return hdl * coeff;
    }

    resultCalc() {
        let coeffs = [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854];

        let age = this.#ageCalc(this.pAge, coeffs[0]);
        console.log(age);
        let sex = this.#sexCalc(this.pSex, coeffs[1]);
        console.log(sex);

        let smoke = this.#smokeCalc(this.pDoSmoke, coeffs[2]);
        console.log(smoke);

        let syst = this.#systolicCalc(this.pSyst, coeffs[3]);
        console.log(syst);

        let diab = this.#diabeteCalc(this.pIsDiabetic, coeffs[4]);
        console.log(diab);

        let infarctus = this.#infarctusCalc(this.pHadInfarctus, coeffs[5]);
        console.log(infarctus);

        let chol = this.#cholCalc(this.pChol, coeffs[6]);
        console.log(chol);

        let hsl = this.#HDLCalc(this.pHdl, coeffs[7]);
        console.log(hsl);

        let sum = age + sex + smoke + syst + diab + infarctus + chol + hsl + coeffs[8] * 0 + coeffs[9] * 120 + coeffs[10] * Math.log10(0.1);
        console.log(sum);

        return (1 - Math.pow(0.61785, Math.exp(sum - 2.0869)));
    }
}

export class NonInfarctus {

    constructor({ sex, age, doSmoke, systolic, chol, hdl }) {
        this.pSex = sex;
        this.pAge = age;
        this.pDoSmoke = doSmoke;
        this.pSyst = systolic;
        this.pChol = chol;
        this.pHdl = hdl;
    }

    #ageCalc(age, coeff) {
        return ((age - 60) / 5) * coeff;
    }

    #smokeCalc(doSmoke, coeff) {
        return doSmoke * coeff;
    }

    #systolicCalc(syst, coeff) {
        return ((syst - 120) / 20) * coeff;
    }

    #cholCalc(chol, coeff) {
        return ((chol - 6)) * coeff;
    }

    #HDLCalc(hdl, coeff) {
        return ((hdl - 1.3) / 0.5) * coeff;
    }

    #transAgeCalc(age) {
        return (age - 60) / 5;
    }

    #transSmokeCalc(transAge, isSmoker, coeff) {
        return transAge * isSmoker * coeff;
    }

    #transSystCalc(transAge, syst, coeff) {
        return (transAge * (syst - 120) / 20) * coeff;
    }
    #transCholCalc(transAge, chol, coeff) {
        return (transAge * (chol - 6)) * coeff;
    }
    #transHDLCalc(transAge, hdl, coeff) {
        return (transAge * (hdl - 1.3) / 0.5) * coeff;
    }

    resultCalc() {
        let manCoeff = [0.3742, 0.6012, 0.2777, 0.1458, -0.2698, -0.0755, -0.0255, -0.0281, 0.0426, 0.9605, -0.5699, 0.7476];
        let womanCoeff = [0.4648, 0.7744, 0.3131, 0.1002, -0.2606, -0.1088, -0.0277, -0.0226, 0.0613, 0.9776, -0.738, 0.7019];
        let coeffs = this.pSex ? manCoeff : womanCoeff;

        let age = this.#ageCalc(this.pAge, coeffs[0]);
        console.log("age" + age);
        let smokes = this.#smokeCalc(this.pDoSmoke, coeffs[1]);
        console.log(smokes);
        let syst = this.#systolicCalc(this.pSyst, coeffs[2]);
        console.log(syst);

        let chol = this.#cholCalc(this.pChol, coeffs[3]);
        console.log(chol);

        let hdl = this.#HDLCalc(this.pHdl, coeffs[4]);
        console.log(hdl);

        let trAge = this.#transAgeCalc(this.pAge);
        console.log(trAge);

        let trSmokes = this.#transSmokeCalc(trAge, this.pDoSmoke, coeffs[5]);
        console.log(trSmokes);

        let trSyst = this.#transSystCalc(trAge, this.pSyst, coeffs[6]);
        console.log(trSyst);

        let trChol = this.#transCholCalc(trAge, this.pChol, coeffs[7]);
        console.log(trChol);

        let trHDL = this.#transHDLCalc(trAge, this.pHdl, coeffs[8]);
        console.log(trHDL);

        let sum = age + smokes + syst + chol + hdl + trSmokes + trSyst + trChol + trHDL;
        console.log(sum);

        let firstRisk = 1 - (Math.pow(coeffs[9], Math.exp(sum)));
        console.log(firstRisk);

        return 1 - Math.exp(-Math.exp(coeffs[10] + coeffs[11] * Math.log(-Math.log(1 - firstRisk))));
    }
}