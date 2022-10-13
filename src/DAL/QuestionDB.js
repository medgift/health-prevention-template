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
}

export {QuestionDB};