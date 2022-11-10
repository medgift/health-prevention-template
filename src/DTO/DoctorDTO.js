class DoctorDTO {
    constructor(firstName, lastName, patients, pendingPatients) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.patients = patients;
        this.pendingPatients = pendingPatients;
    }

    toString() {
        return this.firstName + this.lastName + this.patients + this.pendingPatients;
    }
}

const doctorConverter = {
    toFirestore(doctor) {
        return {
            FirstName: doctor.firstName, LastName: doctor.lastName,
            Patients: doctor.patients, Pending : doctor.pendingPatients
        };
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new DoctorDTO(data.FirstName, data.LastName, data.Patients, data.Pending);
    }
};

export {doctorConverter};
export {DoctorDTO}
