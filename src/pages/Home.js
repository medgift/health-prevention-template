import { Link, Route } from "react-router-dom";
import Algorithm from "./Algorithm"
import {database} from "../initFirebase";

export default function Home({ currentUser }) {

  return (
    <div>
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
        <>
        <Link to="/logout" className="App-link">
          Logout
        </Link>
        <br/>
        <Link to="/info" className="App-link">
          Info
        </Link>
      </>
      )}
    </div>
  );
}
