import React from 'react';
import { getIn, FieldProps } from 'formik';
import { TagInput as BPTagInput, TagInputProps as BPTagInputProps, Intent } from '@blueprintjs/core';
import { Field, FieldBaseProps } from './FieldBase';

export interface TagInputProps
  extends Omit<FieldBaseProps, 'children' | 'component' | 'as' | 'value'>,
  Omit<BPTagInputProps, 'value' > {
  name: string;
}

interface FieldToTagInputProps
  extends FieldProps,
  Omit<BPTagInputProps, 'form'> { }

function fieldToTagInput({
  field: { onBlur: onFieldBlur, onChange, value, ...field },
  form: { touched, errors },
  ...props
}: FieldToTagInputProps): BPTagInputProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    intent: showError ? Intent.DANGER : Intent.NONE,
    inputProps: {
      id: field.name,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        onFieldBlur(e ?? field.name);
      },
      ...props.inputProps,
    },
    ...field,
    ...props,
    values: value || [],
  };
}

function FieldToTagInput({ ...props }: FieldToTagInputProps): JSX.Element {
  return <BPTagInput {...fieldToTagInput(props)} />;
}

export function TagInput({ ...props }: TagInputProps): JSX.Element {
  return <Field {...props} component={FieldToTagInput as any} />;
}
