// @ts-nocheck
import React from 'react';
import { useField } from 'formik';
import { FormGroup as PBFormGroup, Intent } from '@blueprintjs/core';

const fieldToFormGroup = (props, field, meta) => {
  const showError = meta.touched && meta.error;

  return {
    intent: showError ? Intent.DANGER : null,
    helperText: showError ? meta.error : '',
    ...props,
  };
};

export function FormGroup({ children, ...props }) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <PBFormGroup
      {...fieldToFormGroup(props, field, meta)}
      children={children}
    />
  );
}
