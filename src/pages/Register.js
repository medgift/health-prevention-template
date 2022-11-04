import UserForm from "../components/UserForm";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth, database} from "../initFirebase";
import {useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";
import Navbar from "../components/Navbar";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e, email, password) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async (user) => {
                await setDoc(doc(database, "users", user.uid), {
                    mail: email,
                    password: password,
                    role: 1
                });
            });

            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="form">
                    <h1>Register</h1>
                    <UserForm handleSubmit={handleRegister} submitButtonLabel="Register"/>
                </div>
            </div>
        </>
    );
}
