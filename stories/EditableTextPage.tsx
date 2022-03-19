import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormValues } from './FormValues';
import { FormGroup, EditableText } from '../packages/core/src';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  longText: string;
}

export const EditableTextPage = () => {
  return (
    <article>
      <Formik
        initialValues={{
          longText: '10000',
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        {({ values }) => (
          <Form>
            <FormGroup name={'longText'} label={'Number'}>
              <EditableText name={'longText'} />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
};
