import * as React from 'react';
import { FieldConfig, FieldProps } from 'formik';
import {
  RadioGroup as BPRadioGroup,
  RadioGroupProps as BPRadioGroupProps,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export interface RadioGroupProps
  extends BPRadioGroupProps,
    Omit<FieldConfig, 'component'> {
  name: string;
}

interface FieldToRadioGroupProps
  extends FieldProps,
    Omit<BPRadioGroupProps, 'onChange'> {
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export function fieldToRadioGroup({
  field: { onChange, ...field },
  form,
  ...props
}: FieldToRadioGroupProps): BPRadioGroupProps {
  return {
    selectedValue: field.value,
    onChange,
    ...props,
  };
}

export function FieldToRadioGroup(props: FieldToRadioGroupProps) {
  return <BPRadioGroup {...fieldToRadioGroup(props)} />;
}

export function RadioGroup(props: RadioGroupProps) {
  return <Field {...props} component={FieldToRadioGroup} />;
}
