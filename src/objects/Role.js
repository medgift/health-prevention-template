
export class Role {
    id_role;
    constructor (nom_role, id_role) {
        this.nom_role = nom_role;
    }

    setIdRole(id) {
        this.id_role = id;
      }

    toString() {
        return this.nom_role;
    }
}

// Firestore data converter
export const roleConverter = {
    toFirestore: (role) => {
        return {
            nom_role: role.nom_role,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Role({...data});
    }
};