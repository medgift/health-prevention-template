import {addDoc, getDocs, query, where} from "firebase/firestore";
import {questionRef} from "../initFirebase";

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
}

export {QuestionDB};