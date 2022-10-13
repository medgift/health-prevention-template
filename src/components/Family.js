import React from "react";

function Family ({ values, setValues }) {

    let handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value })
    }

    return (
        <>
            family heart attack
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="afinf"
                       value="1"
                       checked={ values.afinf === "1" }
                       onChange={ handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="afinf"
                       value = "0"
                       checked={ values.afinf === "0" }
                       onChange={ handleChange }
                />
            </div>
            family cancer
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="afcancer"
                       value="1"
                       checked={ values.afcancer === "1" }
                       onChange={ handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="afcancer"
                       value = "0"
                       checked={ values.afcancer === "0" }
                       onChange={ handleChange }
                />
            </div>
        </>
    )

}

export default Family