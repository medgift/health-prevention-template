export class Docteur{

    constructor (nom, id_role, ) {
        this.nom = nom;
        this.id_role = id_role;
        //+ list users
    }
    toString() {
        return this.nom;
    }
}
export const docteurConverter = {
    toFirestore: (docteur) => {
        return {
            nom: docteur.nom,
            id_role: docteur.id_role,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Docteur(...data);
    }
};