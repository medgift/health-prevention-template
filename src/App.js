import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import {Navigate, NavLink, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import LatestResult from "./pages/MyPage";
import QuestionList from "./pages/Questionnaire";
import NormalValueList from "./pages/Admin";
import icon from "./hearth_icon.png"
import expand from "./expand_navbar.jpg"
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

    constructor(props) {
        super(props);
        this.state = {
            isNavBarOpen: false
        }
    }

    toggleNavBarOpen = () => {
        this.setState((prevState) => ({
            isNavBarOpen: !prevState.isNavBarOpen
        }));
    };

    closeNavBar = () => {
        this.setState({isNavBarOpen: false});
    }

    render() {
        let LoginLogout = null;
        let register = null;
        let profile = null;
        let docPage = null;
        let questionnaire = null;
        let results = null;
        let admin = null;

        switch (this.context.role) {
            case AvailableRoles.ADMIN:
                admin = <NavLink to="/admin" onClick={() => this.closeNavBar()}>Admin</NavLink>
                LoginLogout = <NavLink to="/logout" onClick={() => this.closeNavBar()}>Logout</NavLink>
                break;
            case AvailableRoles.DOCTOR:
                docPage = <NavLink to="/doctor" onClick={() => this.closeNavBar()}>Patients</NavLink>
                LoginLogout = <NavLink to="/logout" onClick={() => this.closeNavBar()}>Logout</NavLink>
                break;
            case AvailableRoles.PATIENT:
                questionnaire = <NavLink to="/questionnaire" onClick={() => this.closeNavBar()}>Questionnaire</NavLink>
                results = <NavLink to="/view" onClick={() => this.closeNavBar()}>Results</NavLink>
                profile = <NavLink to="/profile" onClick={() => this.closeNavBar()}>Profile</NavLink>
                LoginLogout = <NavLink to="/logout" onClick={() => this.closeNavBar()}>Logout</NavLink>
                break;
            case AvailableRoles.GUEST:
                register = <NavLink to="/register" onClick={() => this.closeNavBar()}>Register</NavLink>
                LoginLogout = <NavLink to="/login" onClick={() => this.closeNavBar()}>Login</NavLink>
                questionnaire = <NavLink to="/questionnaire" onClick={() => this.closeNavBar()}>Questionnaire</NavLink>
                results = <NavLink to="/view" onClick={() => this.closeNavBar()}>Results</NavLink>
                break;
        }

        //initial navbar and icon state
        let navbar = <>
            <NavLink to="/home"><img className="navImage" src={icon} alt="logo"/></NavLink>
            <img className="hamburger" src={expand} alt="logo" onClick={() => this.toggleNavBarOpen()}/>
            <nav className={this.state.isNavBarOpen ? "appBar" : "appBar appBarClosed"}>
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <NavLink to="/home" onClick={() => this.closeNavBar()}>Home</NavLink>
                        {questionnaire}
                        {results}
                        {profile}
                        {docPage}
                        {admin}
                        {register}
                        {LoginLogout}
                    </ul>
                </div>
            </nav>
        </>;

        return (
            <div id="navBarDiv">
                {navbar}
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
                               element={<Home setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/register" element={<Register setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/login" element={<Login setBackgroundImage={setBackgroundImage}/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                        <Route path="/questionnaire" element={<QuestionList currentUser={currentUser}
                                                                            setBackgroundImage={setBackgroundImage}/>}></Route>
                        <Route path="/admin" element={<NormalValueList
                                                                       setBackgroundImage={setBackgroundImage}></NormalValueList>}/>
                        <Route path="/view"
                               element={<LatestResult patientId={patientId} setBackgroundImage={setBackgroundImage}/>}/>
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