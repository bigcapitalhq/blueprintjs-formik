// @ts-nocheck
import * as React from 'react';
import {
  Radio as BPRadio,
  RadioGroup as BPRadioGroup,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export function fieldToRadioGroup({
  field: { onBlur: fieldOnBlur, ...field },
  form,
  onBlur,
  ...props
}) {
  return {
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

export function FieldToRadioGroup(props) {
  return <BPRadioGroup {...fieldToRadioGroup(props)} />;
}

export function RadioGroup(props) {
  return <Field {...props} component={FieldToRadioGroup} />;
}

export function Radio(props) {
  return <BPRadio {...props} checked={true} />;
}
