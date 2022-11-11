import React, {useContext, useEffect, useState} from "react";
import {collection, getDoc, getDocs, query} from "firebase/firestore";
import {doc, updateDoc, deleteDoc} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import Navbar from "../components/Navbar";
import {onAuthStateChanged} from "firebase/auth";
import "../UserProfilPage.css"
import {useNavigate} from "react-router-dom";
import {Context} from "../App";
import {BsTrash2Fill} from 'react-icons/bs';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export class doctor {
    idDoctor: string;
    firstname: string;
    lastname: string;
    allowed: boolean;
}

export default function UserProfilePage() {

    const [allDoctors, addDoctor] = useState([])
    const [IsChoosable, setChoosableState] = useState(false)
    const [listAllowedDoctor, setList] = useState([])
    const [listRemovedDoctor, setRemoveList] = useState([])
    const [document, setDocument] = useState([])
    const navigate = useNavigate();
    const {role} = useContext(Context);
    const mySwal = withReactContent(Swal)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

    useEffect(() => {
        if (!auth.currentUser) {
            navigate("/login");
            return;
        }
    }, []);

    var listAllowed
    const [currentUser, setCurrentUser] = useState(undefined);
    var userID

    const getCurrentUser = () => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            userID = user.uid
        });
    }

    const getName = () => {
        const docRef = doc(database, "users/", auth.currentUser.uid);

        getDoc(docRef).then((doc) => {
            setFirstname(doc.data().firstname)
            setLastname(doc.data().lastname)
        })
    }

    useEffect(() => {
        getName();
    }, [])

    // access the db collection
    async function getHistory() {
        const colRef = collection(doc(database, "users/", auth.currentUser.uid), "answers/");
        const querySnapshot = await getDocs(colRef);
        querySnapshot.forEach((doc) => {
            setDocument(oldDates => [...oldDates, doc]);
        })
    };

    useEffect(() => {
        getHistory()
    }, []);

    //Function to delete an entry in the history
    /*const deleteHistory = (event, id) => {
        event.preventDefault();

        const docRef = doc(database, 'users/' + auth.currentUser.uid + '/answers', id)

        Swal.fire({
            title: 'Are you sure you want to delete this?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteDoc(docRef).then(() => {
                    window.location.reload();
                })
            } else if (result.isDenied) {
                Swal.fire("The document wasn't deleted", '', 'info')
            }
        })
    }*/

    async function getAllDoctors() {
        getCurrentUser()
        setList([])
        setRemoveList([])
        setChoosableState(!IsChoosable)
        const q = query(collection(database, "users/"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().role === 0) {
                let creatDoctor = new doctor()
                creatDoctor.idDoctor = doc.id
                creatDoctor.lastname = doc.data().lastname
                creatDoctor.firstname = doc.data().firstname
                if (doc.data().allowed != null) {
                    if (doc.data().allowed.length != 0) {
                        let allId = doc.data().allowed
                        let tabID = allId.split(':')
                        listAllowedDoctor.push(tabID)
                        tabID.indexOf(userID) != -1 ? creatDoctor.allowed = true : creatDoctor.allowed = false
                    }
                }
                addDoctor(oldArray => [...oldArray, creatDoctor])
            }
        })
        for (let i = 0; i < listAllowedDoctor.length; i++) {
        }
    }

    async function saveChanges() {
        setChoosableState(!IsChoosable)
        addDoctor([])
        getCurrentUser()
        for (let i = 0; i < listAllowedDoctor.length; i++) {
            listAllowed = ""
            if (listAllowedDoctor[i] != null) {
                const q = doc(database, "users/", listAllowedDoctor[i]);
                const doctor = await getDoc(q);
                if (doctor.exists()) {
                    if (doctor.data().allowed != null) {
                        if (doctor.data().allowed.length != 0) {
                            let allId = doctor.data().allowed
                            let tabID = allId.split(":")
                            if (tabID.indexOf(userID) == -1) {
                                listAllowed = doctor.data().allowed + ":" + userID
                            } else {
                                listAllowed = doctor.data().allowed
                            }
                        } else {
                            listAllowed = userID
                        }
                    } else {
                        listAllowed = userID
                    }
                    await updateDoc(doc(database, "users/" + listAllowedDoctor[i]), {
                        allowed: listAllowed
                    })
                }
            }
        }
        for (let i = 0; i < listRemovedDoctor.length; i++) {
            if (listRemovedDoctor[i] != null) {
                listAllowed = ""
                const q = doc(database, "users/", listRemovedDoctor[i]);
                const doctor = await getDoc(q);
                try {
                    if (doctor.data().allowed != null) {
                        if (doctor.data().allowed.length != 0) {
                            let allId = doctor.data().allowed
                            let tabID = allId.split(":")
                            let index = tabID.indexOf(userID)
                            tabID[index] = null
                            for (var j = 0; j < tabID.length; j++) {
                                if (tabID[j] != null) {
                                    listAllowed += tabID[i] + ":"
                                }
                            }
                        }
                    }
                    await updateDoc(doc(database, "users/" + listRemovedDoctor[i]), {
                        allowed: listAllowed
                    })
                } catch (e) {
                    //console.log(e)
                }
            }
        }
        listAllowed = ""
    }


    const updateAllowedList = (event) => {
        if (event.target.checked) {
            listAllowedDoctor.push(event.target.value)
            let index = listRemovedDoctor.indexOf(event.target.value)
            listRemovedDoctor[index] = null
        } else {
            let index = listAllowedDoctor.indexOf(event.target.value)
            listAllowedDoctor[index] = null
            listRemovedDoctor.push(event.target.value)
        }
        //console.log(listAllowedDoctor.length + " allowed doctor")

        for (let i = 0; i < listAllowedDoctor.length; i++) {
            //console.log(listAllowedDoctor[i])
        }
        //console.log(listRemovedDoctor.length + " removed doctor")
        for (let i = 0; i < listRemovedDoctor.length; i++) {
            //console.log(listRemovedDoctor[i])
        }
    }

    function handleButtonClick() {
        IsChoosable ? saveChanges() : getAllDoctors()
    }

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <h1>Profile</h1>
                    <p><strong>Firstname:</strong> {firstname}</p>
                    <p><strong>Lastname:</strong> {lastname}</p>
                    <h2 style={{marginTop: "30px", marginBottom: "10px"}}>Your results:</h2>
                    <div>{document.map(
                        e =>
                            <details>
                                <summary>{e.id}
                                    {/*<button className="delete" onClick={event => deleteHistory(event, e.id)}><BsTrash2Fill/></button>*/}
                                </summary>
                                {
                                    Object.entries(e.data()).map(([key, value]) => {
                                        return (key.includes("result") ?
                                            <p style={{color: "red"}}> {key} : {value} </p> : <p> {key} : {value} </p>)
                                    })
                                }
                            </details>
                    )}
                    </div>
                    <h2 style={{marginTop: "30px", marginBottom: "10px"}}>Choose which doctor can see your result</h2>
                    <div>
                        <div style={{listStyle: "none"}}>{allDoctors.map((doc, index) => (
                            <li key={index} className="row" style={{marginBottom: "20px"}}>
                                <p className="column">{doc.firstname} {doc.lastname}</p>
                                {doc.allowed ?
                                    <input className="column" type="checkbox" value={doc.idDoctor}
                                           onClick={updateAllowedList}
                                           defaultChecked/> :
                                    <input className="column" type="checkbox" value={doc.idDoctor}
                                           onClick={updateAllowedList}/>}
                            </li>
                        ))}</div>
                    </div>
                    <button
                        onClick={handleButtonClick}>{IsChoosable ? "save changes" : "Change doctor that can see your result"}</button>
                </div>
            </div>
        </>)
}