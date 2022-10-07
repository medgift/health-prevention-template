import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import {db} from "./initFirebase";
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import Logout from "./pages/Logout";
//import firebase from "firebase/compat";
//import firestore from "firebase/Firestore";

export default function App() {
    /* Current user state */
    const [currentUser, setCurrentUser] = useState(undefined);
    const NUMBER_OF_QUESTIONNAIRES = 3;

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

    useEffect( () => {
        async function LoadQuestion() {
            for (let i = 1; i < NUMBER_OF_QUESTIONNAIRES+1; i++) {
                let questions = await GetQuestions(i);
                for (const q of questions) {
                    console.log("Questions : " + q.get("Text"))

                }
            }
        }
        GetQuestions();
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

async function GetQuestions(questionnaireNo) {
    const q = query(collection(db, "Question"), where("QuestionNO", "==", questionnaireNo));
    const querySnapshot = await getDocs(q);
    let documentList = [];
    querySnapshot.forEach((doc) => {
        documentList = [...documentList, doc];
    });
    let i = 0;
    for (const q of documentList) {
        i++;
        console.log(i + "Question text : " + q.get("Text"))
    }
    return documentList;
}

async function GetPatient(firstName) {
    const q = query(collection(db, "Patient"), where("FirstName", "==", firstName));
    const querySnapshot = await getDocs(q);
    let documentList = [];
    querySnapshot.forEach((doc) => {
        documentList = [...documentList, doc];
    });
    console.log("After get function ....")
   /* for (const documentListElement of documentList) {
        console.log("LastName : " + documentListElement.get("LastName"))
    }
    */
    return documentList;
}
