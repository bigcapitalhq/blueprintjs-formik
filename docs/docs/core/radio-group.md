---
sidebar_position: 4
---

# Radio Group


## Example

````
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Radio } from '@blueprintjs/core';
import {
  FormGroup,
  RadioGroup,
} from '../packages/core/src';

interface Values {
  choice: string;
}

export const RadioGroupPage = () => {
  return (

      <Formik
        initialValues={{
          number: 10000,
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >

        <Form>
        <FormGroup name={'choice'} label={'Number'}>
            <RadioGroup name={'choice'}>
            <Radio label="Soup" value="one" />
            <Radio label="Salad" value="two" />
            <Radio label="Sandwich" value="three" />
            </RadioGroup>
        </FormGroup>

        <button type="submit">Submit</button>
        </Form>

      </Formik>

  );
};
```;
````
