import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {auth, database, getAuth} from "../initFirebase";
import UserForm from "../components/UserForm";
import {useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Context } from "../App";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  let {setRole} = useContext(Context);

  //Get User
  //Compare Role
  //Navigate to page

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      
      await signInWithEmailAndPassword(auth, email, password)
      let role = await getRole(email);
      setRole(role); 
      console.log(role)

      switch(role){
        case 8 : navigate("/AdminPage")
          return;
        //case 2 : navigate("/DoctorPAge")
        //  return;
        default : navigate("/")
          return;
      }

      
    } catch (e) {
      console.error(e);
    }
  };

  const getRole = async (email) => {
      //requete BD to get User where email = email
      var role = 0;
      const q = query(collection(database, "users"), where("mail", "==", email));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log("voici le role " + doc.get("role"))
        //role = doc.data().role;
        role = doc.get("role");
      });

      console.log("this " + role);
      return role;

  }

  return (
      <div className="Content">
        <div className="Login-Form">
      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" or="register" />
    </div>
      </div>
  );
}
