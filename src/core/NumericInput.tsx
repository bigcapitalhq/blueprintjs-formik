import React from 'react';
import { FieldProps, FieldConfig, getIn } from 'formik';
import {
  NumericInput as BPNumericInput,
  NumericInputProps as BPNumericInputProps,
  Intent,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export interface NumericInputProps
  extends Omit<FieldConfig, 'children' | 'component'>,
    Omit<BPNumericInputProps, 'value'> {}

export interface FieldToNumericInputProps
  extends FieldProps,
    BPNumericInputProps {}

/**
 * Transformes field to numeric input.
 * @param   {FieldToNumericInputProps}
 * @returns {BPNumericInputProps}
 */
function transformFieldToNumericInput({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, setFieldValue },
  ...props
}: FieldToNumericInputProps): BPNumericInputProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    intent: showError ? Intent.DANGER : Intent.NONE,
    onValueChange: (value: number) => {
      setFieldValue(field.name, value);
    },
    ...field,
    ...props,
  };
}

/**
 * Transforms field to numeric input.
 * @param   {FieldToNumericInputProps}
 * @returns {JSX.Element}
 */
function FieldToNumericInput({ ...props }: FieldToNumericInputProps) {
  return <BPNumericInput {...transformFieldToNumericInput(props)} />;
}

/**
 * Numeric input Blueprint component binded with Formik field.
 * @param   {NumericInputProps}
 * @returns {JSX.Element}
 */
export function NumericInput({ ...props }: NumericInputProps): JSX.Element {
  return <Field {...props} component={FieldToNumericInput} />;
}
