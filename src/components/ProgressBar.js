import React from "react";

const ProgressBar = (props) => {
    const { /*bgcolor,*/ now } = props;

    const containerStyles = {
        height: 20,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50,
    }

    const fillerStyles = {
        height: '100%',
        width: `${now}%`,
        backgroundColor: /*bgcolor*/"#09bbd9",
        borderRadius: 'inherit',
        transition: 'width 1s ease-in-out'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
            </div>
        </div>
    );
};

export default ProgressBar;