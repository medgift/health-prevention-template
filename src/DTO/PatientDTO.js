class PatientDTO {
    constructor(firstName, lastName, doctorId, avatarConfig) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.doctorId = doctorId;
        this.avatarConfig = avatarConfig;
    }

    toString() {
        return this.firstName + " " + this.lastName + " " + this.doctorId + " " + this.avatarConfig ;
    }
}

const patientConverter = {
    toFirestore(patient) {
        return {FirstName: patient.firstName, LastName: patient.lastName,
                DoctorId: patient.doctorId, AvatarConfig: patient.avatarConfig};
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new PatientDTO(data.FirstName, data.LastName, data.DoctorId, data.AvatarConfig);
    }
};
export {patientConverter};
export {PatientDTO}