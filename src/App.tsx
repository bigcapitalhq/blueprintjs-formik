import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { InputGroup } from './InputGroup';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        <Form>
          <InputGroup id={'email'} name={'email'} type="email" />
        </Form>
      </Formik>
    </div>
  );
}

export default App;
