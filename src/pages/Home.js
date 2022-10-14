import {Link, useNavigate} from "react-router-dom";
import home1 from '../images/home1.jpg'
import styled from "styled-components";


export default function Home({currentUser}) {
    const navigate = useNavigate();

    return (
        <div>
            {!currentUser ? (
                <></>
            ) : (
                <>
                    <h3>Welcome back {currentUser.email}</h3>
                    <Link to="/logout" className="App-link">
                        Logout
                    </Link>
                    <br/>
                </>
            )}
            <>
                <div className="mainDivHomePage">
                    <h1 className="titleHomePage1">Welcome to the health prevention system</h1>
                    <h3 className="titleHomePage3">Your online personal assistant</h3>
                    <p style={{float: "left", paddingLeft: "50px", paddingBottom: "50px"}}>Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                        tenetur error.</p>

                </div>

                <div className="imageDivHomePage">
                    <img src={home1} className="img1" style={{width: "90%"}}/>
                </div>
                <Link to="/survey" className="linkSurvey">Take a survey</Link>
            </>
        </div>

    );
}