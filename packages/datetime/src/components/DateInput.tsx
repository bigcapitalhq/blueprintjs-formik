// @ts-nocheck
import React from 'react';
import { getIn, FieldConfig, FieldProps } from 'formik';
import { Intent } from '@blueprintjs/core';
import {
  DateInput as BPDateInput,
  DateInputProps as BPDateInputProps,
} from '@blueprintjs/datetime';
import { Field } from '@blueprintjs-formik/core';

export interface DateInputProps
  extends Omit<FieldConfig, 'children' | 'component' | 'as'>,
    Omit<BPDateInputProps, 'value' | 'name'> {
  name: string;
  formFormatDate?: (date: Date, locale?: string) => string;
  formParseDate?: (str: string, locale?: string) => Date | false | null;
}

export interface FieldToDateInput
  extends FieldProps,
    Omit<DateInputProps, 'form'> {}

const defaultFormFormatDate = (date: Date) => date.toISOString();
const defaultFormParseDate = (str: string) => (str ? new Date(str) : null);

/**
 * Transforms field props to input group props.
 * @param   {DateInputProps}
 * @returns {FieldToDateInput}
 */
function fieldToDateInput({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  ...props
}: FieldToDateInput): DateInputProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  const valueParser = props?.formParseDate || defaultFormParseDate;
  const valueFormatter = props?.formFormatDate || defaultFormFormatDate;

  const value = valueParser(field.value);

  return {
    ...field,
    onChange: (selectedDate: Date, _isUserChange: boolean) => {
      const changedValue = valueFormatter(selectedDate);
      form.setFieldValue(field.name, changedValue);
    },
    inputProps: {
      intent: showError ? Intent.DANGER : Intent.NONE,
      ...props?.inputProps,
    },
    value,
    ...props,
  };
}

/**
 * Transformes field props to date input props.
 * @param   {FieldToDateInput} props -
 * @returns {JSX.Element}
 */
function FieldToDatePicker({ ...props }: FieldToDateInput): JSX.Element {
  return <BPDateInput {...fieldToDateInput(props)} />;
}

/**
 * Date input Blueprint component binded with Formik.
 * @param   {DateInputProps}
 * @returns {JSX.Element}
 */
export function DateInput({ ...props }: DateInputProps): JSX.Element {
  return <Field {...props} component={FieldToDatePicker} />;
}
