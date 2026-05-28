import React from 'react';
import { FieldMetaProps, FieldInputProps, FormikProps } from 'formik';
import {
  FormGroup as BPFormGroup,
  Intent,
  FormGroupProps as BPFormGroupProps,
} from '@blueprintjs/core';
import { Field, FieldBaseProps } from './FieldBase';

export interface FormGroupProps extends BPFormGroupProps, Pick<FieldBaseProps, 'fastField'> {
  name: string;
  children: React.ReactElement;
}

interface FieldToFormGroupProps extends Omit<FormGroupProps, 'fastField'> {
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
  form: FormikProps<any>;
}

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

const FieldToFormGroup = ({ field, meta, form, children, ...props }: FieldToFormGroupProps) => (
  <BPFormGroup {...fieldToFormGroup(props, field, meta)}>
    {children}
  </BPFormGroup>
);

/**
 * Form group.
 * @param   {FormGroupProps}
 * @returns {React.JSX}
 */
export function FormGroup({ fastField, ...props }: FormGroupProps): JSX.Element {
  return <Field {...props} fastField={fastField} component={FieldToFormGroup as React.ComponentType<any>} />;
}
