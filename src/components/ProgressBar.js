import React from "react";

/**
 * this class is used to create a custom bar for the Rhythm part in the result
 * @param props bgcolor and now corresponding to the color of the bar and the value inside it
 * @returns {JSX.Element} the built progress bar
 */
const ProgressBar = (props) => {
    const {bgcolor, now} = props;

    const containerStyles = {
        height: "3vh",
        width: '90%',
        backgroundColor: "#e0e0de",
        borderRadius: 5,
        marginLeft:"5%",
        marginRight:"5%",
        marginTop:"5%",
        marginBottom: "10%"
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