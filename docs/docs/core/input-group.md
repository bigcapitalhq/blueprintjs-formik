---
sidebar_position: 5
---

# Input Group

Blueprint [InputGroup](https://blueprintjs.com/docs/#core/components/text-inputs) component controlled and binded to Formik Field component. Holds the same original component properties with extra following properties.

`interface InputGroupProps extends Omit<FieldConfig, 'children'>, Omit<PBInputGroupProps2, 'value' | 'name'> {}`

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
import * as Yup from 'yup';
import { FormGroup, InputGroup } from '../packages/core/src';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  firstName: string;
  lastName: string;
}

export const Page = () => {
  return (
    <article>
      <Formik
        initialValues={{
          firstName: 'Ahmed',
          lastName: 'Bouhuolia
        }}
        validationSchema={FormValidation}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {}}
      >
        <Form>
          <FormGroup name={'firstName'} label={'First name'}>
            <InputGroup name={'firstName'} />
          </FormGroup>

          <FormGroup name={'lastName'} label={'Last name'}>
            <InputGroup name={'lastName'} />
          </FormGroup>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </article>
  );
};
```
