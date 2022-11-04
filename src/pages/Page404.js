import {Link} from "react-router-dom";
import Login from "./Login";
import Navbar from "../components/Navbar";
import "../pages/404.css"

export default function Page404() {
    
    return (
        
        <div >
            <Navbar/>

            <div class="message">
            <h2 id="h2404">OOPS...</h2>
            <h1 id="title404">404</h1>
            <h3 id="h3404">the page you seek does not exist</h3>
            </div>
        </div>
      
    );
}