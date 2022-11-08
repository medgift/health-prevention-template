import {addDoc, getDocs, query, where} from "firebase/firestore";
import {responseRef} from "../initFirebase";

class ResponseDB {
    async addResponses(responseDTO) {
        await addDoc(responseRef, responseDTO);
    }

    async getResponsesByUser(userId) {
        const q = query(responseRef, where("UserId", "==", userId));
        const docSnap = await getDocs(q);
        let resp = docSnap.docs.map(d => d.data());
        return this.orderResponsesByDate(resp);
    }

    //sort by latest date
    orderResponsesByDate(resp) {
        return resp.sort((a, b) => b.dateFilled.seconds - a.dateFilled.seconds);
    }

    async getLatestResponseByUser(userId) {
        let responses = await this.getResponsesByUser(userId);
        let latestResponse = responses[0];
        return latestResponse;
    }
}

export {ResponseDB};