---
sidebar_position: 4
---

# Radio Group

`interface RadioGroupPropis extends BPRadioGroupProps, Omit<FieldConfig, 'component'>`

## Reference

### Props

#### name

`name: string`

_Required_

A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like `social.facebook`.

#### fastField

`fastField: boolean`

Switches to use `<FastField />` Formik component instead of the regular `Field` component, FastField is an optimized for performance to be used on large forms (~30+ fields) or when a field has very expensive reandering requirements. [Read more](https://formik.org/docs/api/fastfield) about FastField on Formik documentation.

---

## Example

The following example demonstrates how to use binded Radio Group component with Formik.

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
