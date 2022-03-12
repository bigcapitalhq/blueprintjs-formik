import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormGroup, TextArea } from '../packages/core/src';
import { FormValues } from './FormValues';

const FormValidation = Yup.object().shape({
  longText: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  longText: string;
}

export const TextAreaPage = () => {
  return (
    <article>
      <Formik
        initialValues={{
          longText: 'Description is here ...',
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        {({ values }) => (
          <Form>
            <FormGroup name={'longText'} label={'Long text'}>
              <TextArea name={'longText'} />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
};
