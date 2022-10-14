import "../App.css";
import React from "react";
import {  withFormik, Form, Field, Formik } from "formik";

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address entered";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password < 6) {
    errors.password = "Must contains at least 6 characters";
  }

  return errors;
};


export default function LoginForm({ handleSubmit }) {

  return (
    <Formik
    initialValues= { initialValues }
    validate= { validate }
    onSubmit = { (values, { resetForm, setErrors, setSubmitting }) => {
      try {
        console.log('Value : ', values);
         handleSubmit(values, values.email, values.password);
      } catch (e) {
        // setTimeout(() => {
        //   if (values.email === "arnaud@test.io") {
        //     setErrors({ email: "That email is already taken" });
        //   } else {
        //     resetForm();
        //   }
        //   setSubmitting(false);
        // }, 2000);
      }
    }}
    >
{(formik) => {
        const {
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isValid,
          dirty
        } = formik;
        return (
            
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Email"
                    className={errors.email && touched.email ? 
                    "email_input_error" : 'email_input'}
                  />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>

                <div className="form-row">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className={errors.password && touched.password ? 
                     "password_input_error" : 'password_input'}
                  />
                  {errors.password && touched.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className= "btn btn_submit"
                  disabled={!(isValid)}>
                 Login
                </button>
              </form>
        );
      }}
    </Formik>
  )
}
