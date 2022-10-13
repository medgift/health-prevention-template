import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { User, setId } from "../objects/User";
import { CreateDocUser } from "../objects_managers/UserManager";
import { NavbarNotLogged } from "./Navbar";
import "@fontsource/lexend-deca";
import logo from "../pages/img/logo.png";
import "./pages.css";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      //To create the user document in Firestore with the id created by Auth
      let user= new User(email);
      user.setId(auth.currentUser.uid);
      CreateDocUser(user);
      
      navigate("/Registration");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
        <NavbarNotLogged/>
    <div className="register_page">
      {/* <img className="logo" src={logo}></img>
      <h2 className="app_title">Health Prevention</h2> */}
      <h3 className="page_name">Register</h3>
      <p className="click_here">
        Register yourself to keep track on your health{" "}
      </p>
      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />
    </div>
    </>
    
  );
}



