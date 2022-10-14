import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import {PatientDB} from "../DAL/PatientDB";
import {AdminDB} from "../DAL/AdminDB";

export default function Login() {
  const navigate = useNavigate();
  let patient;
  let admin;

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      let user = auth.currentUser;

      //search for a patient in the db
      let patient = await PatientDB.prototype.getPatientById(user.uid);
      if (patient !== undefined) {
        navigate("/");
        return;
      }

      //search for an admin the db
      console.log("looking for an admin ...")
      let admin = await AdminDB.prototype.getAdminById(user.uid);
      if (admin.id !== undefined) {
        navigate("/admin")
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div>
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" />
    </div>
  );
}
