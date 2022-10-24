import React from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import QuestionList from "./pages/Questionnaire";
import NormalValueList from "./pages/Admin";
//import icon from "./icon.svg.png";
import icon from "./hearth_icon.png"

import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";

import EditAvatar from "./pages/EditAvatar";
import {db} from "./initFirebase";
import {useEffect, useState, Component} from "react";
import Logout from "./pages/Logout";

class Navigate extends React.Component {

    render() {
        let LoginLogout = null;
        let register = null;
        //used to only display login and register to unauthenticated user
        if (this.props.currentUser) {
            LoginLogout = <a href="/logout">Logout</a>
        } else {
            LoginLogout = <a href="/login">Login</a>
            register = <li><a href="/register">Register</a></li>
        }

        return (
            <div id="navBarDiv">
                <a href="/home"><img id="icon" src={icon} alt="logo" /></a>
                <nav className="navbar navbar-default appBar">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <li><a href="/home">Home</a></li>
                            <li><a href="/">Questionnaire</a></li>
                            <li><a href="/editAvatar">Avatar</a></li>
                            {register}
                            <li>{LoginLogout}</li>
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

    //Separation of editAvatar Route due to css display issues (text-align: center;)
    return (
        <div className="App">
            <Navigate currentUser={currentUser}/>
            <header className="App-header">
                <header className="App-header-align">
                    <Routes>
                        <Route path="/home" element={<Home currentUser={currentUser}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/" element={<QuestionList currentUser={currentUser}/>}></Route>
                        <Route path="/admin" element={<NormalValueList currentUser={currentUser}></NormalValueList>}/>
                    </Routes>
                </header>
                <Routes>
                    <Route path="/editAvatar" element={<EditAvatar currentUser={currentUser}/>}/>
                </Routes>
            </header>

        </div>
    );
}