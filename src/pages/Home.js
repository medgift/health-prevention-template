import {Link, useNavigate} from "react-router-dom";

export default function Home({currentUser}) {
    const navigate = useNavigate();

    return (
        <div>
            <h1>HomePage</h1>
            {!currentUser ? (
                <>
                    <p>You are currently not connected</p>
                </>
            ) : (
                <>
                    <p>Welcome back {currentUser.email}</p>
                    <br/>
                    <Link to="/logout" className="App-link">
                        Logout
                    </Link>
                </>
            )}
        </div>

    );
}