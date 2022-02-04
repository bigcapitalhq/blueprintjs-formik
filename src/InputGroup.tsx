// @ts-nocheck
import React from 'react';
import { getIn } from 'formik';
import { InputGroup as BPInputGroup } from '@blueprintjs/core';
import { Field } from './FieldBase';

function fieldToInputGroup({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  onBlur,
  ...props
}) {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    error: showError,
    onBlur:
      onBlur ??
      function (e) {
        onFieldBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

function FieldToInputGroup({ children, ...props }) {
  return <BPInputGroup {...fieldToInputGroup(props)} children={children} />;
}

export function InputGroup({ ...props }) {
  return <Field {...props} component={FieldToInputGroup} />;
}
