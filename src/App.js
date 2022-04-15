// import logo from './logo.svg';
import "./App.css";
import { Form, Field, FormSpy } from "react-final-form";
import { useState } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const showResults = async (values) => {
  await sleep(500);
  window.alert(JSON.stringify(values, undefined, 2));
  console.log(values);
};

const required = (value) => (value ? undefined : "Required");
const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);
const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

function App() {
  return (
    <>
      <h1 className="App">Checkout Page</h1>
      <Form
        onSubmit={showResults}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div>
              {/* <label>First Name</label> */}
              <Field
                name="firstName"
                component="input"
                placeholder="First Name"
                validate={required}
                subscription={{
                  value: true,
                  active: true,
                  error: true,
                  touched: true,
                }}
              >
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>First Name</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}

                {/* --------fieldState----------- */}

                {/* {fieldState => (
             <pre className="App-header">{JSON.stringify(fieldState, undefined,2)}</pre>
                )} */}
              </Field>
            </div>

            <div>
              <Field
                name="lastName"
                component="input"
                placeholder="Last Name"
                validate={composeValidators(
                  required,
                  mustBeNumber,
                  minValue(18)
                )}
                subscription={{
                  value: true,
                  active: true,
                  error: true,
                  touched: true,
                }}
              >
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>Last Name</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div>
              <label>Employee</label>{}
              <Field name="Employee Check" component="input" type="checkbox" />
            </div>

            <div>
              <Field
                name="paymentMethod"
                component="select"
                initialValue={"Cash on Delivery"}
                validate={required}
              >
                {({ input, meta, placeholder }) => (
                  <>
                    <label for="cars">Choose a Payment Method:</label>
                    <select {...input}>
                      <option value="UPI">UPI</option>
                      <option value="NetBanking">Net Banking</option>
                      <option value="CardPayment">Credit/Debit Card</option>
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span>Default COD</span>
                  </>
                )}
              </Field>
            </div>
            <div>
              <div>
                <label>Sex</label>
                <label>
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="Male"
                    initialValue={"Rahul"}
                  />
                  Male
                </label>
                <label>
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="Female"
                  />{" "}
                  Female
                </label>
                <label>
                  <Field
                    name="sex"
                    component="input"
                    type="radio"
                    value="Transgender"
                  />{" "}
                  Transgender
                </label>
              </div>
            </div>

            <div>
              <Field
                name="email"
                type = "email"
                component="input"
                placeholder="Email"
                validate={required}
                subscription={{
                  value: true,
                  active: true,
                  error: true,
                  touched: true,
                }}
              >
                {({ input, meta, placeholder }) => (
                  <div>
                    <label>Email</label>
                    <input {...input} placeholder={placeholder} />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <button type="submit" disabled={submitting}>
              Submit
            </button>

            {/* ------------Form Spy----- --------       */}

            <FormSpy subscription={{ values: true }}>
              {({ values }) => (
                <pre className="App-header">
                  {JSON.stringify(values, undefined, 2)}
                </pre>
              )}
            </FormSpy>
          </form>
        )}
      </Form>
    </>
  );
}

export default App;
