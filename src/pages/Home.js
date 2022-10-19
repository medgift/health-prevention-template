import { Link } from "react-router-dom";
import {PatientDB} from "../DAL/PatientDB";

export default function Home({ currentUser }) {

  return (
    <div className="padded_div">
      <h1>Welcome to the Health Prevention Questionnaire</h1>
      {!currentUser ? (
        <>
          <Link to="/register" className="App-link">
            Register
          </Link>
          <span> / </span>
          <Link to="/login" className="App-link">
            Login
          </Link>
        </>
      ) : (
        <Link to="/logout" className="App-link">
          Logout
        </Link>
      )}
    </div>
  );
}


