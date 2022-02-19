// @ts-nocheck
import React from 'react';
import { Switch as BPSwitch } from '@blueprintjs/core';
import { Field } from './FieldBase';

function fieldToSwitch({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form,
  type,
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

function FieldToSwitchGroup({ ...props }) {
  return <BPSwitch {...fieldToSwitch(props)} />;
}

export function Switch({ ...props }) {
  return (
    <Field {...props} type={'checkbox'} component={FieldToSwitchGroup} />
  );
}
