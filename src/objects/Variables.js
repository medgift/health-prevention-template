

export class Variable {
    constructor (id_var,nom, limites, val_normale,val_predefinie1,val_predefinie2  ) {
        this.id_var = id_var;
        this.nom = nom;
        this.limites = limites;
        this.val_normale = val_normale;
        this.val_predefinie1 = val_predefinie1;
        this.val_predefinie2 = val_predefinie2;
    }
    toString() {
        return this.nom + ', limites = ' + this.limites + ', val_normale = ' + this.val_normale+ ', val_predefinie1 = ' + this.val_predefinie1+ ', val_predefinie2 = ' + this.val_predefinie2;
    }
}

// Firestore data converter
export const variableConverter = {
    toFirestore: (variable) => {
        return {
            nom: variable.nom,
            limites: variable.limites,
            val_normale: variable.val_normale,
            val_predefinie1: variable.val_predefinie1,
            val_predefinie2: variable.val_predefinie2,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Variable(snapshot.id, data.nom, data.limites, data.val_normale, data.val_predefinie1, data.val_predefinie2);
    }
};