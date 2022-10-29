import React, {useEffect, useState} from "react";
import "./App.css";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import QuestionList from "./pages/Questionnaire";
import NormalValueList from "./pages/Admin";
import icon from "./hearth_icon.png"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import EditAvatar from "./pages/EditAvatar";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/404";
import Profile from "./pages/Profile";

class Nav extends React.Component {

    render() {
        let LoginLogout = null;
        let register = null;
        //used to only display login and register to unauthenticated user
        if (this.props.currentUser) {
            LoginLogout = <NavLink to="/logout">Logout</NavLink>
        } else {
            LoginLogout = <NavLink to="/login">Login</NavLink>
            register = <NavLink to="/register">Register</NavLink>
        }

        return (
            <div id="navBarDiv">
                <NavLink to="/home"><img id="icon" src={icon} alt="logo" /></NavLink>
                <nav className="navbar navbar-default appBar">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <NavLink to="/home">Home</NavLink>
                            <NavLink  to="/questionnaire">Questionnaire</NavLink>
                            <NavLink to="/editAvatar">Avatar</NavLink>
                            {register}
                            {LoginLogout}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    };
}


export default function App() {
    /* Current user state */
    const [currentUser, setCurrentUser] = useState(undefined)

    /* Watch for authentication state changes */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User is", user);
            setCurrentUser(user);
        });

        // Unsubscribe from changes when App is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    if (currentUser === undefined) {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Loading...</h1>
                </header>
            </div>
        );
    }

    return (
        <div className="App">
            <Nav currentUser={currentUser}/>
            <header className="App-header">
                <header className="App-header-align">
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/home"></Navigate>}></Route>
                        <Route path="/home" element={<Home currentUser={currentUser}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/questionnaire" element={<QuestionList currentUser={currentUser}/>}></Route>
                        <Route path="/admin" element={<NormalValueList currentUser={currentUser}></NormalValueList>}/>
                        <Route path="/editAvatar" element={<EditAvatar currentUser={currentUser}/>}/>
                        <Route path="*" element={<PageNotFound></PageNotFound>}/>
                        <Route path={"/profile"} element={<Profile currentUser={currentUser}/>}/>
                    </Routes>
                </header>
            </header>
        </div>
    );
}