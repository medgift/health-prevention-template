import React from "react";
import {doc, setDoc, getDoc, collection, query, where, getDocs} from "firebase/firestore";
import {auth, database} from "../initFirebase";
import Data from "../components/Data";


export default class AdminVar extends React.Component {

    constructor(){
        super();
        this.state = {
            newVar : this.emptyVar
        }

        
        const emptyVar = {afcancer : "", afinfo:"", age: "", alcool:"", avc:"", date:"", diab:"", diet:"", glyc:"", hdl:"", height:"", inf:"",  sex:"", smoking:"", sport:"", syst:"", weight:""}
    }

    //get Normal Values : variables/default/normal
    //db. collection("default"). where("normal", "==", true)
    async getNormalValues() {
        const q = query(collection(database, "variables/default", "normal"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            // let myVar = new Data();
            // myVar.afcancer = doc.data().afcancer;
            // myVar.afinf = doc.data().afinf;
            // myVar.age = doc.data().age;
            // myVar.alcool = doc.data().alcool;
            // myVar.avc = doc.data().avc;
            // myVar.date = doc.data().date;
            // myVar.diab = doc.data().diab;
            // myVar.glyc = doc.data().glyc;
            // myVar.hdl = doc.data().hdl;
            // myVar.height = doc.data().height;
            // myVar.inf = doc.data().inf;
            // myVar.sex = doc.data().sex;
            // myVar.smoking = doc.data().smoking;
            // myVar.sport = doc.data().sport;
            // myVar.syst = doc.data().syst;
            // myVar.weight = doc.data().weight;

        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        });
    }

    //UpdateValues

    //Store them on the server




    render(){
        return(
            <>

                <h2>Buenos dIas</h2>

                <ul>{this.state.data.map((data, index) => (
                <li key={index}>
                    <Data {...data}></Data>
                </li>
                ))}</ul>
                  
            </>
        )
    }

}