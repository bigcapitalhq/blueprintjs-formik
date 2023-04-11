import React from 'react';
import { FieldConfig, FieldProps } from 'formik';
import {
  HTMLSelect as BPHTMLSelect,
  HTMLSelectProps as BPHTMLSelectProps,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export interface HTMLSelectProps
  extends Omit<FieldConfig, 'children' | 'component' | 'as'>,
    BPHTMLSelectProps {
  name: string;
  value?: string | number;
}

interface FieldToTextAreaProps
  extends FieldProps,
    Omit<BPHTMLSelectProps, 'form'> {}

/**
 * Transformes the field props to `HTMLSelect` props.
 * @param   {FieldToTextAreaProps}
 * @returns {HTMLSelectProps}
 */
function fieldToHTMLSelect({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  ...props
}: FieldToTextAreaProps): HTMLSelectProps {
  return {
    ...field,
    ...props,
    multiple: undefined,
  };
}

/**
 * Transformes field props to `HTMLSelect` props.
 * @param   {FieldToTextAreaProps}
 * @returns {JSX.Element}
 */
function FieldToHTMLSelect({
  children,
  ...props
}: FieldToTextAreaProps): JSX.Element {
  return <BPHTMLSelect {...fieldToHTMLSelect(props)} children={children} />;
}

/**
 * HTML select wrapper for BP component to bind with Formik.
 * @param   {TextAreaProps} props -
 * @returns {JSX.Element}
 */
export function HTMLSelect({ ...props }: HTMLSelectProps): JSX.Element {
  return <Field {...props} component={FieldToHTMLSelect} />;
}
