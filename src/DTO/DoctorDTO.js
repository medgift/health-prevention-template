class DoctorDTO {
    constructor(firstName, lastName, patients) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.patients = patients;
    }

    toString() {
        return this.firstName + this.lastName + this.patients;
    }
}

const doctorConverter = {
    toFirestore(doctor) {
        return {
            FirstName: doctor.firstName, LastName: doctor.lastName, Patients: doctor.patients
        };
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new DoctorDTO(data.FirstName, data.LastName, data.Patients);
    }
};

export {doctorConverter};
export {DoctorDTO}
