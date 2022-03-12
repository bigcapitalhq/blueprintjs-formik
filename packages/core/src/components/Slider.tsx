// @ts-nocheck
import React from 'react';
import { getIn, FieldConfig, FieldProps } from 'formik';
import { Slider as BPSlider, Intent } from '@blueprintjs/core';
import { Field } from './FieldBase';

function fieldToSlider({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  onBlur,
  ...props
}) {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    intent: showError ? Intent.DANGER : Intent.NONE,
    onBlur:
      onBlur ??
      function (e) {
        onFieldBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

function FieldToSlider({ children, ...props }) {
  return <BPSlider {...fieldToSlider(props)} children={children} />;
}

export function Slider({ ...props }) {
  return <Field {...props} component={FieldToSlider} />;
}
