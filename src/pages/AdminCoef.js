import React, {useEffect, useState} from "react";
import {doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc} from "firebase/firestore";
import {auth, database} from "../initFirebase";

export default function AdminCoef() {

    const [getData, setData] = useState([])
    const [coefs, setCoefs] = useState({})
    const [isBusy, setBusy] = useState(true)

    console.log("Bonjour " + getData)

    useEffect(() => {
        getDocs(collection(database, "coefficients")).then(query => {
            let docsT = {};
            query.forEach((doc) => {
                docsT[doc.id] = doc.data();
            })
            setCoefs(docsT);
            setBusy(false);
        })
    }, []);


    //To Make changes on the Variables
    function handleInputChange(coefName, coefField, e) {
        let coef = {...coefs};
        coef[coefName][coefField] = Number(e.target.value);
        setCoefs(coef);
    }

    //submit changements
    function onSubmitForm(e) {
        Object.keys(coefs).forEach(coefName => {
            const docRef = doc(database, "coefficient", coefName);
            updateDoc(docRef, coefs[coefName]);
        })
        console.log("The data was saved");
        e.preventDefault()
    }

    return (
        <>
            {isBusy ? <Loader/> :
                <>

                    <form onSubmit={onSubmitForm}>
                        {Object.keys(coefs).map((doc) => {
                            return (
                                <div key={doc.id}>
                                    <h3>{doc}</h3>

                                    {Object.keys(coefs[doc]).map((coefField) => {
                                        return (
                                            <div>
                                                <div>{coefField}</div>
                                                <input
                                                    type="number"
                                                    defaultValue={coefs[doc][coefField]}
                                                    onChange={e => handleInputChange(doc, coefField, e)}
                                                />
                                            </div>
                                        )
                                    })}

                                </div>
                            )
                        })}
                        <button type="submit" onClick={onSubmitForm}>Change coefficient</button>
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