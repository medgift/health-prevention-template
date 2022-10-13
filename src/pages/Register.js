import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <div className="Content">
        <div className="Login-Form">
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />
          </div>
    </div>
  );
}
