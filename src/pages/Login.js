import { Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getAuthCurrentUser } from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import "@fontsource/lexend-deca";
import logo from "../pages/img/logo.png"
import { CreateDocResultats } from "../objects_managers/ResultatsManager";
import { Resultats } from "../objects/Resultats";
import { GetAllRole } from "../objects_managers/RoleManager";
import { getUserById } from "../objects_managers/UserManager";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = getAuthCurrentUser();
      let roleOfUser = CheckRole(user.uid);

      switch(roleOfUser){
        case "Admin":
        //  navigate("/Admin")
          break;
        case "Docteur":
          //  navigate("/docteur")
          break;
        case "Patient":
          console.log("Nav to Patient Portal");
            navigate("/")
          break;
        case "Invite":
            navigate("/")
          break;
        default:
          navigate("/")
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
     <img className="logo" src={logo} alt="img"></img>
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


export function CheckRole(authUserId){
 //Get the user
 let user = getUserById();

//  if(user === null){
//   user = getDocteurById();
//  }
 if(user === null){
  //By Default it is a Guest if no user nor doctor was found
  return "Invite";
 }
 //Get all role existing
  let roles = GetAllRole();
  let RoleNameOfUser;

  roles.then((roles) => {
      roles.forEach((el)=>{
        if(el.id_role === user.id_role){
          RoleNameOfUser = el.nom_role;
        }
    })
  })
  return RoleNameOfUser;
}
