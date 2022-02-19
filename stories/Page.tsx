import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormGroup, InputGroup } from '../packages/core/src';
import { FormValues } from './FormValues';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  name: string;
}

export const Page = () => {
  return (
    <article>
      <Formik
        initialValues={{
          name: '',
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        {({ values }) => (
          <Form>
            <FormGroup name={'firstName'} label={'First name'}>
              <InputGroup name={'firstName'} />
            </FormGroup>

            <FormGroup name={'lastName'} label={'Last name'}>
              <InputGroup name={'lastName'} />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
};
