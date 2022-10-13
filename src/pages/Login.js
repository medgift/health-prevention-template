import { Link} from "react-router-dom";
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

      //Faire requete pour savoir si le user connecté est un user - un docteur ou un admin


      navigate("/homeApp");
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
      <p className="click_here">You're new here ?   
        <Link to="/Register" >click here to register</Link>
       </p>
      </span>
      <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" />
    </div>
  );
}
