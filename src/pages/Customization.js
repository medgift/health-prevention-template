import React, {Component} from "react";
import Avatar from "../components/AvatarCustom";
import Navbar from "../components/Navbar";


class Customization extends Component {

    render() {
        return (
            <>
                <Navbar/>
                <h1>Customize your avatar</h1>
                <Avatar/>
            </>
        )
    }
}
export default Customization