import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormValues } from './FormValues';
import { FormGroup } from '../packages/core/src';
import { TimezoneSelect } from '../packages/datetime/src';

const FormValidation = Yup.object().shape({
  timezone: Yup.string()
    .required('Timezone is required'),
});

interface Values {
  timezone: string;
}

export function TimezoneSelectPage() {
  return (
    <article>
      <Formik
        initialValues={{
          timezone: 'America/New_York',
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          console.log('Form submitted with values:', values);
          setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form>
            <FormGroup name={'timezone'} label={'Timezone'}>
              <TimezoneSelect
                name={'timezone'}
                placeholder={'Select a timezone...'}
              />
            </FormGroup>

            <button type="submit">Submit</button>
            <FormValues values={values} />
          </Form>
        )}
      </Formik>
    </article>
  );
}
