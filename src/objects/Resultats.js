import moment from "moment/moment";

export class Resultats {
        todayDate = moment().format('L'); 
        id_resultats;

    constructor (id,diabete, cancer, infarctus, nonInfarctus) {
        this.setIdResultats(id);
        this.diabete = diabete;
        this.cancer = cancer;
        this.infarctus = infarctus;
        this.nonInfarctus = nonInfarctus;
                
    }
    setIdResultats(id){
        if(id === null){
            id = this.todayDate;
        }else{
            this.id_resultats = id;
        }
    }
    toString() {
        return this.id_resultats+ ', Diabète : ' + this.diabete + ', Cancer : ' + this.cancer+ ', Infarctus : ' + this.infarctus+ ', Non-Infarctus : ' + this.nonInfarctus;
    }
}

// Firestore data converter
export const resultatsConverter = {
    toFirestore: (res) => {
        return {
            diabete: res.diabete,
            cancer: res.cancer,
            infarctus: res.infarctus,
            nonInfarctus: res.nonInfarctus,
           
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Resultats(snapshot.id, data.diabete, data.cancer, data.infarctus, data.nonInfarctus);
    }
};

//Diabete infarctus non-infarctus cancer