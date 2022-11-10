import {useEffect} from "react";


export default function PageNotFound({setBackgroundImage}) {

    useEffect(() => {
        setBackgroundImage(null);
    }, []);

    return (
        <div className={"ignore-css"}>
            <center>
                <img src={"404_image.png"}
                     style={{width: "30%"}}
                     alt={"404"}/>
                <h3>Sadly, the page your trying to reach does not exist...</h3>
                <p style={{fontSize: "20px"}}>PS: There is nothing at the bottom of the page...</p>
                <div style={{marginTop: "1000px"}}/>
                <img src={"https://media.tenor.com/9ud1r4sc-QQAAAAM/confused-john-travolta.gif"}
                     style={{width: "40%"}} alt={"John Travolta"}/>
                <h4>Where did the content go ?! -Lost Travolta, 2022</h4>
            </center>
        </div>
    )  ;
}