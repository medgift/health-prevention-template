import React from "react";

const ProgressBar = (props) => {
    const { bgcolor, now } = props;

    const containerStyles = {
        height: "3%",
        width: '90%',
        backgroundColor: "#e0e0de",
        borderRadius: 5,
        margin: "3%",
    }

    const fillerStyles = {
        height: '100%',
        width: `${now}%`,
        backgroundColor: `${bgcolor}`,
        borderRadius: 'inherit',
        transition: 'width 1s ease-in-out'
    }

    return (
        <div className={"progress"} style={containerStyles}>
            <div style={fillerStyles}/>
        </div>
    );
};

export default ProgressBar;