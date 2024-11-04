import React from 'react';
import {
  Switch as BPSwitch,
  SwitchProps as BPSwitchProps,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Field, FieldBaseProps } from './FieldBase';

export interface SwitchProps
  extends BPSwitchProps,
  Omit<FieldBaseProps, 'value' | 'type' | 'children' | 'component'> {
  name: string;
}

export interface SwitchToFieldProps
  extends FieldProps,
  Omit<BPSwitchProps, 'form'> { }

/**
 * Transforms the field props to switch props.
 * @param {SwitchToFieldProps}
 * @returns {SwitchProps}
 */
function fieldToSwitch({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form,
  type,
  onBlur,
  ...props
}: SwitchToFieldProps) {
  return {
    id: field.name,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

/**
 * Transforms the field props to Switch BP properties.
 * @param {SwitchToFieldProps}
 * @returns {JSX.Element}
 */
function FieldToSwitchGroup({ ...props }: SwitchToFieldProps): JSX.Element {
  return <BPSwitch {...fieldToSwitch(props)} />;
}

/**
 * Switch BP wrapped component to bind with Formik.
 * @param {SwitchProps}
 * @returns {JSX.Element}
 */
export function Switch({ ...props }: SwitchProps): JSX.Element {
  return <Field {...props} type={'checkbox'} component={FieldToSwitchGroup} />;
}
