import React  from "react";

export default class Algorithm extends React.Component{

    constructor() {
        super();
    }
    infarctusCoeff = [0.0116, 0.2148, 0.1754, 0.0037, 0.02465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854]
    result = 0
    risk = 0

    Infarctus(age, sex, fume, syst, dm, inf, chol, hdl,totalCHOL, eGRF,CRP) {
        for (var i = 0; i < arguments.length; i++) {
            this.result += this.Calculate(this.infarctusCoeff[i], arguments[i])
            console.log(this.Calculate(this.infarctusCoeff[i]),arguments[i])
        }
        return this.OutputRisk(this.result)

    }

    Calculate(coeff, value) {
        return coeff * value
    }

    OutputRisk(value) {
        return 1 - (Math.pow(0.61785, value - 2.0869)) * 100
    }

    render() {
        return (
            this.Infarctus(70,0.0,0.0,110,0,0,3.5,1.9,0,120,0.1)+ " %"        );
    }
}





