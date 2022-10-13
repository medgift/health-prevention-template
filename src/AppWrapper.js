import {BrowserRouter} from "react-router-dom";
import App from "./App";
import Navbar from "./components/Navbar";

function AppWrapper() {
    return (
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    );
}

export default AppWrapper;
