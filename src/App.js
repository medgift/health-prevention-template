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
import Results from "./pages/Results";


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
          <Route path="/results" element={<Results infos={{ sex: 0, age: 40, weight: 80, height: 180, systolic: true, chol: 3.5, glyc: 3.5, hdl: 1.9, diabete: false, infarctus: true, afInfarctus: true, afCancer: true, smoke: 1, alim: 3, alcohol: 2, physical: 3}}/>}/>
        </Routes>
      {/*</header>*/}
    </div>
  );
}
