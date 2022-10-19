import NiceAvatar, {genConfig} from "react-nice-avatar";
import React from "react";

export default class EditAvatar extends React.Component {
    constructor(props) {
        super(props);

        //AFTER : Implement after from DB when connected user
        //Temporary default config
        const defaultConfig = {
            "sex": "man",
            "faceColor": "#8d5524",
            "earSize": "small",
            "eyeStyle": "circle",
            "noseStyle": "short",
            "mouthStyle": "laugh",
            "shirtStyle": "hoody",
            "glassesStyle": "none",
            "hairColor": "#000000",
            "hairStyle": "normal",
            "hatStyle": "none",
            "hatColor": "#F48150",
            "eyeBrowStyle": "up",
            "shirtColor": "#000000",
            "bgColor": "white",
        };
        const config = genConfig(defaultConfig);
        this.state = {
            myConfig: config
        };
    }

    //On Change Event for select-options
    change = () => {
        const config = {
            sex: document.getElementById("sex").value,
            faceColor: document.getElementById("faceColor").value,
            hairColor: document.getElementById("hairColor").value,
            hairStyle: document.getElementById("hairStyle").value,
            hatColor: document.getElementById("hatColor").value,
            hatStyle: document.getElementById("hatStyle").value,
            eyeStyle: document.getElementById("eyeStyle").value,
            eyeBrowStyle: document.getElementById("eyeBrowStyle").value,
            glassesStyle: document.getElementById("glassesStyle").value,
            noseStyle: document.getElementById("noseStyle").value,
            mouthStyle: document.getElementById("mouthStyle").value,
            shirtColor: document.getElementById("shirtColor").value,
            shirtStyle: document.getElementById("shirtStyle").value,
            bgColor: "white",

        }
        const myConfig = genConfig(config);
        this.setState({myConfig: myConfig});


    }


    render() {

        return (
            <div className="padded_div avatar">
                <h1>Edit your Avatar</h1>
                <NiceAvatar shape={"rounded"} style={{width: '10rem', height: '10rem'}} {...this.state.myConfig} />
                <br/>
                <div className={"grid"}>
                    <label>Sex: </label>
                    <select className={"select"} name="sex" id="sex" onChange={this.change}>
                        <option value={"man"}>Man</option>
                        <option value={"woman"}>Woman</option>
                    </select>
                    <label style={{}}>Face Color:</label>
                    <select className={"select"} name="faceColor" id="faceColor" onChange={this.change}>
                        <option value={"#8d5524"}>Color 1</option>
                        <option value={"#c68642"}>Color 2</option>
                        <option value={"#e0ac69"}>Color 3</option>
                        <option value={"#f1c27d"}>Color 4</option>
                        <option value={"#ffdbac"}>Color 5</option>
                    </select>
                    <label>Ear size: </label>
                    <select className={"select"} name="earSize" id="earSize" onChange={this.change}>
                        <option value={"small"}>Small</option>
                        <option value={"big"}>Big</option>
                    </select>
                    <label>Hair color: </label>
                    <select className={"select"} name="hairColor" id="hairColor" onChange={this.change}>
                        <option value={"#000000"}>Black</option>
                        <option value={"#4a4a4a"}>Grey</option>
                        <option value={"#ffffff"}>White</option>
                        <option value={"#B05923"}>Titan</option>
                        <option value={"#C89D7C"}>Brown</option>
                        <option value={"#FDCFA1"}>Blonde</option>
                    </select>
                    <label>Hair style: </label>
                    <select className={"select"} name="hairStyle" id="hairStyle" onChange={this.change}>
                        <option value={"normal"}>Normal</option>
                        <option value={"thick"}>Thick</option>
                        <option value={"mohawk"}>Mohawk</option>
                        <option value={"womanLong"}>Long (Woman)</option>
                        <option value={"womanShort"}>Short (Woman)</option>
                    </select>
                    <label>Hat style: </label>
                    <select className={"select"} name="hatStyle" id="hatStyle" onChange={this.change}>
                        <option value={"none"}>None</option>
                        <option value={"beanie"}>Beanie</option>
                        <option value={"turban"}>Turban</option>
                    </select>
                    <label>Hat color: </label>
                    <select className={"select"} name="hatColor" id="hatColor" onChange={this.change}>
                        <option value={"#000000"}>Black</option>
                        <option value={"#4a4a4a"}>Grey</option>
                        <option value={"#ffffff"}>White</option>
                        <option value={"#CC0000"}>Red</option>
                        <option value={"#FF6600"}>Orange</option>
                        <option value={"#FFCC00"}>Yellow</option>
                        <option value={"#009900"}>Green</option>
                        <option value={"#0066CC"}>Blue</option>
                        <option value={"#9933CC"}>Purple</option>
                        <option value={"#FF99CC"}>Pink</option>
                    </select>
                    <label>Eye style: </label>
                    <select className={"select"} name="eyeStyle" id="eyeStyle" onChange={this.change}>
                        <option value={"circle"}>Circle</option>
                        <option value={"oval"}>Oval</option>
                        <option value={"smile"}>Smile</option>
                    </select>
                    <label>Eye brow style: </label>
                    <select className={"select"} name="eyeBrowStyle" id="eyeBrowStyle" onChange={this.change}>
                        <option value={"up"}>Up</option>
                        <option value={"upWoman"}>Up (Woman)</option>
                    </select>
                    <label>Glasses style: </label>
                    <select className={"select"} name="glassesStyle" id="glassesStyle" onChange={this.change}>
                        <option value={"none"}>None</option>
                        <option value={"round"}>Round</option>
                        <option value={"square"}>Square</option>
                    </select>
                    <label>Nose style: </label>
                    <select className={"select"} name="noseStyle" id="noseStyle" onChange={this.change}>
                        <option value={"short"}>Short</option>
                        <option value={"long"}>Long</option>
                        <option value={"round"}>Round</option>
                    </select>
                    <label>Mouth style: </label>
                    <select className={"select"} name="mouthStyle" id="mouthStyle" onChange={this.change}>
                        <option value={"laugh"}>Laugh</option>
                        <option value={"smile"}>Smile</option>
                        <option value={"peace"}>Peace</option>
                    </select>
                    <label>Shirt color: </label>
                    <select className={"select"} name="shirtColor" id="shirtColor" onChange={this.change}>
                        <option value={"#000000"}>Black</option>
                        <option value={"#4a4a4a"}>Grey</option>
                        <option value={"#ffffff"}>White</option>
                        <option value={"#CC0000"}>Red</option>
                        <option value={"#FF6600"}>Orange</option>
                        <option value={"#FFCC00"}>Yellow</option>
                        <option value={"#009900"}>Green</option>
                        <option value={"#0066CC"}>Blue</option>
                        <option value={"#9933CC"}>Purple</option>
                        <option value={"#FF99CC"}>Pink</option>
                    </select>
                    <label>Shirt style: </label>
                    <select className={"select"} name="shirtStyle" id="shirtStyle" onChange={this.change}>
                        <option value={"hoody"}>Hoody</option>
                        <option value={"short"}>Short</option>
                        <option value={"polo"}>Polo</option>
                    </select>
                </div>
                <button className={"formButton"}  onClick={this.save}>Save</button>
            </div>
        )
    };


}