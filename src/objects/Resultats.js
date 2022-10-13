import moment from "moment/moment";

export class Resultats {

    constructor (diabete, cancer, infarctus, nonInfarctus) {
        this.todayDate = moment().format('L'); 
        this.diabete = diabete;
        this.cancer = cancer;
        this.infarctus = infarctus;
        this.nonInfarctus = nonInfarctus;
                
    }
    toString() {
        return this.todayDate + ', Diabète : ' + this.diabete + ', Cancer : ' + this.cancer+ ', Infarctus : ' + this.infarctus+ ', Non-Infarctus : ' + this.nonInfarctus;
    }
}

// Firestore data converter
export const resultatsConverter = {
    toFirestore: (res) => {
        return {
            diabete: res.diabete,
            cancer: res.cancer,
            infarctus: res.infarctus,
            nonInfarctus: res.n,
           
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Resultats({...data});
    }
};

//Diabete infarctus non-infarctus cancer