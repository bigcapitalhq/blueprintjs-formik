import React from 'react';
import ReactDOM from 'react-dom';
import { Radio } from '@blueprintjs/core';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Formik, Form, FormikHelpers } from 'formik';
import { InputGroup } from './InputGroup';
import { FormGroup } from './FormGroup';

import * as Yup from 'yup';
import { Checkbox } from './Checkbox';
import { RadioGroup } from './RadioGroup';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        <Form>
          <FormGroup name={'email'} label={'EMail'}>
            {/* <InputGroup id={'email'} name={'email'} type="email" />
            <Checkbox id={'test'} name={'test'} /> */}

            {/* <Checkbox id={'switch'} name={'switch'} /> */}

            <RadioGroup id={'rad'} name={'rad'} label="Determine lunch">
              <Radio label="Soup" value="one" /> 
              <Radio label="Salad" value="two" />
              <Radio label="Sandwich" value="three" />
            </RadioGroup>
          </FormGroup>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
