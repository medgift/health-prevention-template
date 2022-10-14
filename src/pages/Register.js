import UserFormLogin from "../components/UserFormLogin";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import UserFormRegister from "../components/UserFormRegister";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, firstName, lastName, email, password) => {
    e.preventDefault();
    console.log(firstName, " ", lastName, " ", email, " ", password);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <UserFormRegister handleSubmit={handleRegister} submitButtonLabel="Register" />
    </div>
  );
}
