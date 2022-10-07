import React from 'react';

export default class Users extends React.Component{
    constructor(){
        super();
    }

    render() {
        return (
            <>
                <h1>{this.props.firstname}</h1>
                <h1>{this.props.lastname}</h1>
                <h1>{this.props.mail}</h1>
                <h1>{this.props.password}</h1>
                <h1>{this.props.role}</h1>
            </>
        )
    }
}