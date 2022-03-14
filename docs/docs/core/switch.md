---
sidebar_position: 6
---

# Switch

Blueprint [Switch](https://blueprintjs.com/docs/#core/components/switch) component controlled and binded to Formik Field component. Holds the same original component properties with extra following properties.

`interface SwitchProps extends BPSwitchProps, Omit<FieldConfig, 'value' | 'type' | 'children' | 'component'>`

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

The following example demonstrates how to use binded Switch component with Formik.

```jsx
import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Switch } from '../packages/core/src';

interface Values {
  enabled: boolean;
}

export const SwitchExample = () => {
  return (
    <Formik
      initialValues={{
        enabled: true,
      }}
      onSubmit={(
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {}}
    >
      <Form>
        <FormGroup name={'number'} label={'Number'}>
          <Switch name={'enabled'} />
        </FormGroup>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
```
