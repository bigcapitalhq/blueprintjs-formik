---
sidebar_position: 2
---

# Numeric Input

Blueprint [Numeric Input](https://blueprintjs.com/docs/#core/components/numeric-input) component controlled and binded to Formik Field component. Holds the same original component properties with extra following properties.

`export interface NumericInputProps extends Omit<FieldConfig, 'children' | 'component'>, Omit<BPNumericInputProps, 'value'>`

## Reference

### Props

#### name

`name: string`

**_Required_**

A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like `social.facebook`.

---

## Example

```jsx
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { FormGroup, NumericInput } from '../packages/core/src';

interface Values {
  number: number;
}

export const NumericInputPage = () => {
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
        <FormGroup name={'number'} label={'Number'}>
          <NumericInput name={'number'} />
        </FormGroup>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
```
