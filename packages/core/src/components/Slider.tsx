import React from 'react';
import { getIn, FieldProps } from 'formik';
import {
  Slider as BPSlider,
  SliderProps as BPSliderProps,
  Intent,
} from '@blueprintjs/core';
import { Field, FieldBaseProps } from './FieldBase';

export interface SliderProps
  extends BPSliderProps,
  Omit<FieldBaseProps, 'component' | 'as' | 'value' | 'children'> { }

interface SliderToFieldProps extends FieldProps, BPSliderProps { }

/**
 * Transforms the field props to slider props.
 * @param   {SliderToFieldProps}
 * @returns {SliderProps}
 */
function fieldToSlider({
  field: { onBlur: onFieldBlur, ...field },
  form: { setFieldValue, touched, errors },
  ...props
}: SliderToFieldProps): SliderProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    intent: showError ? Intent.DANGER : Intent.NONE,
    ...field,
    onChange: (value: number) => {
      setFieldValue(field.name, value);
    },
    ...props,
  };
}

/**
 * Transforms the field props to slider props.
 * @param   {SliderToFieldProps}
 * @returns {JSX.Element}
 */
function FieldToSlider({ ...props }: SliderToFieldProps): JSX.Element {
  return <BPSlider {...fieldToSlider(props)} />;
}

/**
 * Transforms the field props to slider props.
 * @param   {SliderProps}
 * @returns {JSX.Element}
 */
export function Slider({ ...props }: SliderProps): JSX.Element {
  return <Field {...props} component={FieldToSlider} />;
}
