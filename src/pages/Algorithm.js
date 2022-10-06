import React  from "react";

export default class Algorithm extends React.Component{

    constructor() {
        super();
    }
    infarctusCoeff = [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854]
    result = 0

    Infarctus(age, sex, fume, syst, dm, inf, chol, hdl,totalCHOL, eGRF,CRP) {
        // for (var i = 0; i < arguments.length; i++) {
        //   //  this.result += this.Calculate(this.infarctusCoeff[i], arguments[i])
        //     this.result += this.infarctusCoeff[i] * arguments[i]
        //     console.log(this.result)
        // }

        this.result += age * 0.0116
        this.result += sex * 0.2148
        this.result += fume * 0.1754
        this.result += syst * 0.0037
        this.result += dm * 0.2465
        this.result += inf * 0.3399
        this.result += chol * 0.4159
        this.result += hdl * -0.2989
        this.result += totalCHOL * -0.0308
        this.result += eGRF * -0.0177
        this.result += CRP * 0.0854
        return this.OutputRisk(this.result)

    }


    OutputRisk(value) {
        return (1-(Math.pow(0.61785,Math.exp(value-2.0869)))) * 100
    }

    render() {
        return (
          this.Infarctus(70,0,0,110,0,0,3.5,1.9,0,120,0.1)+ " %");

    }
}





