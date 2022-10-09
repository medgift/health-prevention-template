

export class User {
    constructor (nom, age,sexe,poids, taille ) {
        this.nom = nom;
        this.id_role = 'n5Gejr1pLJrcMagawHqp';
        this.age = age;
        this.sexe = sexe;
        this.poids = poids;
        this.taille = taille;
        //+ collections Questionnaires

    }
    toString() {
        return this.nom + ', ' + this.sexe + ', ' + this.age+ ', ' + this.poids+ ', ' + this.taille;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            nom: user.nom,
            id_role: user.id_role,
            age: user.age,
            sexe: user.sexe,
            poids: user.poids,
            taille: user.taille
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(...data);
    }
};