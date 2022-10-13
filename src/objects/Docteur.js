export class Docteur{
    id;

    constructor (nom ) {
        this.nom = nom;
        this.id_role = 'jFC8Tuw87Ic3my6SyOU0';
        //+ list users
    }

    setId(id) {
        this.id = id;
      }
      getId() {
        return this.id;
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
        return new Docteur({...data});
    }
};