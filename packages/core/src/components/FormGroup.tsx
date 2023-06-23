import React from 'react';
import { FieldMetaProps, FieldInputProps, useField } from 'formik';
import {
  FormGroup as BPFormGroup,
  Intent,
  FormGroupProps as BPFormGroupProps,
} from '@blueprintjs/core';

export interface FormGroupProps extends BPFormGroupProps {
  name: string;
  children: React.ReactElement;
}

/**
 * Transformes field props to form group.
 * @param   {Omit<FormGroupProps, "children">} props
 * @param   {FieldInputProps<any>} field
 * @param   {FieldMetaProps<any>} meta
 * @returns {PBFormGroupProps}
 */
const fieldToFormGroup = (
  props: Omit<FormGroupProps, 'children'>,
  field: FieldInputProps<any>,
  meta: FieldMetaProps<any>
): BPFormGroupProps => {
  const showError = meta.touched && meta.error;

  return {
    labelFor: field.name,
    intent: showError ? Intent.DANGER : Intent.NONE,
    helperText: showError ? meta.error : '',
    ...props,
  };
};

/**
 * Form group.
 * @param   {FormGroupProps}
 * @returns {React.JSX}
 */
export function FormGroup({ children, ...props }: FormGroupProps): JSX.Element {
  const [field, meta] = useField(props.name);

  return (
    <BPFormGroup
      {...fieldToFormGroup(props, field, meta)}
      children={children}
    />
  );
}
