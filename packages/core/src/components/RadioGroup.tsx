import * as React from 'react';
import { FieldConfig, FieldProps } from 'formik';
import {
  RadioGroup as BPRadioGroup,
  RadioGroupProps as BPRadioGroupProps,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export interface RadioGroupProps
  extends Omit<BPRadioGroupProps, 'onChange'>,
    Omit<FieldConfig, 'component'> {
  name: string;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

interface FieldToRadioGroupProps
  extends FieldProps,
    Omit<BPRadioGroupProps, 'onChange'> {
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

/**
 * Transformes the field props to radio group component.
 * @param   {FieldToRadioGroupProps}
 * @returns {BPRadioGroupProps}
 */
export function fieldToRadioGroup({
  field,
  form,
  onChange,
  ...props
}: FieldToRadioGroupProps): BPRadioGroupProps {
  return {
    selectedValue: field.value,
    onChange:
      onChange ??
      function (event: React.FormEvent<HTMLInputElement>) {
        form.setFieldValue(field.name, event.currentTarget.value);
      },
    ...props,
  };
}

/**
 * Transformes the field props to radio group component.
 * @param   {FieldToRadioGroupProps}
 * @returns {JSX.Element}
 */
export function FieldToRadioGroup(props: FieldToRadioGroupProps): JSX.Element {
  return <BPRadioGroup {...fieldToRadioGroup(props)} />;
}

/**
 * Radio group wrap BP component to bind with Formik.
 * @param   {RadioGroupProps}
 * @returns {JSX.Element}
 */
export function RadioGroup(props: RadioGroupProps): JSX.Element {
  return <Field {...props} component={FieldToRadioGroup} />;
}
