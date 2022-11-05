import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import {Navigate, NavLink, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import QuestionList from "./pages/Questionnaire";
import NormalValueList from "./pages/Admin";
import icon from "./hearth_icon.png"
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./initFirebase";
import EditAvatar from "./pages/EditAvatar";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/404";
import Profile from "./pages/Profile";
import {PatientDB} from "./DAL/PatientDB";
import {AdminDB} from "./DAL/AdminDB";
import {AvailableRoles, RoleContext} from "./Context/UserRoles"
import {DoctorDB} from "./DAL/DoctorDB";
import DoctorPage from "./pages/Doctor";

class Nav extends React.Component {

    render() {
        let LoginLogout = null;
        let register = null;
        let profile = null;
        let docPage = null;

        //used to only display login and register to unauthenticated user
        if (this.props.currentUser) {
            LoginLogout = <NavLink to="/logout">Logout</NavLink>
        } else {
            LoginLogout = <NavLink to="/login">Login</NavLink>
            register = <NavLink to="/register">Register</NavLink>
        }
        if (this.context.role === AvailableRoles.DOCTOR) {
            docPage = <NavLink to="/doctor">Patients</NavLink>
        }
        if (this.context.role === AvailableRoles.PATIENT) {
            profile = <NavLink to="/profile">Profile</NavLink>
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
                            {profile}
                            {docPage}
                            {register}
                            {LoginLogout}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    };
}

Nav.contextType = RoleContext;

export default function App() {
    /* Current user from firestore */
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentPatient, setCurrentPatient] = useState(undefined);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const userRoleContext = useContext(RoleContext);

    //navigation
    const navigate = useNavigate();
    const location = useLocation();

    /* Watch for authentication state changes */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User is", user);
            setCurrentUser(user);

            //Search for users in the db
            redirectUser(user, setCurrentPatient);
        });
        // Unsubscribe from changes when App is unmounted
        return () => {
            unsubscribe();
        };
    }, []);

    async function redirectUser(user, setCurrentPatient) {
        if (user) {
            console.log("signing in ...")
            //search for a patient in the db
            let patient = await PatientDB.prototype.getPatientById(user.uid);
            if (patient != null) {
                setCurrentPatient(patient);
                userRoleContext.role = AvailableRoles.PATIENT;
                navigate("/questionnaire");
                return;
            }

            //search for a doctor in the db
            let doctor = await DoctorDB.prototype.getDoctorById(user.uid);
            if (doctor != null) {
                userRoleContext.role = AvailableRoles.DOCTOR;
                navigate("/doctor");
                return;
            }

            //search for an admin the db
            let admin = await AdminDB.prototype.getAdminById(user.uid);
            if (admin != null) {
                userRoleContext.role = AvailableRoles.ADMIN;
                navigate("/admin");
                return;
            }
            console.log("Cannot find user in DB.")
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
    let patientId = currentUser ? currentUser.uid : null;
    return (
        <div id="body" className="App" style={{backgroundImage: `url(${backgroundImage})`}}>
            <Nav currentUser={currentUser} setBackgroundImage={setBackgroundImage}/>
            <header className="App-header">
                <header className="App-header-align">
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/home"></Navigate>}></Route>
                        <Route path="/home"
                               element={<Home currentUser={currentUser} setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/register" element={<Register setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/login" element={<Login setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/questionnaire" element={<QuestionList currentUser={currentUser}
                                                                            setBackgroundImage={setBackgroundImage}/>}></Route>
                        <Route path="/admin" element={<NormalValueList currentUser={currentUser}
                                                                       setBackgroundImage={setBackgroundImage}></NormalValueList>}/>
                        <Route path="/view"
                               element={<MyPage patientId={patientId} setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/doctor" element={<DoctorPage currentUser={currentUser}
                                                                   setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/editAvatar" element={<EditAvatar currentUser={currentUser}/>}/>
                        <Route path="*"
                               element={<PageNotFound setBackgroundImage={setBackgroundImage}></PageNotFound>}/>
                        <Route path={"/profile"}
                               element={<Profile currentUser={currentUser} setBackgroundImage={setBackgroundImage}/>}/>
                    </Routes>
                </header>
            </header>
        </div>
    );
}