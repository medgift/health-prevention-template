import NiceAvatar, {genConfig} from "react-nice-avatar";
import React, {useContext, useEffect} from "react";
import "../css/Avatar.css";
import {PatientDB} from "../DAL/PatientDB";
import {AvailableRoles, RoleContext} from "../Context/UserRoles";
import {useNavigate} from "react-router-dom";

/**
 * Function that returns the EditAvatar page if user is a patient (and indirectly if he is logged in), else redirect to home page
 * @param patientId
 * @returns {JSX.Element}
 * @constructor
 */
export default function AvatarPage({currentUser}) {
    const userRoleContext = useContext(RoleContext);
    const navigate = useNavigate();

    useEffect(() => {
        //Check if the user is a patient (and indirectly logged in)
        if (userRoleContext.role !== AvailableRoles.PATIENT)
            navigate("/");


    }, []);
    return <>
        <EditAvatar currentUser={currentUser}/>
    </>
}

export class EditAvatar extends React.Component {
    constructor(props) {
        super(props);

        //Default config for avatar
        const defaultConfig = {
            "sex": "man",
            "faceColor": "#f5d6a1",
            "earSize": "small",
            "eyeStyle": "circle",
            "noseStyle": "short",
            "mouthStyle": "laugh",
            "shirtStyle": "hoody",
            "glassesStyle": "none",
            "hairColor": "#000000",
            "hairStyle": "normal",
            "hatStyle": "none",
            "hatColor": "#000000",
            "eyeBrowStyle": "up",
            "shirtColor": "#000000",
            "bgColor": "white",
        };
        this.state = {
            myConfig: defaultConfig,
        };
    }

    componentDidMount() {
        this.getPatient();
    }

    /**
     * Function that gets the patient from the DB and updates the avatar config
     * @returns {Promise<void>}
     */
    async getPatient() {
        if (this.props.currentUser) {
            const pat = await PatientDB.prototype.getPatientById(this.props.currentUser.uid);
            if (pat.avatarConfig == null)
                return; //patient may not have an avatar yet
            const config = genConfig(pat.avatarConfig);
            this.setState({myConfig: config});
        }
    }

    /**
     * Update the avatar in state
     * @param e
     */
    change = (e) => {
        this.setState(s => ({myConfig: {...s.myConfig, [e.target.name]: e.target.value}}));
    }

    /**
     * Save the avatar config to the DB
     * @returns {Promise<void>}
     */
    save = async () => {
        if (!this.props.currentUser) {
            alert("Please login first");
        } else {
            await PatientDB.prototype.updateAvatar(this.props.currentUser.uid, this.state.myConfig)
            alert("Avatar saved!")
        }
    }

    render() {
        return (
            <div className="padded_div avatarDiv">
                <h1>Edit your Avatar</h1>
                <NiceAvatar id="avatar" shape={"rounded"}
                            style={{width: '10rem', height: '10rem'}} {...this.state.myConfig} />
                <br/>
                <div className={"grid"}>
                    <label>Sex: </label>
                    <select className={"select"} name="sex" id="sex" onChange={this.change}>
                        <option value={"man"}>Man</option>
                        <option value={"woman"}>Woman</option>
                    </select>
                    <label style={{}}>Face Color:</label>
                    <input type="color" id="faceColor" name="faceColor" value={this.state.myConfig.faceColor}
                           onChange={this.change}/>
                    <label>Ear size: </label>
                    <select className={"select"} name="earSize" id="earSize" onChange={this.change}
                            value={this.state.myConfig.earSize}>
                        <option value={"small"}>Small</option>
                        <option value={"big"}>Big</option>
                    </select>
                    <label>Hair color: </label>
                    <input type="color" id="hairColor" name="hairColor" value={this.state.myConfig.hairColor}
                           onChange={this.change}/>
                    <label>Hair style: </label>
                    <select className={"select"} name="hairStyle" id="hairStyle" onChange={this.change}
                            value={this.state.myConfig.hairStyle}>
                        <option value={"normal"}>Normal</option>
                        <option value={"thick"}>Thick</option>
                        <option value={"mohawk"}>Mohawk</option>
                        <option value={"womanLong"}>Long (Woman)</option>
                        <option value={"womanShort"}>Short (Woman)</option>
                    </select>
                    <label>Hat style: </label>
                    <select className={"select"} name="hatStyle" id="hatStyle" onChange={this.change}
                            value={this.state.myConfig.hatStyle}>
                        <option value={"none"}>None</option>
                        <option value={"beanie"}>Beanie</option>
                        <option value={"turban"}>Turban</option>
                    </select>
                    <label>Hat color: </label>
                    <input type="color" id="hatColor" name="hatColor" value={this.state.myConfig.hatColor}
                           onChange={this.change}/>
                    <label>Eye style: </label>
                    <select className={"select"} name="eyeStyle" id="eyeStyle" onChange={this.change}
                            value={this.state.myConfig.eyeStyle}>
                        <option value={"circle"}>Circle</option>
                        <option value={"oval"}>Oval</option>
                        <option value={"smile"}>Smile</option>
                    </select>
                    <label>Eye brow style: </label>
                    <select className={"select"} name="eyeBrowStyle" id="eyeBrowStyle" onChange={this.change}
                            value={this.state.myConfig.eyeBrowStyle}>
                        <option value={"up"}>Up</option>
                        <option value={"upWoman"}>Up (Woman)</option>
                    </select>
                    <label>Glasses style: </label>
                    <select className={"select"} name="glassesStyle" id="glassesStyle" onChange={this.change}
                            value={this.state.myConfig.glassesStyle}>
                        <option value={"none"}>None</option>
                        <option value={"round"}>Round</option>
                        <option value={"square"}>Square</option>
                    </select>
                    <label>Nose style: </label>
                    <select className={"select"} name="noseStyle" id="noseStyle" onChange={this.change}
                            value={this.state.myConfig.noseStyle}>
                        <option value={"short"}>Short</option>
                        <option value={"long"}>Long</option>
                        <option value={"round"}>Round</option>
                    </select>
                    <label>Mouth style: </label>
                    <select className={"select"} name="mouthStyle" id="mouthStyle" onChange={this.change}
                            value={this.state.myConfig.mouthStyle}>
                        <option value={"laugh"}>Laugh</option>
                        <option value={"smile"}>Smile</option>
                        <option value={"peace"}>Peace</option>
                    </select>
                    <label>Shirt color: </label>
                    <input type="color" id="shirtColor" name="shirtColor" value={this.state.myConfig.shirtColor}
                           onChange={this.change}/>
                    <label>Shirt style: </label>
                    <select className={"select"} name="shirtStyle" id="shirtStyle" onChange={this.change}
                            value={this.state.myConfig.shirtStyle}>
                        <option value={"hoody"}>Hoody</option>
                        <option value={"short"}>Short</option>
                        <option value={"polo"}>Polo</option>
                    </select>
                </div>
                <div id="avatarButtonDiv">
                    <button className={"formButton bigButton animatedButton centeredButton"} onClick={this.save}>Save
                    </button>
                </div>
            </div>
        )
    };
}

