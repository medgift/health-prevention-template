
export class Role {
    constructor (nom_role, id_role) {
        this.id_role = id_role;
        this.nom_role = nom_role;
    }
    toString() {
        return this.nom_role + ', ' + this.id_role ;
    }
}

// Firestore data converter
export const roleConverter = {
    toFirestore: (role) => {
        return {
            nom_role: role.nom_role,
            id_role: role.id_role,
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Role(...data);
    }
};