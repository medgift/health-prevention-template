import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Logout() {
  const navigate = useNavigate();
  const mySwal = withReactContent(Swal)

  useEffect(() => {
    async function logout() {
      await signOut(auth).then(
          navigate("/"),
          mySwal.fire({
              title: <strong>SignOut successful!</strong>,
              icon: 'success'
          })
      );
    }
    logout()
  }, [navigate]);

  return <h1>Logging out...</h1>;
}
