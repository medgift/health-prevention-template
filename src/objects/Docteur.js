export class Docteur{

    constructor (nom ) {
        this.nom = nom;
        this.id_role = 'jFC8Tuw87Ic3my6SyOU0';
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