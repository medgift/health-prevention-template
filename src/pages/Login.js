import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import "@fontsource/lexend-deca";
import logo from "../pages/img/logo.png"

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
     <img className="logo" src={logo}></img>
      <h1 className="app_title">HealthApp</h1>
      <h1>Login</h1> 
      <span>
      <p className="click_here">You're new here ? click here to register </p>
      </span>
      <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" />
    </div>
  );
}
