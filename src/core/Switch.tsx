import React from 'react';
import {
  Switch as BPSwitch,
  SwitchProps as PBSwitchProps,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Field, FieldBaseProps } from './FieldBase';

type SwitchFieldWithField = PBSwitchProps & FieldBaseProps;

export interface SwitchProps extends Omit<SwitchFieldWithField, 'children'> {
  name: string;
  value: any;
  type?: string;
}

export interface FieldToSwitchProps
  extends FieldProps,
    Omit<PBSwitchProps, 'form'> {}

/**
 * Transformes the field props to switch props.
 * @param {FieldToSwitchProps}
 * @returns {PBSwitchProps}
 */
function fieldToSwitch({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form,
  type,
  onBlur,
  ...props
}: FieldToSwitchProps): PBSwitchProps {
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

/**
 * Transformes fields props to switch props.
 * @param   {FieldToSwitchProps} props
 * @returns {React.JSX}
 */
function FieldToSwitch(props: FieldToSwitchProps): React.JSX {
  return <BPSwitch {...fieldToSwitch(props)} />;
}

/**
 * Switch field bind BP switch with formik field.
 * @param   {SwitchProps}
 * @returns {React.JSX}
 */
export function Switch({ ...props }: SwitchProps) {
  return <Field {...props} type={'checkbox'} component={FieldToSwitch} />;
}
