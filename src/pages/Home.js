import { Link } from "react-router-dom";
import Algorithm from "./Algorithm"

export default function Home({ currentUser }) {
    console.log("java script pue la merde")
  return (
    <div>
        <Algorithm></Algorithm>
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
