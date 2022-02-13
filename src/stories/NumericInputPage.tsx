import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormValues } from './FormValues';

import { FormGroup, NumericInput } from '../core';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  number: number;
}

export const NumericInputPage = () => {
  return (
    <article>
      <Formik
        initialValues={{
          number: 10000,
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        {({ values }) => (
          <Form>
            <FormGroup name={'number'} label={'Number'}>
              <NumericInput name={'number'} />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
};
