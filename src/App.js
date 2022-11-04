import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import {Route, Routes, NavLink, Navigate, useNavigate, useLocation} from "react-router-dom";
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
import {RoleContext, AvailableRoles} from "./Context/UserRoles"
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
            profile = <NavLink to="/profile">Profile</NavLink>
        } else {
            LoginLogout = <NavLink to="/login">Login</NavLink>
            register = <NavLink to="/register">Register</NavLink>
        }
        if(this.props.isDoctor){
            docPage = <NavLink to="/doctor">Patients</NavLink>
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


export default function App() {
    /* Current user from firestore */
    const [currentUser, setCurrentUser] = useState(undefined);
    const [userRole, setUserRole] = useState(UserRoles.prototype.GUEST);
    const [currentPatient, setCurrentPatient] = useState(undefined);
    const [backgroundImage, setBackgroundImage] = useState(null);
    let isDoctor = useState(false);
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
                setUserRole(UserRoles.prototype.DOCTOR);
                isDoctor = true;
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

    return (
        <div id="body" className="App" style={{backgroundImage: `url(${backgroundImage})`}}>
            <Nav currentUser={currentUser} setBackgroundImage={setBackgroundImage} isDoctor={isDoctor}/>
            <header className="App-header">
                <header className="App-header-align">
                    <Routes>
                        <Route exact path="/" element={<Navigate to="/home"></Navigate>}></Route>
                        <Route path="/home" element={<Home currentUser={currentUser} setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/register" element={<Register setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/login" element={<Login setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/questionnaire" element={<QuestionList currentUser={currentUser} setBackgroundImage={setBackgroundImage}/>}></Route>
                        <Route path="/admin" element={<NormalValueList currentUser={currentUser} setBackgroundImage={setBackgroundImage}></NormalValueList>}/>
                        <Route path="/view" element={<MyPage setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/doctor" element={<DoctorPage currentUser={currentUser} setBackgroundImage={setBackgroundImage}/>} />
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