import React from 'react';
import { FieldProps, getIn } from 'formik';
import {
  EditableText as BPEditableText,
  EditableTextProps as BPEditableTextProps,
  Intent,
} from '@blueprintjs/core';
import { Field, FieldBaseProps } from './FieldBase';

interface EditableTextProps
  extends BPEditableTextProps,
  Omit<FieldBaseProps, 'children' | 'value'> { }

export interface FieldToEditableTextProps
  extends FieldProps,
  BPEditableTextProps { }

/**
 * Transforms the Formik field props to editable text.
 * @param   {FieldToEditableTextProps}
 * @returns {EditableTextProps}
 */
const fieldToEditableText = ({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, setFieldValue },
  meta,
  ...props
}: FieldToEditableTextProps): EditableTextProps => {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    intent: showError ? Intent.DANGER : Intent.NONE,
    ...field,
    onChange: (value: string) => {
      setFieldValue(field.name, value);
    },
    ...props,
  };
};

/**
 * Transforms the Formik field props to editable text component.
 * @param   {FieldToEditableTextProps}
 * @returns {JSX.Element}
 */
function FieldToEditableText({ ...props }: FieldToEditableTextProps) {
  return <BPEditableText {...fieldToEditableText(props)} />;
}

/**
 * Editable text bound with Formik.
 * @param   {EditableTextProps}
 * @returns {JSX.Element}
 */
export function EditableText({ ...props }: EditableTextProps) {
  return <Field {...props} component={FieldToEditableText} />;
}
