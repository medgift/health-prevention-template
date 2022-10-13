import {Link} from "react-router-dom";
import Login from "./Login";

export default function Home({currentUser}) {
    return (
        <div className="Content">
            <div className="Login-Form">
                <h2>Health Prevention Questionnaire</h2>
                {!currentUser ? (
                    <>
                        <Login/>
                        or &nbsp;
                        <Link to="/register" className="App-link">
                            Register
                        </Link>
                    </>
                ) : (
                    <div>
                    <Link to="/logout" className="App-link">
                        Logout
                    </Link>
                    <Link to="/ShowResult" className="App-link">
                        Show Result
                    </Link>
                    </div>
                )}
            </div>

        </div>
    );
}
