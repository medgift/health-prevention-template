

const coefMan = [0.3742,0.6012,0.2777,0.1458,-0.2698,-0.0755,-0.0255,-0.0281,0.0426]
let             [coefAge,coefNfume, coefSyst, coefNchol, coefNhdl,coefSmokeAge,coefSystAgeTrans,coefTotCholAgeTrans,coefHdlCholAgeTrans] = coefMan;

const   coefWmn = [0.4648,0.7744,0.3131,0.1002,-0,2606,-0.1088,-0.0277,-0.0226,0.0613]
let  [coefAgeWmn,coefNfumeWmn, coefSystWmn, coefNcholWmn, coefNhdlWmn, coefSmokeAgeWmn,coefSystAgeTransWmn,coefTotCholAgeTransWmn,coefHdlCholAgeTransWmn] = coefWmn;

    class NonInfarctus{
        static correctionAFINF(AGE,NFUME, NSYST, NCHOL, NHDL,SEXE,AFINF){
            return (AFINF < 1 ? 1 : 1.3) * riskNonInfarctus(AGE,NFUME,NSYST,NCHOL,NHDL,SEXE);
        }
    }

    function riskNonInfarctus(AGE,NFUME,NSYST,NCHOL,NHDL,SEXE){       
        return 1-Math.exp(-Math.exp(-0.5699+0.7476*Math.log(-Math.log(1-formule(AGE,NFUME, NSYST, NCHOL, NHDL,SEXE)))));
    }

    function formule(AGE,NFUME, NSYST, NCHOL, NHDL,SEXE){
        let somme = sommeNonInfarctus(AGE,NFUME, NSYST, NCHOL, NHDL,SEXE);
        return 1-Math.pow(0.9605,(Math.exp(somme)));
    }

    function sommeNonInfarctus(AGE,NFUME, NSYST, NCHOL, NHDL,SEXE){
        return age(AGE,SEXE) + nfume(NFUME,SEXE) + nSyst(NSYST,SEXE) + nChol(NCHOL,SEXE) + nHdl(NHDL,SEXE)
        + smokeAgeTransformed(AGE,SEXE,NFUME) + systAgeTransformed(AGE,SEXE,NSYST) + totalCholAgeTransformed(AGE,SEXE,NCHOL)
        + hdlCholAgeTransformed(AGE,SEXE,NHDL); 
    }

    function age(AGE,SEXE){
        return SEXE === 0 ? ageTransformed(AGE) *  coefAge : ageTransformed(AGE) * coefAgeWmn;
    }

    function nfume(NFUME,SEXE){
        return SEXE === 0 ? NFUME * coefNfume : NFUME * coefNfumeWmn;
    }

    function nSyst(NSYST,SEXE){
        return SEXE === 0 ? ((NSYST-120)/20) * coefSyst : ((NSYST-120)/20) * coefSystWmn;
    }

    function nChol(NCHOL,SEXE){
        return SEXE === 0 ? calculCHOL(NCHOL) * coefNchol : ((NCHOL-6)/1) * coefNcholWmn;
    }

    function nHdl(NHDL,SEXE){
        return SEXE === 0 ? calculHDL(NHDL) * coefNhdl : calculHDL(NHDL) * coefNhdlWmn;
    }

    function ageTransformed(AGE){
        return (AGE-60)/5;
    }

    function systoliquemmHG(NSYST){
        return (NSYST-120)/20;
    }

    function calculCHOL(NCHOL){
        return (NCHOL-6)/1;
    }

    function calculHDL(NHDL){
        return (NHDL-1.3)/0.5;
    }

    function smokeAgeTransformed(AGE,SEXE,NFUME){
        return SEXE === 0 ? (ageTransformed(AGE) * NFUME) * coefSmokeAge : (ageTransformed(AGE) * NFUME) * coefSmokeAgeWmn;
    }

    function systAgeTransformed(AGE,SEXE,NSYST){
        return SEXE === 0 ? (systoliquemmHG(NSYST) * ageTransformed(AGE)) * coefSystAgeTrans : (systoliquemmHG(NSYST) * ageTransformed(AGE)) * coefSystAgeTransWmn;
    }

    function totalCholAgeTransformed(AGE,SEXE,NCHOL){
        return SEXE === 0 ? (calculCHOL(NCHOL) * ageTransformed(AGE)) * coefTotCholAgeTrans :calculCHOL(NCHOL) * ageTransformed(AGE) * coefTotCholAgeTransWmn;

    }

    function hdlCholAgeTransformed(AGE,SEXE,NHDL){
        return SEXE === 0 ? calculHDL(NHDL) * ageTransformed(AGE) * coefHdlCholAgeTrans: alculHDL(NHDL) * ageTransformed(AGE) * coefHdlCholAgeTransWmn;
    }
    
console.log('coorection pour AFINF',NonInfarctus.correctionAFINF(12,1,120,6.3,1.4,0,1));
    
    