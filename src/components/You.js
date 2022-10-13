import React from "react";

function You({ values, setValues }){

    let handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({ ...values, [name]: value })
    }

    return (
        <>
            <div>
                <label htmlFor="man" className="radio-custom-label">Man</label>
                <input type="radio"
                    id="man"
                    className="radio-custom"
                    name="sexe"
                    value="1"
                    checked={ values.sexe === "1" }
                    onChange={ handleChange }
                />
            </div>
            <div>
                <label htmlFor="woman" className="radio-custom-label">Woman</label>
                <input type="radio"
                    id="woman"
                    className="radio-custom"
                    name="sexe"
                    value = "0"
                    checked={ values.sexe === "0" }
                    onChange={ handleChange }
                />
            </div>
            <label htmlFor="age">Age (15-100):</label>
            <input type = "number"
                   id = "age"
                   name = "age"
                   min = "15" max="100"
                   value = { values.age }
                   onChange = { handleChange }
            /><br/>
            <label htmlFor="poids">weight (15-100):</label>
            <input type = "number"
                   id = "poids"
                   name = "poids"
                   min = "15" max="100"
                   value = { values.poids }
                   onChange = { handleChange }
            /><br/>
            <label htmlFor="taille">height (15-100):</label>
            <input type = "number"
                   id = "taille"
                   name = "taille"
                   min = "15" max="100"
                   value = { values.taille }
                   onChange = { handleChange }
            /><br/>
            syst
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="syst"
                       value="1"
                       checked={ values.syst === "1" }
                       onChange = { handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="syst"
                       value = "0"
                       checked={ values.syst === "0" }
                       onChange = { handleChange }
                />
            </div>
            glyc
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="glyc"
                       value="1"
                       checked={ values.glyc === "1" }
                       onChange = { handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="glyc"
                       value = "0"
                       checked={ values.glyc === "0" }
                       onChange = { handleChange }
                />
            </div>
            chol
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="chol"
                       value="1"
                       checked={ values.chol === "1" }
                       onChange = { handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="chol"
                       value = "0"
                       checked={ values.chol === "0"}
                       onChange = { handleChange }
                />
            </div>
            diab
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="diab"
                       value="1"
                       checked={ values.diab === "1" }
                       onChange = { handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="diab"
                       value = "0"
                       checked={ values.diab === "0" }
                       onChange = { handleChange }
                />
            </div>
            inf
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="inf"
                       value="1"
                       checked={ values.inf === "1" }
                       onChange = { handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="inf"
                       value = "0"
                       checked={ values.inf === "0" }
                       onChange = { handleChange }
                />
            </div>
            avc
            <div>
                <label htmlFor="yes" className="radio-custom-label">Yes</label>
                <input type="radio"
                       id="yes"
                       className="radio-custom"
                       name="avc"
                       value="1"
                       checked={ values.avc === "1" }
                       onChange = { handleChange }
                />
            </div>
            <div>
                <label htmlFor="no" className="radio-custom-label">No</label>
                <input type="radio"
                       id="no"
                       className="radio-custom"
                       name="avc"
                       value = "0"
                       checked={ values.avc === "0" }
                       onChange = { handleChange }
                />
            </div>
        </>
    )

}

export default You;
