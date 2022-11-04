class DoctorDTO {
    constructor(firstName, lastName) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }

    toString() {
        return "Dr." + this.FirstName + " " + this.LastName;

    }
}

const doctorConverter = {
    toFirestore(doctor) {
        return {FirstName: doctor.firstName, LastName: doctor.lastName};
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new DoctorDTO(data.FirstName, data.LastName);

    }

};
export {doctorConverter};
export {DoctorDTO};