import {useNavigate} from "react-router-dom";
import image1 from '../images/questionnaire.jpg'

export default function Survey() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Take a survey and test your health!</h1>
            <img src={image1} style={{width:"40%"}}/>
        </div>
    );
}