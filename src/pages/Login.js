import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import UserForm from "../components/UserForm";
import {useNavigate} from "react-router-dom";
import {PatientDB} from "../DAL/PatientDB";
import {AdminDB} from "../DAL/AdminDB";

export default function Login() {
    const navigate = useNavigate();

    const handleLogin = async (e, email, password) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            let user = auth.currentUser;

            //search for a patient in the db
            let patient = await PatientDB.prototype.getPatientById(user.uid);
            if (patient != null) {
                navigate("/questionnaire");
                return;
            }

            //search for an admin the db
            let admin = await AdminDB.prototype.getAdminById(user.uid);
            if (admin != null) {
                navigate("/admin")
                return;
            }

            console.log("No admin or patients found")
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="padded_div login">
            <h2>Sign in</h2>
            <UserForm handleSubmit={handleLogin} submitButtonLabel="Confirm"/>
        </div>
    );
}
