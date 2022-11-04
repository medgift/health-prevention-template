import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Customization from "./pages/Customization";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import { createContext, useEffect, useState } from "react";
import Logout from "./pages/Logout";
import Info from "./pages/Info";
import ShowResult from "./pages/ShowResult";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";
import Page404 from "./pages/Page404";
import Questionnary from "./pages/Questionnary";
import ResultPage from "./pages/ResultPage";
//import Profile_nb from "./pages/Profile_nb";

export default function App() {
  /* Current user state */
  const [currentUser, setCurrentUser] = useState(undefined);

  

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
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/info" element={<Info />} />
          <Route path="/customization" element={<Customization/>}/>
          <Route path="/ShowResult" element={<ShowResult/>}/>
          <Route path="/AdminPage" element={<AdminPage/>}/>
          <Route path="/questionnary" element={<Questionnary/>}/>
          <Route path="/ResultPage" element={<ResultPage/>}/>
          {/* <Route path="/profile" element={<Profile_nb/>}/> */}
          <Route path="/UserProfilePage" element={<UserProfilePage/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
    </div>
  );
}

export const Context = createContext({
  role : null,
  setRole: () => {},
})
