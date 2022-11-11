import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth, database, getAuth} from "../initFirebase";
import UserForm from "../components/UserForm";
import {useNavigate} from "react-router-dom";
import {collection, query, where, getDocs} from "firebase/firestore";
import {Context} from "../App";
import {useContext, useState} from "react";
import Navbar from "../components/Navbar";

export default function Login() {
    const navigate = useNavigate();
    const {role, setRole} = useContext(Context);
    const [errors, setErrors] = useState();

    //Get User
    //Compare Role
    //Navigate to page

    const handleLogin = async (e, email, password) => {
        e.preventDefault();

        try {

            await signInWithEmailAndPassword(auth, email, password)
            let role = await getRole(email);
            setRole(role);

            switch (role) {
                case 8 :
                    navigate("/AdminPage")
                    return;
                case 1 :
                    navigate("/")
                    return;
                case 0 :
                    navigate("/DoctorPage")
                    return;
                default :
                    navigate("/")
            }

        } catch (e) {
            switch (e.code) {
                case "auth/wrong-password":
                case "auth/invalid-email":
                case "auth/user-not-found":
                    setErrors("Email or Password is invalid.");
                    break;
                case "auth/user-disabled":
                    setErrors("The user corresponding to the given email has been disabled")
                    break;
            }
        }
    };

    const getRole = async (email) => {
        //requete BD to get User where email = email
        let role = 0;
        const q = query(collection(database, "users"), where("mail", "==", email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log("voici le role " + doc.get("role"))
            role = doc.get("role");
        });

        //console.log("this " + role);
        return role;
    }

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <h1>Login</h1>
                    <p className="error"> {errors}</p>
                    <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" or="register"/>
                </div>
            </div>
        </>
    );
}

