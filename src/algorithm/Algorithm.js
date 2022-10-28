/* Coefficients fournis */
const coeffNoInfM ={age:0.3742,fume:0.6012,syst:0.2777,chol:0.1458, hdl:-0.2698,
    fumeT:-0.0755,systT:-0.0255,cholT:-0.0281,hdlT:0.0426};

const coeffNoInfF ={age:0.4648,fume:0.7744,syst:0.3131,chol:0.1002, hdl:-0.2606,
    fumeT:-0.1088,systT:-0.0277,cholT:-0.0226,hdlT:0.0613};

const coeffInf = {age:0.0116, sex:0.2148, fume:0.1754, syst:0.0037, diab:0.2465,
    inf:0.3399, chol:0.4159, hdl:-0.2989,tchol:-0.0308*0, eGRF:-0.0177*120, CRP:Math.log10(0.1)*0.0854};

const coeffDiabF = [0.0226,0.2333,0.8209];
const coeffDiabM = [0.0209,0.1167,0.1316];

const coeffCancer = {afcancer:1, fume:1, BMI:0.5, sport:0.5, alcool:0.5, alim:0.5};
const sumCoeffCanc= coeffCancer.afcancer+coeffCancer.fume+coeffCancer.BMI+coeffCancer.sport+coeffCancer.alcool+coeffCancer.alim;

/* Valeur dans les formules excel finales */
const coeffInfRisqueCalc0=0.61785;
const coeffInfRisqueCalc1=2.0869;

const coeffNoInfRisqueCalc0=-0.5699;
const coeffNoInfRisqueCalc1=0.7476;

const coeffNoInfFormuleCalc=0.9605;

const coeffDiabRisqueCalc=-13;

const afinfTauxYes=1.3;
const afinfTauxNo=1.0;

/* Valeur par défaut qu'un individu a au niveau de son risque de cancer (en décimal)*/
const normalRiskCanc = 0.09;

/* Valeur pour le nombre de réponse possibles dans les questions pour le risque de cancer */
const sportAnswersCanc = 3;
const alcAnswers = 4;
const alimAnswersCanc = 3;

/* Valeur pour le nombre de réponse possibles dans les questions pour le risque de diabète */
const sportAnswersDiab = 4;
const alimAnswersDiab = 4;

/* valeur pour scorer le BMI dans le calcul du risque de diabète*/
const DiaBMI0 = 20;
const DiaBMI1 = 27;
const DiaBMI2 = 30;

/* valeur pour scorer l'âge dans le calcul du risque de diabète*/
const DiaAge1 = 45;
const DiaAge2 = 55;

/* Valeur supplémentaire au BMI dans le calcul du risque de diabète */
const coeffSuppWaist=3;


export default class Algorithm{
    constructor(v){
        this.sexe=v[0];
        this.age=v[1];
        this.poids=this.defaultPoids=v[2];
        this.taille=v[3];
        this.systBool=v[4];
        this.syst=v[5];
        this.glycBool=v[6];
        this.glyc=v[7];
        this.cholBool=v[8];
        this.chol=v[9];
        this.hdl=v[10];
        this.diab=v[11];
        this.infa=v[12];
        this.avc=v[13];
        this.afinf=v[14];
        this.afcancer=v[15];
        this.fume=this.defaultFume=v[16];
        this.alim=this.defaultAlim=v[17];
        this.sport=this.defaultSport=v[18];
        this.alcool=this.defaultAlcool=v[19];
        this.BMI=this.SetBMI();
        this.infRate=0.0;
        this.diaRate=0.0;
        this.canRate=0.0;
        this.Calculate();

        /* Valeur qui modifie les pourcent lors de changement en "LIVE" */
        this.modifAlimTauxInf = 6;
        this.modifExerTauxInf = 9;
        this.modifPoidTauxDia = 5;
    }

    Save(){
        let modif=[];
        modif.push(this.poids!=this.defaultPoids?this.poids:null);
        modif.push(this.fume!=this.defaultFume?this.fume:null);
        modif.push(this.alcool!=this.defaultAlcool?this.alcool:null);
        modif.push(this.sport!=this.defaultSport?this.sport:null);
        modif.push(this.alim!=this.defaultAlim?this.alim:null);
        return modif;

    }

    Reset(){
        this.poids = this.defaultPoids;
        this.fume = this.defaultFume;
        this.alcool = this.defaultAlcool;
        this.sport = this.defaultSport;
        this.alim = this.defaultAlim;
        this.BMI = this.SetBMI();
        this.Calculate();
    }

