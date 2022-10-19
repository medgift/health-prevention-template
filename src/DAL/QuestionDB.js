import {addDoc, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db, questionRef} from "../initFirebase";

class QuestionDB {
    async addQuestion(question) {
        await addDoc(questionRef, question);
    }

    async getQuestionsByQuestionnaire(questionnaireNo) {
        const q = query(questionRef, where("QuestionnaireNO", "==", questionnaireNo));
        const docSnap = await getDocs(q);
        const questions = docSnap.docs.map(d => d.data());
        return questions.sort((a, b) => a.questionNO - b.questionNO);
    }

    async getAllQuestions() {
        const questions = await getDocs(questionRef);
        const q =questions.docs.map(q => q.data());
        return q.sort((a, b) => a.questionNO - b.questionNO);
    }

    async setNormalValue(questionNO, normalValue) {
        let questionId = await this.findQuestionId(questionNO);
        const d = doc(db, "Question",questionId);
        await updateDoc(d, {
            NormalValue: normalValue
        });
    }

    async findQuestionId(questionNO) {
        const questionQuery = query(questionRef, where("QuestionNO", "==", questionNO));
        const snapshot = await getDocs(questionQuery);
        let questionId;
        snapshot.forEach((d) => {
            questionId = d.id;
        });
        return questionId;
    }


}

export {QuestionDB};