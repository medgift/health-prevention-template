import React, {Component} from "react";
import Avatar from "../components/AvatarCustom";
import Navbar from "../components/Navbar";
import {auth} from "../initFirebase";
import Page404 from "./Page404";


class Customization extends Component {

    render() {
        return (
            <>
                {!auth.currentUser ? (
                    <>
                        <Page404/>
                    </>
                ) : (
                    <>
                        <Navbar/>
                        <div className="box">
                            <div className="wrapper">
                                <h1>Customize your avatar</h1>
                                <Avatar/>
                            </div>
                        </div>
                    </>
                )}
            </>
        )
    }
}

export default Customization