import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { db } from "../initFirebase";
import { doc, setDoc } from "firebase/firestore";
import { refUser, refDocteur, refRoles } from "../initFirebase";
import { User } from "../objects/User";
import { Docteur } from "../objects/Docteur";
import "@fontsource/lexend-deca";
import logo from "../pages/img/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password, isDoc) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //To create the doc correspondant in Firestore
      if (isDoc) {
        CreateDocDocteur(new Docteur(email));
      } else {
        CreateDocUser(new User(email, 20, 0, 50, 165));
      }
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="register_page">
      <img className="logo" src={logo}></img>
      <h1 className="app_title">HealthApp</h1>
      <h1>Register</h1>
      <p className="click_here">
        Register yourself to keep track on your health{" "}
      </p>
      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />
    </div>
  );
}

async function CreateDocUser(user) {
  //By default : the constructor put the patient id as the id_role

  // Add a new document with the id of the auth user created.
  const docRef = await setDoc(doc(refUser, auth.currentUser.uid), user);
  console.log("Auth User ID: ", auth.currentUser.uid);
  console.log("Document User written with ID: ", docRef.id);
}
async function CreateDocDocteur(docteur) {
  const docRef = await setDoc(doc(refDocteur, auth.currentUser.uid), docteur);
  console.log("Auth User ID: ", auth.currentUser.uid);
  console.log("Document User written with ID: ", docRef.id);
}
