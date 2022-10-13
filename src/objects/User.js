export class User {
  id_user;
  constructor(nom) {
    this.nom = nom;
    this.id_role = "n5Gejr1pLJrcMagawHqp";
    //+ collections Questionnaires
  }


  setId(id) {
    this.id_user = id;
  }

  setNom(nom) {
    this.nom = nom;
  }

  setAge(age) {
    this.age = age;
  }

  setPoids(poids) {
    this.poids = poids;
  }

  setSexe(sexe) {
    this.sexe = sexe;
  }

  setTaille(taille) {
    this.taille = taille;
  }

  toString() {
    return (
      this.nom +
      ", " +
      this.sexe +
      ", " +
      this.age +
      ", " +
      this.poids +
      ", " +
      this.taille
    );
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
      taille: user.taille,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User({...data}); 
  },
};
