import React from 'react';
import {
  DateInput as BPDateInput,
  DateInputProps as BPDateInputProps,
  TimezoneSelect as BPTimezoneSelect,
  TimezoneSelectProps as BPTimezoneSelectProps,
} from '@blueprintjs/datetime';
import { Field, FieldBaseProps } from '@blueprintjs-formik/core';
import { FieldProps } from 'formik';

type BindingProps = Pick<
  FieldBaseProps,
  'name' | 'fastField' | 'shouldUpdate' | 'shouldUpdateDeps' | 'validate'
>;

export type DateInputProps = BindingProps &
  Omit<BPDateInputProps, 'value' | 'defaultValue' | 'onChange'>;
export type TimezoneSelectProps = BindingProps &
  Omit<BPTimezoneSelectProps, 'value' | 'defaultValue' | 'onChange'>;

function dateValue(value: string | Date | null) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value.toISOString();
  }
  return value || null;
}

export function DateInput(props: DateInputProps) {
  const {
    name,
    fastField,
    shouldUpdate,
    shouldUpdateDeps,
    validate,
    inputProps,
    ...dateProps
  } = props;
  return (
    <Field {...props}>
      {({ field, form, meta }: FieldProps<string | Date | null>) => (
        <BPDateInput
          {...dateProps}
          value={dateValue(field.value)}
          onChange={(value) => form.setFieldValue(name, value ?? '')}
          inputProps={{
            id: name,
            name,
            onBlur: field.onBlur,
            intent: meta.touched && meta.error ? 'danger' : 'none',
            ...inputProps,
          }}
        />
      )}
    </Field>
  );
}

export function TimezoneSelect(props: TimezoneSelectProps) {
  const {
    name,
    fastField,
    shouldUpdate,
    shouldUpdateDeps,
    validate,
    buttonProps,
    ...timezoneProps
  } = props;
  return (
    <Field {...props}>
      {({ field, form, meta }: FieldProps<string>) => (
        <BPTimezoneSelect
          {...timezoneProps}
          value={field.value || ''}
          onChange={(value) => form.setFieldValue(name, value)}
          buttonProps={{
            intent: meta.touched && meta.error ? 'danger' : 'none',
            ...buttonProps,
          }}
        />
      )}
    </Field>
  );
}
