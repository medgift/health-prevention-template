class QuestionDTO {
    constructor(choices, defaultValue, inputType, normalValue, questionNO, questionnaireNO, text, variableName) {
        this.choices = choices;
        this.defaultValue = defaultValue;
        this.inputType = inputType;
        this.normalValue = normalValue;
        this.questionNO = questionNO;
        this.questionnaireNO = questionnaireNO;
        this.text = text;
        this.variableName = variableName;
    }

    toString() {
        return this.choices;
    }
}

const questionConverter = {
    toFirestore(quest) {
        return {Choices: quest.choices, DefaultValue: quest.defaultValue,
                InputType: quest.inputType, NormalValue: quest.normalValue,
                QuestionNO: quest.questionNO, QuestionnaireNO: quest.questionnaireNO,
                Text: quest.text, Variable: quest.variableName};
    },
    fromFirestore(
        snapshot,
        options
    ) {
        const data = snapshot.data(options);
        return new QuestionDTO(data.Choices, data.DefaultValue, data.InputType, data.NormalValue,
                            data.QuestionNO, data.questionnaireNO, data.Text, data.Variable);
    }
};
export {questionConverter};
export {QuestionDTO}