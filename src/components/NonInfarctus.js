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
    return ((chol - 6) / 1) * coeff;
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
    return (transAge * (chol - 6) / 1) * coeff;
  }
  #transHDLCalc(transAge, hdl, coeff) {
    return (transAge * (hdl - 1.3) / 0.5) * coeff;
  }

  resultCalc() {
    let manCoeff = [0.3742, 0.6012, 0.2777, 0.1458, -0.2698, -0.0755, -0.0255, -0.0281, 0.0426, 0.9605, -0.5699, 0.7476];
    let womanCoeff = [0.4648, 0.7744, 0.3131, 0.1002, -0.2606, -0.1088, -0.0277, -0.0226, 0.0613, 0.9776, -0.738, 0.7019];
    let coeffs = this.pSex ? manCoeff : womanCoeff;
    let age = this.#ageCalc(this.pAge, coeffs[0]);
    let smokes = this.#smokeCalc(this.pDoSmoke, coeffs[1]);
    let syst = this.#systolicCalc(this.pSyst, coeffs[2]);
    let chol = this.#cholCalc(this.pChol, coeffs[3]);
    let hdl = this.#HDLCalc(this.pHdl, coeffs[4]);
    let trAge = this.#transAgeCalc(this.pAge);
    let trSmokes = this.#transSmokeCalc(trAge, this.pDoSmoke, coeffs[5]);
    let trSyst = this.#transSystCalc(trAge, this.pSyst, coeffs[6]);
    let trChol = this.#transCholCalc(trAge, this.pChol, coeffs[7]);
    let trHDL = this.#transHDLCalc(trAge, this.pHdl, coeffs[8]);
    let sum = age + smokes + syst + chol + hdl + trSmokes + trSyst + trChol + trHDL;
    let firstRisk = 1 - (Math.pow(coeffs[9], Math.exp(sum)));

    return 1 - Math.exp(-Math.exp(coeffs[10] + coeffs[11] * Math.log(-Math.log(1 - firstRisk))));

  }
}
