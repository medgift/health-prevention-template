import React, {useEffect, useState} from "react";

function Habits({nextStep, values, setValues}) {

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
            console.log("test")
            nextStep();
        }
    }, [errors])

    const validate = (values) => {
        const errors = {};
        if (!values.fume || !values.alim || !values.sport || !values.alcool) {
            errors.error = "All fields with * are required!";
        }
        return errors;
    }

    return (
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="family">
                    <p className="error"> {errors.error}</p>
                    fume
                    <input
                        class="slider"
                        id="typeinp"
                        type="range"
                        name="fume"
                        min="0" max="1"
                        value={values.fume}
                        onChange={handleChange}
                        step="1"/>
                    {values.fume}
                    <br/>
                    Feed
                    <input
                        class="slider"
                        id="typeinp"
                        type="range"
                        name="alim"
                        min="0" max="3"
                        value={values.alim}
                        onChange={handleChange}
                        step="1"/>
                    {values.alim}
                    <br/>
                    sport
                    <input
                        id="typeinp"
                        type="range"
                        name="sport"
                        min="0" max="3"
                        value={values.sport}
                        onChange={handleChange}
                        step="1"/>
                    {values.sport}
                    <br/>
                    alcool
                    <input
                        id="typeinp"
                        type="range"
                        name="alcool"
                        min="0" max="4"
                        value={values.alcool}
                        onChange={handleChange}
                        step="1"/>
                    {values.alcool}
                    <footer>
                        <button type="submit">
                            Submit
                        </button>
                    </footer>
                </div>
            </form>
        </>
    )

}

export default Habits