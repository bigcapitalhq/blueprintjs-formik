import React from 'react';
import { getIn, FieldConfig, FieldProps } from 'formik';
import {
  TextArea as BPTextArea,
  TextAreaProps as BPTextAreaProps,
  Intent,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export interface TextAreaProps
  extends Omit<FieldConfig, 'children' | 'component' | 'as'>,
    BPTextAreaProps {
  value: string;
  name: string;
  onBlur: (e: React.FocusEvent<any>) => void;
}

interface FieldToTextAreaProps
  extends FieldProps,
    Omit<BPTextAreaProps, 'form'> {}

/**
 * Transformes the field props to textarea props.
 * @param   {Omit<FieldToTextAreaProps, 'children'>}
 * @returns {TextAreaProps}
 */
function fieldToTextarea({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  onBlur,
  ...props
}: Omit<FieldToTextAreaProps, 'children'>): TextAreaProps {
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
 * Transformes the field props to textarea props.
 * @param   {FieldToTextAreaProps}
 * @returns {JSX.Element}
 */
function FieldToTextArea({
  children,
  ...props
}: FieldToTextAreaProps): JSX.Element {
  return <BPTextArea {...fieldToTextarea(props)} children={children} />;
}

/**
 * Textarea Blurprint component binded with Formik.
 * @param   {TextAreaProps}
 * @returns {JSX.Element}
 */
export function TextArea({ ...props }: TextAreaProps): JSX.Element {
  return <Field {...props} component={FieldToTextArea} />;
}
