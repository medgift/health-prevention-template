const coefWmn = [0.0226,0.2333,0.8209]
let [coefWmnR1,coefWmnR2,coefWmnR3] = coefWmn;

const coefMan = [0.0209,0.1167,0.1316]
let [coefManR1,coefManR2,coefManR3] = coefMan;

    class Diabete{
        static riskDiabete(sumDiabete, SEXE){
            return risk(sumDiabete,SEXE);
        }
    }

    function risk(sumDiabete,SEXE){
        // si 0 pour un homme
        // les valeurs ont été exprès inversé selon le modèle Excel
        if(SEXE === 0)
            return Math.round(Math.pow(sumDiabete,3)*0.0226 - Math.pow(sumDiabete,2)*0.2333 + sumDiabete*0.8209-3*Math.exp(-13));
            
        // sinon 1 pour une femme
        return Math.round(Math.pow(sumDiabete,3)*0.0209 - Math.pow(sumDiabete,2)*0.1167 + sumDiabete*0.1316-3*Math.exp(-13));
    }

    console.log('man',Diabete.riskDiabete(14,0)); 
    console.log('woman',Diabete.riskDiabete(14,1)); 
    