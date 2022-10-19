class PatientDTO {
    constructor(firstName, lastName, doctorId, responseIds, avatarConfig) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.doctorId = doctorId;
        this.responseIds = responseIds;
        this.avatarConfig = avatarConfig;
    }

    toString() {
        return this.firstName + this.lastName;
    }
}

const patientConverter = {
    toFirestore(patient) {
        return {FirstName: patient.firstName, LastName: patient.lastName,
                DoctorId: patient.doctorId, ResponseIds: patient.responseIds,
                AvatarConfig: patient.avatarConfig
        };
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new PatientDTO(data.FirstName, data.LastName, data.DoctorId, data.ResponseIds, data.AvatarConfig);
    }
};
export {patientConverter};
export {PatientDTO}