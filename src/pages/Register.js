import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { db } from "../initFirebase";
import {doc,setDoc} from "firebase/firestore";
import { refUser, refRole } from "../initFirebase";
import { User } from "../objects/User";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      CreateDocUser(new User(email,'idRoleExemple', 20, 0,50, 165 ), 'Patient');
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />
    </div>
  );
}


async function CreateDocUser(user, role) {
  //recup id du role selon role choisi

  const snapshot = await refRole.where('nom_role', '==', role).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }  
  
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
    user.id_role = doc.uid;
  });

// Add a new document with a generated id.
const docRef = await setDoc(doc(refUser, auth.currentUser.uid), user)
console.log("Auth User ID: ", auth.currentUser.uid);

console.log("Document User written with ID: ", docRef.id);
  
}