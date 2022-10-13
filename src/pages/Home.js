import {Link, useNavigate} from "react-router-dom";
import home1 from '../images/home1.jpg'
import styled from "styled-components";


export default function Home({currentUser}) {
    const navigate = useNavigate();

    return (
        <div>
            {!currentUser ? (
                <>
                    <Container>
                        <div className="mainDiv">
                            <h1 className="titleHomePage1">Welcome to the health prevention system</h1>
                            <h3 className="titleHomePage3">Your online personal assistant</h3>
                            <p style={{float: "left", paddingLeft: "50px", paddingBottom: "50px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error.</p>

                        </div>

                        <div className="imageDiv">
                            <img src={home1} className="img1" style={{width: "100%"}}/>
                        </div>
                        <Link to="/survey" className="linkSurvey">Take a survey</Link>
                    </Container>
                </>
            ) : (
                <>
                    <p>Welcome back {currentUser.email}</p>
                    <br/>
                    <Link to="/logout" className="App-link">
                        Logout
                    </Link>
                </>
            )}
        </div>

    );
}

const Container = styled.div`
  padding: 0;
  margin: 0;

  .mainDiv {
    margin-top: 100px;
    float: left;
    width: 50%;
    border-radius: 20%;
  }

  .imageDiv {
    margin-top: 100px;
    float: right;
    width: 50%;
  }

  .titleHomePage1 {
    color: #1167b1;
  }

  .titleHomePage3 {
    color: #8DC6FF;
  }

  .img {
    //float: right;
    //margin-right: 100px;
  }

  .linkSurvey {
    background: #1167b1;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 8px;
  }

  .linkSurvey:hover {
    background: #8DC6FF;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 8px;
  }

`;
