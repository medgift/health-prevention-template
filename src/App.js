import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {db} from "./initFirebase";
import { collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import Logout from "./pages/Logout";
//import firebase from "firebase/compat";
//import firestore from "firebase/Firestore";

export default function App() {
    /* Current user state */
    const [currentUser, setCurrentUser] = useState(undefined);

    /* Watch for authentication state changes */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User is", user);
            setCurrentUser(user);
        });

        // Unsubscribe from changes when App is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    if (currentUser === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Loading...</h1>
                </header>
            </div>
        );
    }

    const questionnaire = GetQuestionnaire();

    /*const questionsRef = collection(firestore, 'Questionnaire'.doc(1).collection('Question'));
    console.log(questionsRef);*/
    //const queryRef = questionsRef.where('QuestionnaireNO', '==', 1).get();

        /*const q = query(collection(db, "Questionnaire"))
        const unsub = onSnapshot(q, (querySnapshot) => {
            console.log("Data", querySnapshot.docs.map(d => doc.data()));
        });
        console.log("after the function");*/

    return (
        <div className="App">
            <header className="App-header">
                <Routes>
                    <Route path="/" element={<Home currentUser={currentUser}/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
                <h1>Questionnaire 1</h1>

            </header>
        </div>
    );
}

function Question(props) {

}

async function GetQuestionnaire () {
    const questRef = collection(db, "Questionnaire");
    const querstionnaire1 = query(questRef, where("QuestionnaireNO", "==", 1));
    const q = query(collection(db, "Questionnaire"), where("QuestionnaireNO", "==", 1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

    });
    console.log("Questionnaire 1 : " + (await getDocs(querstionnaire1)).docs);
}
