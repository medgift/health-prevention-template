import UserForm from "../components/UserForm";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth, database} from "../initFirebase";
import {useNavigate} from "react-router-dom";
import {doc, setDoc} from "firebase/firestore";

export default function Register() {
    const navigate = useNavigate();

    const handleRegister = async (e, email, password) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            onAuthStateChanged(auth, async (user) => {
                await setDoc(doc(database, "users", user.uid), {
                    firstname: "test"
                });
            });

            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="Content">
            <div className="Login-Form">
                <h1>Register</h1>
                <UserForm handleSubmit={handleRegister} submitButtonLabel="Register"/>
            </div>
        </div>
    );
}
