class PatientDTO {
    constructor(firstName, lastName, doctorId, responseIds) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.doctorId = doctorId;
        this.responseIds = responseIds;
    }

    toString() {
        return this.firstName + this.lastName;
    }
}

const patientConverter = {
    toFirestore(patient) {
        return {FirstName: patient.firstName, LastName: patient.lastName,
                DoctorId: patient.doctorId, ResponseIds: patient.responseIds
        };
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new PatientDTO(data.FirstName, data.LastName, data.DoctorId, data.ResponseIds);
    }
};
export {patientConverter};
export {PatientDTO}