const coef = [0.0116,0.2148,0.1754,0.0037,0.2465,0.3399,0.4159,-0.2989,-0.0308,-0.0177,0.0854]
let          [coefAge,coefSex,coefFume,coefSyst,coefDM,coefINF,coefCHOL,coefHDL,coefTotalCHOL,coefeGRF,coefCRP] = coef;

    class Infarctus{
        static riskInfarctus(AGE,SEXE,FUME,SYST,DM,INF,CHOL,HDL){
            let res = (AGE * coefAge) + (SEXE * coefSex) + (FUME * coefFUME) +
            (SYST * coefSyst) + (DM * coefDM) + (INF * coefINF) +
            (CHOL * coefCHOL) + (HDL * coefHDL) +
            (0 * coefTotalCHOL) + (120 * coefeGRF) + (Math.log10(0.1) * coefCRP);

            return (1-Math.pow(0.61785,Math.exp(res-2.0869)));
        }
    } 
    console.log(Infarctus.riskInfarctus(70,0,0,110,0,0,3.5,1.9));