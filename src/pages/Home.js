import {Link} from "react-router-dom";
import Login from "./Login";
import Questionnary from "./Questionnary";
import Navbar from "../components/Navbar";

export default function Home({currentUser}) {
    return (
        <>
            {!currentUser ? (
                <>
                    <Login/>
                </>
            ) : (
                <div className="wrapper">
                    <Navbar />
                    <div className="box">
                        <Questionnary />
                    </div>
                </div>
            )}
        </>
    );
}
