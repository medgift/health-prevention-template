import {addDoc, getDocs, query, where} from "firebase/firestore";
import {responseRef} from "../initFirebase";

class ResponseDB {
    async addResponses(responseDTO) {
        await addDoc(responseRef, responseDTO);
    }

    async getResponsesByUser(userId) {
        const q = query(responseRef, where("UserId", "==", userId));
        const docSnap = await getDocs(q);
        return docSnap.docs.map(d => d.data());
    }
}

export {ResponseDB};