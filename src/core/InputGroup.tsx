import React from 'react';
import { getIn, FieldConfig, FieldProps } from 'formik';
import {
  InputGroup as BPInputGroup,
  InputGroupProps2 as PBInputGroupProps2,
  Intent,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

interface InputGroupProps
  extends Omit<FieldConfig, 'children'>,
    Omit<PBInputGroupProps2, 'value' | 'name'> {}

export interface FieldToInputProps
  extends FieldProps,
    Omit<PBInputGroupProps2, 'form'> {}

/**
 * Transforms field props to input group props.
 * @param   {FieldToInputProps}
 * @returns {PBInputGroupProps2}
 */
function fieldToInputGroup({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  onBlur,
  ...props
}: FieldToInputProps): PBInputGroupProps2 {
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

/**
 * Transformes field props to input group props.
 * @param   {FieldToInputProps} props -
 * @returns {React.JSX}
 */
function FieldToInputGroup({
  children,
  ...props
}: FieldToInputProps): React.JSX {
  return <BPInputGroup {...fieldToInputGroup(props)} children={children} />;
}

/**
 * Input group Blueprint component binded with Formik.
 * @param   {InputGroupProps}
 * @returns {React.JSX}
 */
export function InputGroup({ ...props }: InputGroupProps) {
  return <Field {...props} component={FieldToInputGroup} />;
}
