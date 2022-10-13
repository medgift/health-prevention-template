import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getAuthCurrentUserId } from "../initFirebase";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import "@fontsource/lexend-deca";
import {  getRoleById } from "../objects_managers/RoleManager";
import { getUserById } from "../objects_managers/UserManager";
import  {NavbarNotLogged}  from "./Navbar";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      let roleOfUser = await CheckRole();
      console.log("Role of the User Returned :  ", roleOfUser);

      if(roleOfUser==='Admin'){
        console.log("Nav to Admin Portal");
          //navigate("/admin");
      }

      if(roleOfUser==='Docteur'){
        console.log("Nav to Docteur Portal");
         // navigate("/registration");
      }
      //? don't know why it don't understand it's equal and goes to Invite portal :/
      if(roleOfUser==='Patient'){
        console.log("Nav to Patient Portal");
        return navigate("/registration");
      }
      else{
        console.log("Nav to Invite Portal");
          return navigate("/survey");
      }
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
    <NavbarNotLogged/>
    <div>
      {/* <img className="logo" src={logo}></img>
      <h2 className="app_title">Health Prevention</h2> */}
      <h3 className="page_name">Login</h3>
      <span>
        <p className="click_here">
          You're new here ?<Link to="/Register">click here to register</Link>
        </p>
      </span>
      <UserForm handleSubmit={handleLogin} submitButtonLabel="Login" />
    </div>
    </>
    
  );
}

export async function CheckRole() {
  const userid = await getAuthCurrentUserId();
  //Get the user
  let user = await getUserById(userid);

  //  if(user === null){
  //   user = getDocteurById();
  //  }
  if (user === null) {//By Default it is a Guest if no user nor doctor was found
    return "Invite";
  }
  //Get all role existing
  let RoleNameOfUser ;
  await getRoleById(user.id_role).then((role) => {
    RoleNameOfUser = role.nom_role;
  });
  return RoleNameOfUser;
}
