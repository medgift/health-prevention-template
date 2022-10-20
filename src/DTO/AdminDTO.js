class AdminDTO {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    toString() {
        return this.firstName + this.lastName;
    }
}

const adminConverter = {
    toFirestore(admin) {
        return {FirstName: admin.firstName, LastName: admin.lastName
        };
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new AdminDTO(data.FirstName, data.LastName);
    }
};
export {adminConverter};
export {AdminDTO}