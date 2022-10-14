export class Maladie {
    id_maladie;
    constructor(id,nom_maladie, list_coef, list_variable) {
        this.setIdMaladie(id);
        this.nom_maladie = nom_maladie;
            this.list_coef = {
                coefAge: list_coef.coefAge,
                coefCHOL: list_coef.coefCHOL,
                coefDM: list_coef.coefDM,
                coefFume: list_coef.coefFume,
                coefGRF: list_coef.coefGRF,
                coefHDL: list_coef.coefHDL,
                coefINF: list_coef.coefINF,
                coefSex: list_coef.coefSex,
                coefSyst: list_coef.coefSyst,
                coefSyst2: list_coef.coefSyst2,
                coefTotalCHOL: list_coef.coefTotalCHOL,
            };
            this.list_variable = {
                //Collection variables not done
            };
    }
    setIdMaladie(id) {
        this.id_maladie = id;
      }
    toString() {
        return this.nom_maladie;
    }
}


// Firestore data converter
export const maladieConverter = {
    toFirestore: (maladie) => {
        return {
            nom: maladie.nom,
            list_coef: {
                coefAge : maladie.list_coef.coefAge,
                coefCHOL: maladie.list_coef.coefCHOL,
                coefDM: maladie.list_coef.coefDM,
                coefFume: maladie.list_coef.coefFume,
                coefGRF: maladie.list_coef.coefGRF,
                coefHDL: maladie.list_coef.coefHDL,
                coefINF: maladie.list_coef.coefINF,
                coefSex: maladie.list_coef.coefSex,
                coefSyst: maladie.list_coef.coefSyst,
                coefSyst2: maladie.list_coef.coefSyst2,
                coefTotalCHOL: maladie.list_coef.coefTotalCHOL,
            },
            list_variable: {
                //Collection variables not done
            }
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Maladie(snapshot.id, data.nom_maladie, data.list_coef, data.list_variable);
    }
};