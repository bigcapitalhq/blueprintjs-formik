import React from 'react';
import type { FieldProps } from 'formik';
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

interface FieldToFormGroupProps
  extends Omit<FormGroupProps, 'fastField' | 'name'>,
    Pick<FieldProps, 'field' | 'form'> {}

const FieldToFormGroup = ({ field, form, children, ...props }: FieldToFormGroupProps) => {
  const { touched, error } = form.getFieldMeta(field.name);
  const showError = touched && !!error;

  return (
    <BPFormGroup
      labelFor={field.name}
      intent={showError ? Intent.DANGER : Intent.NONE}
      helperText={showError ? error : ''}
      {...props}
    >
      {children}
    </BPFormGroup>
  );
};

/**
 * Form group.
 * @param   {FormGroupProps}
 * @returns {React.JSX}
 */
export function FormGroup({ fastField, ...props }: FormGroupProps): JSX.Element {
  return <Field {...props} fastField={fastField} component={FieldToFormGroup as React.ComponentType<any>} />;
}
