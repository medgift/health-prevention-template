export class Infarctus {


  constructor({ sex, age, smoke, systolic,diabete,infarctus, chol, hdl }) {
    this.pSex = sex;
    this.pAge = age;
    this.pDoSmoke = smoke;
    this.pIsDiabetic = diabete;
    this.pHadInfarctus = infarctus;
    this.pSyst = systolic;
    this.pChol = chol;
    this.pHdl = hdl;

  }




  #ageCalc(age, coeff) {
    return age*coeff;
  }

  #sexCalc(sex,coeff)
  {
    return sex*coeff;
  }


  #smokeCalc(doSmoke, coeff) {
    return doSmoke * coeff;
  }

  #systolicCalc(syst, coeff) {
    return syst*coeff;
  }

  #diabeteCalc(diab,coeff){
    return diab*coeff;
  }

  #infarctusCalc(infarctus,coeff){
    return infarctus*coeff;
  }

  #cholCalc(chol, coeff) {
    return chol * coeff;
  }

  #HDLCalc(hdl, coeff) {
    return hdl * coeff;
  }


  resultCalc() {
    let coeffs = [0.0116,0.2148,0.1754,0.0037,0.2465,0.3399,0.4159,-0.2989,-0.0308,-0.0177,0.0854];

    let age = this.#ageCalc(this.pAge,coeffs[0]);
    let sex = this.#sexCalc(this.pSex,coeffs[1]);
    let smoke = this.#smokeCalc(this.pDoSmoke,coeffs[2]);
    let syst = this.#systolicCalc(this.pSyst,coeffs[3]);
    let diab = this.#diabeteCalc(this.pIsDiabetic,coeffs[4]);
    let infarctus = this.#infarctusCalc(this.pHadInfarctus,coeffs[5]);
    let chol = this.#cholCalc(this.pChol,coeffs[6]);
    let hsl = this.#HDLCalc(this.pHdl,coeffs[7]);
    let sum = age+sex+smoke+syst+diab+infarctus + chol+hsl + coeffs[8]*0 + coeffs[9]*120 + coeffs[10]*Math.log10(0.1);
    let result = (1-Math.pow(0.61785,Math.exp(sum-2.0869)))*100;
    return result>100?100:result;
  }
}
