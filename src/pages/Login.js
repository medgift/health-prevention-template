import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import UserFormLogin from "../components/UserFormLogin";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import loginBackground from "../images/Login.jpg";

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
        <Container>
            <img src={loginBackground} style={{width: "30%", borderRadius:"10px", padding:"5%"}}/>
            <div className="mainDivLogin">
                <h1 className="mainTitleLogin">Login</h1>
                <UserFormLogin handleSubmit={handleLogin} submitButtonLabel="Sign In"/>
            </div>
        </Container>
    );
}

const Container = styled.div`
  background: #61dafb;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 2%;
  border-radius: 50px;
  

  
`;