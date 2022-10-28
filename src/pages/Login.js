import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import UserForm from "../components/UserForm";
import {useNavigate} from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.error(e);
            alert(e);
        }
    };

    return (
        <div className="padded_div login">
            <h2>Sign in</h2>
            <UserForm handleSubmit={handleLogin} submitButtonLabel="Confirm"/>
        </div>
    );
}
