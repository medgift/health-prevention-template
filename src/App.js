import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeOLD from "./pages/HomeOLD";
import Home from "./pages/Home";
import Survey from "./pages/Survey";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import Logout from "./pages/Logout";

import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import { useEffect, useState } from "react";


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
      {/*<header className="App-header">*/}
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          {/*<Route path="/home" element={<Home />} />*/}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      {/*</header>*/}
    </div>
  );
}
