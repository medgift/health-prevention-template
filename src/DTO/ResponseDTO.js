class ResponseDTO {
    constructor(dateFilled, userId, responses) {
       this.dateFilled = dateFilled;
       this.userId = userId;
       this.responses = responses;
    }

    toString() {
        return this.dateFilled + this.userId + this.responses;
    }
}

const responseConverter = {
    toFirestore(resp) {
        return {DateFilled: resp.dateFilled, UserId: resp.userId,
                Responses: resp.responses};
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new ResponseDTO(data.DateFilled, data.UserId, data.Responses);
    }
};
export {responseConverter};
export {ResponseDTO}