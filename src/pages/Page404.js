import {Link} from "react-router-dom";
import Login from "./Login";
import Navbar from "../components/Navbar";
import "../pages/404.css"

export default function Page404() {

    return (
        <>
            <Navbar/>
            <div className="box">
                <div className="wrapper">
                    <div class="message">
                        <h2>OOPS...</h2>
                        <h1>404</h1>
                        <h3>the page you seek doesn't exists</h3>
                    </div>
                </div>
            </div>
        </>
    );
}