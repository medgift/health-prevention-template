import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import {onAuthStateChanged} from "firebase/auth";
import Navbar from "../components/Navbar";
import MyImage from "../img/avatar.png";
import React, {useContext, useEffect, useState} from "react";
import WriteAnswer from "./WriteAnswer";
import {tab} from "@testing-library/user-event/dist/tab";
import {doctor} from "./UserProfilePage";
import NavbarAdmin from "../components/NavbarAdmin";
import setBodyColor from "../components/setBackground";
import {BsTrash2Fill} from "react-icons/bs";
import {Context} from "../App";
import {useNavigate} from "react-router-dom";

export default function DoctorPage() {

    const [allUser, setUsers] = useState([])
    const [userID, setUserID] = useState()
    const [document, setDocument] = useState([])
    let dataIsReady = false

    const navigate = useNavigate();
    const role = useContext(Context);
    console.log("role dans doc " + role.role)

    setBodyColor({color1: "#d56204", color2: "#e5b87d"})

    useEffect(() => {
        if (role.role !== 0) {
            navigate("/")
        }
    }, []);

    const getCurrentUser = () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserID(user.uid)
            console.log(user.uid)
        });
    }

    // access the db collection
    async function getHistory(uid) {
        const colRef = collection(doc(database, "users/", uid), "answers/");
        const querySnapshot = await getDocs(colRef);
        querySnapshot.forEach((doc) => {
            setDocument(oldDates => [...oldDates, doc]);
        })
    };

    async function getAllowedUser() {
        getCurrentUser()
        let tabID = []
        setUsers([])
        const q = doc(database, "users/", userID);
        const doctor = await getDoc(q);

        if (doctor.data().allowed.length != 0) {
            tabID = doctor.data().allowed.split(':')
        }

        for (let i = 0; i < tabID.length; i++) {
            if (tabID[i].length > 1) {
                let userName = ""
                const q = doc(database, "users/", tabID[i]);
                const user = await getDoc(q)
                if (user.exists()) {
                    userName = user.data().firstname + " " + user.data().lastname
                    setUsers(old => [...old, userName])
                }
                getHistory(tabID[i])
            }
        }
        dataIsReady = true
    }

    function useless() {
    }

    function handleClick() {
        dataIsReady ? useless() : getAllowedUser()
    }

    return (
        <>
            <NavbarAdmin/>
            <div className="box">
                <div className="wrapper">
                    <div>
                        <button onClick={handleClick}>Show users data</button>
                        <p>
                            {allUser.map((doc, index) => (
                                <div>{allUser[index]} allow you to see his result</div>
                            ))}
                            <div>{ document.map(
                                e =>
                                    <details>
                                        {console.log(e.data())}
                                        <summary>{ e.id }</summary>
                                        {
                                            Object.entries(e.data()).map(([key, value]) => {
                                                return (key.includes("result") ? <p style={{ color: "black" }}> {key} : {value} </p> : <p> {key} : {value} </p>)
                                            })
                                        }
                                    </details>
                            )}
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </>)
}