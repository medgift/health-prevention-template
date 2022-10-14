import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import {PatientDB} from "../DAL/PatientDB";

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
      if (patient.firstName !== undefined) {
        console.log("Patient " + patient.firstName + " found !");
        navigate("/");
        return;
      }

      //search for an admin the db
      console.log("looking for an admin ...")
      let admin;
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
