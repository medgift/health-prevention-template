import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { User } from "../objects/User";
import { Docteur } from "../objects/Docteur";
import { CreateDocUser } from "../objects_managers/UserManager";
import { CreateDocDocteur } from "../objects_managers/DocteurManager";
import "@fontsource/lexend-deca";
import logo from "../pages/img/logo.png";
import "./pages.css";

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
      navigate("/registration");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="register_page">
      <img className="logo" src={logo}></img>
      <h2 className="app_title">Health Prevention</h2>
      <h3 className="page_name">Register</h3>
      <p className="click_here">
        Register yourself to keep track on your health{" "}
      </p>
      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />
    </div>
  );
}