    Calculate(){
        this.infRate= this.CalculateInfarctus();
        this.canRate=this.CalculateCancer();
        this.diaRate=this.CalculateDiabete();
    }

    SetFume(fum){
        this.fume=fum;
        //this.CalculateCancer();
        //this.CalculateInfarctus();
    }

    SetAlim(ali){
        this.infRate+=this.alim-ali*this.modifAlimTauxInf;
        return ali;
        //this.CalculateCancer();
        //this.CalculateDiabete();
    }

    SetSport(spo){
        this.infRate+=this.sport-spo*this.modifExerTauxInf;
        return spo;
        //this.CalculateDiabete();
        //this.CalculateCancer();
    }

    SetAlcool(alc){
        this.alcool=alc;
        //this.CalculateCancer();
    }

    SetPoids(pds){
        let perfPoids = 22*Math.pow(this.taille/100,2);
        this.diaRate-=(this.poids-(pds>perfPoids?pds:Math.floor(perfPoids)))*this.modifPoidTauxDia;
        return pds;
        this.BMI = this.SetBMI();
    }

    SetBMI(){
        return this.poids/Math.pow(this.taille/100,2);
    }

    CalculateInfarctus(){
        if(this.infa || this.avc){
            // a déjà eu un infarctus ou un avc
            let coeff = coeffInf;
            let sum = this.age*coeff.age + this.sexe*coeff.sex + this.fume*coeff.fume + this.syst*coeff.syst + this.diab*coeff.diab + this.infa*coeff.inf
                + this.chol*coeff.chol + this.hdl*coeff.hdl + coeff.tchol + coeff.eGRF + coeff.CRP;

            let risk = 1-Math.pow(coeffInfRisqueCalc0,Math.pow(Math.E,sum-coeffInfRisqueCalc1));

            return (risk*100);
        }else{
            //jamais eu d'infarctus ni avc
            let coeff = this.sexe?coeffNoInfM:coeffNoInfF;

            let newAge =(this.age-60)/5, nsyst=(this.syst-120)/20, nchol=this.chol-6, nhdl=(this.hdl-1.3)/0.5;

            let sum= newAge*coeff.age + this.fume*coeff.fume + nsyst*coeff.syst + nchol*coeff.chol + nhdl*coeff.hdl +
                this.fume*newAge*coeff.fumeT + nsyst*newAge*coeff.systT + nchol*newAge*coeff.cholT + nhdl*newAge*coeff.hdlT;

            let formule = 1-Math.pow(coeffNoInfFormuleCalc,Math.pow(Math.E,sum));

            let final_risk = 1-Math.pow(Math.E,-Math.pow(Math.E,coeffNoInfRisqueCalc0+coeffNoInfRisqueCalc1*Math.log((-Math.log(1-formule,Math.E)),Math.E)));

            let correction = final_risk * (this.afinf?afinfTauxYes:afinfTauxNo);

            return (correction*100);
        }
    }

    CalculateDiabete(){
        let coeff = this.sexe?coeffDiabM:coeffDiabF;

        let score = (this.age<DiaAge1?1:this.age<DiaAge2?3:6) + (this.BMI<DiaBMI0?0:this.BMI<DiaBMI1?1:this.BMI<DiaBMI2?3:6) +  (this.systBool>0?2:0) + (this.glycBool>0?5:0) + alimAnswersDiab-this.alim + sportAnswersDiab-this.sport + coeffSuppWaist;
        let risk = Math.pow(score,3)*coeff[0] -  Math.pow(score,2)*coeff[1] +  score*coeff[2] - 3*Math.pow(Math.E, coeffDiabRisqueCalc);
        console.log(score);
        return (risk>100?100:risk);
    }

    CalculateCancer(){
        let result = (this.afcancer*coeffCancer.afcancer + this.fume*coeffCancer.fume + (this.BMI-25)/10*coeffCancer.BMI + (sportAnswersCanc-this.sport)/sportAnswersCanc*coeffCancer.sport +
            (alcAnswers-this.alcool)/alcAnswers*coeffCancer.alcool + (alimAnswersCanc-this.alim)/alimAnswersCanc*coeffCancer.alim)/sumCoeffCanc;

        let risk=result + normalRiskCanc;

        return (risk*100);
    }

}
