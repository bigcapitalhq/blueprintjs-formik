import React from 'react';
import { getIn, FieldConfig, FieldProps, Field } from 'formik';
import { Intent } from '@blueprintjs/core';
import {
  DateInput as BPDateInput,
  DateInputProps as BPDateInputProps,
} from '@blueprintjs/datetime';

export interface DateInputProps
  extends Omit<FieldConfig, 'children' | 'component' | 'as'>,
  Omit<BPDateInputProps, 'value' | 'name'> {
  name: string;
  formFormatDate?: (date: Date, locale?: string) => string;
  formParseDate?: (str: string, locale?: string) => Date | false | null;
}

export interface FieldToDateInput
  extends FieldProps,
  Omit<DateInputProps, 'form'> { }

const defaultFormFormatDate = (date: Date) => date.toISOString();
const defaultFormParseDate = (str: string) => (str ? new Date(str) : null);

/**
 * Transforms field props to input group props.
 * @param {DateInputProps}
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
    onChange: (selectedDate: Date | null, _isUserChange: boolean) => {
      if (selectedDate) {
        const changedValue = valueFormatter(selectedDate);
        form.setFieldValue(field.name, changedValue);
      } else {
        form.setFieldValue(field.name, '');
      }
    },
    inputProps: {
      intent: showError ? Intent.DANGER : Intent.NONE,
      id: field.name,
      ...props?.inputProps,
    },
    value,
    ...props,
  };
}

/**
 * Transformes field props to date input props.
 * @param {FieldToDateInput} props - Field props
 * @returns {JSX.Element}
 */
function FieldToDatePicker(props: FieldToDateInput): JSX.Element {
  return <BPDateInput {...fieldToDateInput(props)} />;
}

/**
 * Date input Blueprint component binded with Formik.
 * @param {DateInputProps} props - Date input props
 * @returns {JSX.Element}
 */
export function DateInput({ ...props }: DateInputProps): JSX.Element {
  return (
    <Field {...props} component={FieldToDatePicker} />
  );
}
