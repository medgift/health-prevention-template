import {collection, doc, getDoc, getDocs, query} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import {onAuthStateChanged} from "firebase/auth";
import Navbar from "../components/Navbar";
import MyImage from "../img/avatar-gf34ddc003_1280.png";
import React, {useState} from "react";
import WriteAnswer from "./WriteAnswer";
import {tab} from "@testing-library/user-event/dist/tab";
import {doctor} from "./UserProfilePage";

export default  function DoctorPage() {

    const [allUser, setUsers] = useState([])
    const [userID, setUserID] = useState()
    var dataIsReady = false


    const getCurrentUser = () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserID(user.uid)
            console.log(user.uid)
        });
    }

    async function getAllowedUser() {
        getCurrentUser()
        var tabID = []
        setUsers([])
        const q = doc(database, "users/", userID);
        const doctor = await getDoc(q);

        if (doctor.data().allowed.length != 0) {
            tabID = doctor.data().allowed.split(':')
        }

        for (var i = 0; i < tabID.length; i++) {
            if (tabID[i].length > 1) {
                let userName = ""
                const q = doc(database, "users/", tabID[i]);
                const user = await getDoc(q)
                if (user.exists()) {
                    userName = user.data().firstname + " " + user.data().lastname
                    setUsers(old => [...old, userName])
                }
            }
        }
        dataIsReady = true
    }

    function useless(){}

    function handleClick() {
        dataIsReady ?  useless(): getAllowedUser()
    }

    return (
        <div>
            <button onClick={handleClick}>Show users data</button>
        <p>{allUser.map((doc, index) => (
            <div>{allUser[index]} allow you to see his result</div>
        ))}</p>

        </div>)

}