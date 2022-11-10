import React, {useEffect, useState} from "react";
import {doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc} from "firebase/firestore";
import {auth, database} from "../initFirebase";


export default function AdminVarTest() {

    const [getData, setData] = useState([])
    const [vars, setVars] = useState({})
    const [isBusy, setBusy] = useState(true)

    console.log("Bonjour " + getData)

    useEffect(() => {
        getDocs(collection(database, "variables")).then(query => {
            let docsT = {};
            query.forEach((doc) => {
                docsT[doc.id] = doc.data();
            })
            console.log(docsT)
            setVars(docsT);
            setBusy(false);
        })
    }, []);


    //To Make changes on the Variables
    function handleInputChange(varName, varField, e) {
        let variable = {...vars};
        variable[varName][varField] = Number(e.target.value);
        setVars(variable);
    }

    //submit changements
    function onSubmitForm(e) {
        Object.keys(vars).forEach(varName => {
            const docRef = doc(database, "variables", varName);
            updateDoc(docRef, vars[varName]);
        })
        console.log("The data was saved");
        e.preventDefault()
    }

    return (
        <>
            {isBusy ? <Loader/> :
                <>

                    <form onSubmit={onSubmitForm}>
                        {Object.keys(vars).map((doc) => {
                            return (
                                <div key={doc.id}>
                                    <h3>{doc}</h3>

                                    {Object.keys(vars[doc]).map((varField) => {
                                        return (
                                            <div>
                                                <div>{varField}</div>
                                                <input
                                                    type="number"
                                                    defaultValue={vars[doc][varField]}
                                                    onChange={e => handleInputChange(doc, varField, e)}
                                                />

                                            </div>
                                        )
                                    })}

                                </div>
                            )
                        })}
                        <button type="submit" onClick={onSubmitForm}>Change Variables</button>
                        <br/>
                    </form>
                </>
            }

        </>
    )

}

export function Loader() {
    return (
        <p>
            LOADING
        </p>
    );
}

