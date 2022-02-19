import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormGroup, Switch } from '../packages/core/src';
import { FormValues } from './FormValues';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  lastName: boolean;
  firstName: boolean;
}

export const SwitchPage = () => {
  return (
    <article>
      <Formik
        initialValues={{
          firstName: true,
          lastName: true,
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
              <Switch name={'firstName'} />
            </FormGroup>

            <FormGroup name={'lastName'} label={'Last name'}>
              <Switch name={'lastName'} />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
};
