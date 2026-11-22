import React from 'react';
import { getIn, FieldProps } from 'formik';
import {
  InputGroup as BPInputGroup,
  Intent,
} from '@blueprintjs/core';
import { Field, FieldBaseProps } from './FieldBase';

type BPInputGroupProps = React.ComponentPropsWithoutRef<typeof BPInputGroup>;

export interface InputGroupProps
  extends Omit<FieldBaseProps, 'children' | 'component' | 'as'>,
  Omit<BPInputGroupProps, 'value' | 'name'> { }

export interface FieldToInputProps
  extends FieldProps,
  Omit<BPInputGroupProps, 'form'> { }

/**
 * Transforms field props to input group props.
 * @param   {FieldToInputProps}
 * @returns {BPInputGroupProps}
 */
function fieldToInputGroup({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  onBlur,
  ...props
}: FieldToInputProps): BPInputGroupProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    id: field.name,
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
 * @returns {JSX.Element}
 */
function FieldToInputGroup({
  children,
  ...props
}: FieldToInputProps): JSX.Element {
  return <BPInputGroup {...fieldToInputGroup(props)} children={children} />;
}

/**
 * Input group Blueprint component bound with Formik.
 * @param   {InputGroupProps}
 * @returns {JSX.Element}
 */
export function InputGroup({ ...props }: InputGroupProps): JSX.Element {
  return <Field {...props} component={FieldToInputGroup} />;
}
