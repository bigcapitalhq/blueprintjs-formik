// @ts-nocheck
import React from 'react';
import { Checkbox as BPCheckbox } from '@blueprintjs/core';
import { Field } from './FieldBase';

function fieldToCheckbox({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form,
  type,
  onBlur,
  ...props
}) {
  const indeterminate = !Array.isArray(field.value) && field.value == null;

  return {
    indeterminate,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

function FieldToCheckboxGroup({ ...props }) {
  return <BPCheckbox {...fieldToCheckbox(props)} />;
}

export function Checkbox({ ...props }) {
  return (
    <Field {...props} type={'checkbox'} component={FieldToCheckboxGroup} />
  );
}
