import React from "react";
import "./App.css";
import {Route, Routes, NavLink, Navigate, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import QuestionList from "./pages/Questionnaire";
import NormalValueList from "./pages/Admin";
import icon from "./hearth_icon.png"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import EditAvatar from "./pages/EditAvatar";

import {useEffect, useState} from "react";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/404";
import {PatientDB} from "./DAL/PatientDB";
import {AdminDB} from "./DAL/AdminDB";
import {UserRoles} from "./DTO/UserRoles"
import MyPage from "./pages/MyPage";

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
                <NavLink to="/home"><img id="icon" src={icon} alt="logo"/></NavLink>
                <nav className="navbar navbar-default appBar">
                    <div className="container-fluid">
                        <ul className="nav navbar-nav">
                            <NavLink to="/home">Home</NavLink>
                            <NavLink to="/questionnaire">Questionnaire</NavLink>
                            <NavLink to="/view">Results</NavLink>
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
    /* Current user from firestore */
    const [currentUser, setCurrentUser] = useState(undefined);
    const [userRole, setUserRole] = useState(UserRoles.prototype.GUEST);
    const [currentPatient, setCurrentPatient] = useState(undefined);
    const navigate = useNavigate();

    /* Watch for authentication state changes */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User is", user);
            setCurrentUser(user);

            //Search for users in the db
            redirectUser(user, setCurrentPatient, setUserRole);
        });
        // Unsubscribe from changes when App is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    async function redirectUser(user, setCurrentPatient) {
        if (user) {
            console.log("SIGNING IN !*****************************")
            //search for a patient in the db
            let patient = await PatientDB.prototype.getPatientById(user.uid);
            if (patient != null) {
                setCurrentPatient(patient);
                setUserRole(UserRoles.prototype.PATIENT);
                navigate("/questionnaire");
                return;
            }
            //search for an admin the db
            let admin = await AdminDB.prototype.getAdminById(user.uid);
            if (admin != null) {
                navigate("/admin");
                setUserRole(UserRoles.prototype.ADMIN);
                return;
            }
            console.log("No admin or patients found");
        }
    }

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
                        <Route path="/view" element={<MyPage/>}/>
                        <Route path="/editAvatar" element={<EditAvatar currentUser={currentUser}/>}/>
                        <Route path="*" element={<PageNotFound></PageNotFound>}/>
                    </Routes>
                </header>
            </header>
        </div>
    );
}