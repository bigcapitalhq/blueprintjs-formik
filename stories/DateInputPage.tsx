import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { FormValues } from './FormValues';
import { FormGroup } from '../packages/core/src';
import { DateInput } from '../packages/datetime/src';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  longText: string;
}

export function DateInputPage() {
  return (
    <article>
      <Formik
        initialValues={{
          // longText: '4/26/2022',
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
              <DateInput
                name={'longText'}
                parseDate={(str) => new Date(str)}
                placeholder={'M/D/YYYY'}
                formatDate={(date) => date.toLocaleString()}
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
