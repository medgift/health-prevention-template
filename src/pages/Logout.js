import {useContext, useEffect} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../initFirebase";
import {useNavigate} from "react-router-dom";
import {RoleContext, AvailableRoles} from "../Context/UserRoles"


export default function Logout() {
  const navigate = useNavigate();
  const userRoleContext = useContext(RoleContext);

  useEffect(() => {
    async function logout() {
      await signOut(auth);
      userRoleContext.role = AvailableRoles.GUEST;
      navigate("/home");
    }

    logout();
  }, [navigate]);

  return <h1>Logging out...</h1>;
}
