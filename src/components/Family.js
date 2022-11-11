import React, {useEffect, useState} from "react";

function Family({nextStep, prevStep, values, setValues}) {

    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    let handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({...values, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            nextStep();
        }
    }, [errors])

    const validate = (values) => {
        const errors = {};
        if (!values.afinf || !values.afcancer) {
            errors.error = "All fields with * are required!";
        }
        return errors;
    }

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="family">
                    <p className="error"> {errors.error}</p>
                    <div className="radio-tile-group">
                        <span
                            className="question">A parent (father before 55, mother before 65) with heart attack?*</span>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <input type="radio"
                                       id="yes"
                                       className="radio-button"
                                       name="afinf"
                                       value="1"
                                       checked={values.afinf === "1"}
                                       onChange={handleChange}
                                />
                                <div className="radio-tile">
                                    <label htmlFor="yes" className="radio-tile-label">Yes</label>
                                </div>
                            </div>

                            <div className="input-container">
                                <input type="radio"
                                       id="no"
                                       className="radio-button"
                                       name="afinf"
                                       value="0"
                                       checked={values.afinf === "0"}
                                       onChange={handleChange}
                                />
                                <div className="radio-tile">
                                    <label htmlFor="no" className="radio-tile-label">No</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="radio-tile-group">
                        <span
                            className="question">A close relative (father, mother, brothers or sisters) with cancer?*</span>
                        <div className="input-wrapper">
                            <div className="input-container">
                                <input type="radio"
                                       id="yes"
                                       className="radio-button"
                                       name="afcancer"
                                       value="1"
                                       checked={values.afcancer === "1"}
                                       onChange={handleChange}
                                />
                                <div className="radio-tile">
                                    <label htmlFor="yes" className="radio-tile-label">Yes</label>
                                </div>
                            </div>

                            <div className="input-container">
                                <input type="radio"
                                       id="no"
                                       className="radio-button"
                                       name="afcancer"
                                       value="0"
                                       checked={values.afcancer === "0"}
                                       onChange={handleChange}
                                />
                                <div className="radio-tile">
                                    <label htmlFor="no" className="radio-tile-label">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer>
                        <button onClick={prevStep}>
                            Prev
                        </button>
                        <button onSubmit={handleSubmit}>
                            Next
                        </button>
                    </footer>
                </div>
            </form>
        </>
    )
}

export default Family