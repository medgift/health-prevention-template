import React  from "react";
import {collection, doc, setDoc, addDoc, getDocs, getDoc,query} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import {doctor} from "./UserProfilePage";


export default class WriteAnswer extends React.Component{

    //Data about the user
    sex = -1;
    age= -1;
    weight= -1;
    height= -1;
    syst= -1;
    glyc= -1;
    chol= -1;
    diab= -1;
    inf= -1;
    avc= -1;

    //Data about his family
    afinf=-1;
    afCancer= -1;

    //Data about his habits
    smoke= -1;
    sport= -1;
    alcool= -1;
    alim= -1;

    //calculate Data
    systAlgo = -1;
    glycAlgo = -1;
    cholAlgo = -1;
    hdlAlgo = -1;
    bmiAlgo = -1;
    sportAlgo = -1;
    alcoolAlgo = -1;
    alimAlgo = -1;

    resultCancer = -1;
    resultDiabete = -1;
    resultInfarctus = -1;
    resultNonInfarctus = -1;

    updatePersonalData = (sex, age, weight, heigt, syst, glyc, chol, diab, inf, avc) => {
        this.sex = sex;
        this.age = age;
        this.weight = weight;
        this.height = heigt;
        this.syst = syst;
        this.glyc = glyc;
        this.chol = chol;
        this.diab = diab;
        this.inf = inf;
        this.avc = avc;
    }

    updateFamilyData = (afinf, afcancer) => {
        this.afinf = afinf;
        this.afCancer = afcancer;
    }

    updateHabitsData = (smoke, food, sport, alcool) => {
        this.smoke = smoke;
        this.alim = food;
        this.sport = sport;
        this.alcool = alcool;
    }

    updateBMI(height, weight){
        this.bmiAlgo = weight/(Math.pow(height/100, 2));
    }

    updateResults(resultCancer, resultDiabete, resultInfarctus, resultNonInfarctus) {
        this.resultCancer = resultCancer;
        this.resultDiabete = resultDiabete;
        this.resultInfarctus = resultInfarctus;
        this.resultNonInfarctus = resultNonInfarctus;
    }

    calculateFinalData = () => {
        this.systAlgo = this.syst == 1 ? 150 : 0;
        this.glycAlgo = this.glyc == 1 ? 5.6 : 0;
        this.cholAlgo = this.chol == 1 ? 5.9 : 0;
        this.hdlAlgo = this.chol == 1 ? 0.9 : 0;
        this.bmiAlgo = this.weight/(Math.pow(this.height/100, 2));
        this.sportAlgo = this.sport;
        this.alcoolAlgo = this.alcool;
        this.alimAlgo = this.alim;
        //TODO changement point sport etc...
    }

    async WriteResult(uid) {
        try {

            const date = new Date();

            const colRef = doc(collection(doc(database, "users/", uid), "answers/"), date.toLocaleDateString() + " " + date.toLocaleTimeString())

            await setDoc(colRef, {
                afcancer: this.afCancer,
                afinf: this.afinf,
                age: this.age,
                alcool: this.alcoolAlgo,
                avc: this.avc,
                diab: this.diab,
                diet: this.alimAlgo,
                glyc: this.glycAlgo,
                hdl: this.hdlAlgo,
                height: this.height,
                weight: this.weight,
                inf: this.inf,
                sex: this.sex,
                smoking: this.smoke,
                sport: this.sportAlgo,
                syst: this.systAlgo,
                resultCancer: this.resultCancer,
                resultDiabete: this.resultDiabete,
                resultInfarctus: this.resultInfarctus,
                resultNonInfarctus: this.resultNonInfarctus
            });
            //console.log("Write success")
        } catch (e) {
            console.log(e)
        }
    }

    async readAnswers(date) {

        const docRef = doc(database, "users/", auth.currentUser.uid, "answers/", date.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //console.log("Age " + docSnap.data().age)
            this.sex = docSnap.data().sex;
            this.age = docSnap.data().age;
            this.weight = docSnap.data().weight;
            this.height = docSnap.data().height;
            this.syst = docSnap.data().syst;
            this.glyc = docSnap.data().glyc;
            this.chol = docSnap.data().chol;
            this.diab = docSnap.data().diab;
            this.inf = docSnap.data().inf;
            this.avc = docSnap.data().avc;

            this.afinf = docSnap.data().afinf;
            this.afCancer = docSnap.data().afcancer;

            this.smoke = docSnap.data().smoke;
            this.alim = docSnap.data().food;
            this.sport = docSnap.data().sport;
            this.alcool = docSnap.data().alcool;

            this.calculateFinalData();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

}