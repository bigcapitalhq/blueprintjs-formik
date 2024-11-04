import React from 'react';
import {
  Checkbox as BPCheckbox,
  CheckboxProps as BPCheckboxProps,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Field, FieldBaseProps } from './FieldBase';

export interface CheckboxProps
  extends BPCheckboxProps,
  Omit<FieldBaseProps, 'children' | 'component' | 'as' | 'type' | 'value'> {
  name: string;
}

interface CheckboxToFieldProps
  extends FieldProps,
  Omit<BPCheckboxProps, 'form'> { }

/**
 * Transforms the field props to checkbox props.
 * @param   {CheckboxToFieldProps}
 * @returns {CheckboxProps}
 */
function fieldToCheckbox({
  disabled,
  field: { onBlur: fieldOnBlur, ...field },
  form,
  type,
  onBlur,
  ...props
}: CheckboxToFieldProps): CheckboxProps {
  const indeterminate = !Array.isArray(field.value) && field.value == null;

  return {
    indeterminate,
    onBlur:
      onBlur ??
      function (e) {
        fieldOnBlur(e ?? field.name);
      },
    ...field,
    ...props,
  };
}

/**
 * Transforms the Formik field props to checkbox group component.
 * @param   {CheckboxToFieldProps}
 * @returns {JSX.Element}
 */
function FieldToCheckboxGroup({ ...props }: CheckboxToFieldProps): JSX.Element {
  return <BPCheckbox {...fieldToCheckbox(props)} />;
}

/**
 * Checkbox BP wrappeed component to bind with Formik.
 * @param   {CheckboxProps}
 * @returns {JSX.Element}
 */
export function Checkbox({ ...props }: CheckboxProps): JSX.Element {
  return (
    <Field {...props} type={'checkbox'} component={FieldToCheckboxGroup} />
  );
}
