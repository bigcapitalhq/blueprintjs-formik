import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormGroup, HTMLSelect } from '../packages/core/src';
import { FormValues } from './FormValues';

const FormValidation = Yup.object().shape({
  value: Yup.string().required('Required'),
});

interface Values {
  value: string;
  anotherValue: string;
}

export const HTMLSelectPage = () => {
  return (
    <article>
      <Formik
        initialValues={{
          value: 'mohamed',
          anotherValue: 'jesus',
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        {({ values }) => (
          <Form>
            <FormGroup name={'value'} label={'Long text'}>
              <HTMLSelect name={'value'} options={['mohamed', 'jesus']} />
            </FormGroup>

            <FormGroup
              name={'anotherValue'}
              label={'Another value/label options'}
            >
              <HTMLSelect
                name={'anotherValue'}
                options={[
                  {
                    value: 'mohamed',
                    label: 'Mohamed',
                  },
                  {
                    value: 'jesus',
                    label: 'Jesus',
                  },
                ]}
              />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
};
