import {Link} from "react-router-dom";
import "../css/Home.css";
import {useEffect} from "react";

export default function Home({currentUser, setBackgroundImage}) {

    useEffect(() => {
        setBackgroundImage(null);
    }, []);

    window.addEventListener("scroll", reveal)
    return (
        <div className="general">
            <h2 style={{textAlign: "left"}}>Welcome to the Health Prevention System</h2>
            <div className={"homeGrid"}>
                <div className={"homeGridItem"} style={{width: "auto", background: "white"}}>
                    <img src={"health-checkup.png"}
                         style={{width: "100%", borderRadius: "15px", boxShadow: "7px 7px #91d0f9"}}/>
                </div>
                <div className={"homeGridItem"} style={{width: "auto", background: "white", textAlign: "left"}}>
                    <p>Check your health using our tool !</p>
                    <p>Our tool will help you to check your health and give you advices to improve it.</p>
                    <p>It will also help you to find the right doctor for you.</p>
                </div>
            </div>

            <div style={{margin: "37px 0"}}/>
            <div className={"homeGrid"}>
                <div className={"homeGridItem"} style={{width: "auto", background: "white"}}>
                    <p style={{verticalAlign: "middle"}}>Want to try ?</p>
                </div>
                <div className={"homeGridItem reveal"} style={{width: "auto", background: "white", textAlign: "left"}}>
                    <Link className={"homeGridButton"} to="/questionnaire">Respond to the questionnaire anonymously</Link>
                    <br className={"breakButton"}/>
                    <Link className={"homeGridButton"} to="/login">Connect</Link>
                    <br className={"breakButton"}/>
                    <Link className={"homeGridButton"} to="/register">Create an account</Link>
                </div>
            </div>
            <div style={{margin: "37px 0"}}/>
            <h3 className={"reveal"} style={{textAlign: "left", fontFamily: "fantasy", fontStyle: "italic"}}>Recommended
                by 9/10 doctors </h3>
            <div style={{margin: "200px 0"}}/>
        </div>

    );

    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            let windowheight = window.innerHeight;
            let revealtop = reveals[i].getBoundingClientRect().top;
            let revealpoint = 150;
            if (revealtop < windowheight - revealpoint) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }
}


