import React from 'react';
import { getIn, FieldConfig, FieldProps, Field } from 'formik';
import { Intent } from '@blueprintjs/core';
import {
    TimezoneSelect as BPTimezoneSelect,
    TimezoneSelectProps as BPTimezoneSelectProps,
} from '@blueprintjs/datetime2';

export interface TimezoneSelectProps
    extends Omit<FieldConfig, 'children' | 'component' | 'as'>,
    Omit<BPTimezoneSelectProps, 'value' | 'name' | 'onChange'> {
    name: string;
}

interface FieldToTimezoneSelect
    extends FieldProps,
    Omit<TimezoneSelectProps, 'form'> { }

/**
 * Transforms field props to timezone select props.
 * @param {FieldToTimezoneSelect} props - Field props
 * @returns {TimezoneSelectProps}
 */
function fieldToTimezoneSelect({
    field: { onBlur: onFieldBlur, ...field },
    form: { touched, errors, ...form },
    meta,
    ...props
}: FieldToTimezoneSelect): BPTimezoneSelectProps {
    const fieldError = getIn(errors, field.name);
    const showError = getIn(touched, field.name) && !!fieldError;

    return {
        ...field,
        onChange: (timezone: string) => {
            form.setFieldValue(field.name, timezone);
        },
        buttonProps: {
            intent: showError ? Intent.DANGER : Intent.NONE,
            ...props?.buttonProps,
        },
        value: field.value || '',
        ...props,
    };
}

/**
 * Transforms field props to timezone select component.
 * @param {FieldProps} props - Field props
 * @returns {JSX.Element}
 */
function FieldToTimezoneSelectComponent(props: FieldProps): JSX.Element {
    return (
        <BPTimezoneSelect
            {...fieldToTimezoneSelect(props as FieldToTimezoneSelect)}
        />
    );
}

/**
 * Timezone select Blueprint component binded with Formik.
 * @param {TimezoneSelectProps} props - Timezone select props
 * @returns {JSX.Element}
 */
export function TimezoneSelect({ ...props }: TimezoneSelectProps): JSX.Element {
    return <Field {...props} component={FieldToTimezoneSelectComponent} />;
}
