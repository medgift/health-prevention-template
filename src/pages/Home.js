import {Link} from "react-router-dom";
import Login from "./Login";
import Questionnary from "./Questionnary";

export default function Home({currentUser}) {
    return (
        <>
                {!currentUser ? (
                    <>
                        <Login/>
                    </>
                ) : (
                    <div>
                    <Questionnary />
                    <Link to="/logout" className="App-link">
                    Logout
                    </Link>
                    <Link to="/ShowResult" className="App-link">
                        Show Result
                    </Link>
                    </div>
                )}
        </>
    );
}
