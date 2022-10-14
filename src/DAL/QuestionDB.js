import {addDoc, getDocs, query, where} from "firebase/firestore";
import {questionRef} from "../initFirebase";

class QuestionDB {
    async addQuestion(question) {
        await addDoc(questionRef, question);
    }

    async getQuestionsByQuestionnaire(questionnaireNo) {
        const q = query(questionRef, where("QuestionnaireNO", "==", questionnaireNo));
        const docSnap = await getDocs(q);
        return docSnap.docs.map(d => d.data());
    }

    async getAllQuestions() {
        const questions = await getDocs(questionRef);
        return questions.docs.map(q => q.data());
    }
}

export {QuestionDB};