import React from "react";

function Habits({ values, setValues }) {

    let handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value })
    }

    return (
        <>
            fume
            <input
                id="typeinp"
                type="range"
                name="fume"
                min="0" max="1"
                value={  values.fume }
                onChange={ handleChange }
                step="1" />
            { values.fume }
            <br/>
            Feed
            <input
                id="typeinp"
                type="range"
                name="alim"
                min="0" max="3"
                value={  values.alim }
                onChange={ handleChange }
                step="1" />
            { values.alim }
            <br/>
            sport
            <input
                id="typeinp"
                type="range"
                name="sport"
                min="0" max="3"
                value={  values.sport }
                onChange={ handleChange }
                step="1" />
            { values.sport }
            <br/>
            alcool
            <input
                id="typeinp"
                type="range"
                name="alcool"
                min="0" max="4"
                value={  values.alcool }
                onChange={ handleChange }
                step="1" />
            { values.alcool }
        </>
    )

}

export default Habits