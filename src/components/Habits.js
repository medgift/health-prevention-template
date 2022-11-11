import React, {useEffect, useState} from "react";


export const switchAlim = (param) => {
    switch (param) {
        case '0':
            return 'Most of the time';
        case '1':
            return 'Often';
        case '2':
            return 'Not often';
        case '3':
            return 'Never';
    }
}

export const switchSport = (param) => {
    switch (param) {
        case '0':
            return '>2 hours of intense sport per week';
        case '1':
            return '30min of sport 5 days a week';
        case '2':
            return '30min of sport 2-3 days a week';
        case '3':
            return 'not often';
    }
}

export const switchAlcool = (param) => {
    switch (param) {
        case '0':
            return "I don't drink";
        case '1':
            return 'Less than a day a week';
        case '2':
            return '1 to 2 times a week';
        case '3':
            return '3 to 6 times a week';
        case '4':
            return 'Every day';
    }
}

function Habits({prevStep, nextStep, values, setValues}) {

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
            //console.log("test")
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
            <form className="form-container-habits" onSubmit={handleSubmit}>
                <p className="error"> {errors.error}</p>
                <div className="radio-tile-group">
                    <span className="question">Did you ever smoke regularly at a point in your life?*</span>
                    <div className="input-wrapper">
                        <div className="input-container">
                            <input type="radio"
                                   id="yes"
                                   className="radio-button"
                                   name="fume"
                                   value="1"
                                   checked={values.fume === "1"}
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
                                   name="fume"
                                   value="0"
                                   checked={values.fume === "0"}
                                   onChange={handleChange}
                            />
                            <div className="radio-tile">
                                <label htmlFor="no" className="radio-tile-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-wrapper">
                    <span className="question">How often do you eat fruits, vegetables, olive oil, nuts, fatty fishes and little meat, cream and cold cuts?*</span>
                    <div className="slider-values">
                        {switchAlim(values.alim)}
                    </div>
                    <input
                        class="slider"
                        id="typeinp"
                        type="range"
                        name="alim"
                        min="0" max="3"
                        value={values.alim}
                        onChange={handleChange}
                        step="1"/>
                </div>
                <div className="slider-wrapper">
                    <span className="question">How often do you do physical activities per week?</span>
                    <div className="slider-values">
                        {switchSport(values.sport)}
                    </div>
                    <input
                        class="slider"
                        id="typeinp"
                        type="range"
                        name="sport"
                        min="0" max="3"
                        value={values.sport}
                        onChange={handleChange}
                        step="1"/>
                </div>
                <div className="slider-wrapper">
                    <span className="question">How often do you consume alcohol per week?</span>
                    <div className="slider-values">
                        {switchAlcool(values.alcool)}
                    </div>
                    <input
                        class="slider"
                        id="typeinp"
                        type="range"
                        name="alcool"
                        min="0" max="4"
                        value={values.alcool}
                        onChange={handleChange}
                        step="1"/>
                </div>
                <footer>
                    <button onClick={prevStep}>
                        Prev
                    </button>
                    <button onSubmit={handleSubmit}>
                        Submit
                    </button>
                </footer>
            </form>
        </>
    )
}

export default Habits