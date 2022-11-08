import Navbar from "../components/Navbar";
import React, {useEffect, useState} from "react";
import {auth, database} from "../initFirebase";
import {collection, doc, getDoc, getDocs, query, setDoc, where} from "firebase/firestore";
import {signOut} from "firebase/auth";

export default function Profile_nb() {

    const [document, setDocument] = useState([]);

    // access the db collection
    async function getHistory() {
        const colRef = collection(doc(database, "users/", auth.currentUser.uid), "answers/");
        const querySnapshot = await getDocs(colRef);
        querySnapshot.forEach((doc)=>{
            setDocument(oldDates => [...oldDates, doc]);
        })
    };

    useEffect(() => {
       getHistory()
    }, []);

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <h1>Profile</h1>
                    <div>{ document.map(
                        e =>
                            <details>
                                <summary>{ e.id }</summary>
                                    {
                                        Object.entries(e.data()).map(([key, value]) => {
                                            return (<p> {key} : {value} </p>)
                                        })
                                    }
                            </details>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}