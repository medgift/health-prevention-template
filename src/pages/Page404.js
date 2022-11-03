import {Link} from "react-router-dom";
import Login from "./Login";
import Navbar from "../components/Navbar";

export default function Page404() {
    
    return (
        <>
            <Navbar/>
            <h2>OPS! Page Not found</h2>
            <h1>404</h1>
            <h3>We're sorry but the page requested was not found</h3>
        </>
    );
}