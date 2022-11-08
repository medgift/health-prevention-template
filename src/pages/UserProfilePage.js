import React, { useContext, useEffect, useState } from "react";
import {collection, getDoc, getDocs, query} from "firebase/firestore";
import {doc, updateDoc} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import Navbar from "../components/Navbar";
import {onAuthStateChanged} from "firebase/auth";
import "../UserProfilPage.css"
import {tab} from "@testing-library/user-event/dist/tab";
import {findRenderedDOMComponentWithClass} from "react-dom/test-utils";
import {useNavigate} from "react-router-dom";
import { Context } from "../App";


export class doctor{
    idDoctor: string;
    firstname: string;
    lastname: string;
    allowed: boolean;
}

export default function UserProfilePage() {

    const [allDoctors, addDoctor] = useState([])
    const [IsChoosable,setChoosableState ] = useState(false)
    const [listAllowedDoctor, setList] = useState([])
    const [listRemovedDoctor, setRemoveList] = useState([])
    const navigate = useNavigate();
    const {role} = useContext(Context);
    console.log("user " + role.role)

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



    async function getAllDoctors() {
        getCurrentUser()
        setList([])
        setRemoveList([])
        setChoosableState(!IsChoosable)
        const q = query(collection(database, "users/"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().role === 2) {
                let creatDoctor = new doctor()
                creatDoctor.idDoctor = doc.id
                creatDoctor.lastname = doc.data().lastname
                creatDoctor.firstname = doc.data().firstname
                if(doc.data().allowed != null ) {
                    if(doc.data().allowed.length != 0) {
                        let allId = doc.data().allowed
                        let tabID = allId.split(':')
                        listAllowedDoctor.push(tabID)
                        tabID.indexOf(userID) != -1 ? creatDoctor.allowed = true : creatDoctor.allowed = false
                    }
                }
                addDoctor(oldArray => [...oldArray, creatDoctor])
                }
        })
        for(var i = 0; i < listAllowedDoctor.length; i++){
        }
    }

   async function saveChanges(){
        setChoosableState(!IsChoosable)
        addDoctor([])
       getCurrentUser()
       for (let i = 0; i < listAllowedDoctor.length; i++){
           listAllowed = ""
           if(listAllowedDoctor[i] != null) {
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
                                if(tabID[j] != null) {
                                    listAllowed += tabID[i] + ":"
                                }
                           }
                       }
                   }
                   await updateDoc(doc(database, "users/" + listRemovedDoctor[i]), {
                       allowed: listAllowed
                   })
               } catch (e) {
                   console.log(e)
               }
           }
       }
       listAllowed = ""
   }


    const updateAllowedList = (event) => {
        if(event.target.checked){
            listAllowedDoctor.push(event.target.value)
            var index = listRemovedDoctor.indexOf(event.target.value)
            listRemovedDoctor[index] = null
        }else{
            var index = listAllowedDoctor.indexOf(event.target.value)
            listAllowedDoctor[index] = null
            listRemovedDoctor.push(event.target.value)
        }
        console.log(listAllowedDoctor.length + " allowed doctor")

        for(var i = 0; i < listAllowedDoctor.length; i++)
        {
            console.log(listAllowedDoctor[i])
        }
        console.log(listRemovedDoctor.length + " removed doctor")
        for(var i = 0; i < listRemovedDoctor.length; i++)
        {
            console.log(listRemovedDoctor[i])
        }
    }

    function handleButtonClick() {
        IsChoosable ?  saveChanges() : getAllDoctors()
    }
            return(<div>
            <Navbar />
            <p>Choose which doctor can see your result</p>
            <div>
                <ul style={{listStyle: "none"}}>{allDoctors.map((doc, index)=>(
                    <li key={index} className="row">
                        <p className="column">{doc.firstname} {doc.lastname}</p>
                        {doc.allowed ?     <input  className="column" type="checkbox" value={doc.idDoctor} onClick={updateAllowedList} defaultChecked /> : <input className="column" type="checkbox" value={doc.idDoctor} onClick={updateAllowedList} />}
                    </li>
                ))}</ul>
            </div>

            <button onClick={handleButtonClick}>{IsChoosable ? "save changes" : "Change doctor that can see your result"}</button>
        </div>)


}