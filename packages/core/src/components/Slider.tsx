import React from 'react';
import { getIn, FieldConfig, FieldProps } from 'formik';
import {
  Slider as BPSlider,
  SliderProps as BPSliderProps,
  Intent,
} from '@blueprintjs/core';
import { Field } from './FieldBase';

export interface SliderProps
  extends BPSliderProps,
    Omit<FieldConfig, 'component' | 'as' | 'value'> {}

interface SliderToFieldProps extends FieldProps, BPSliderProps {}

/**
 * Transformes the field props to slider props.
 * @param   {SliderToFieldProps}
 * @returns {SliderProps}
 */
function fieldToSlider({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors },
  ...props
}: SliderToFieldProps): SliderProps {
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;

  return {
    intent: showError ? Intent.DANGER : Intent.NONE,
    ...field,
    ...props,
  };
}

/**
 * Transformes the field props to slider props.
 * @param   {SliderToFieldProps}
 * @returns {JSX.Element}
 */
function FieldToSlider({ ...props }: SliderToFieldProps): JSX.Element {
  return <BPSlider {...fieldToSlider(props)} />;
}

/**
 * Transformes the field props to slider props.
 * @param   {SliderProps}
 * @returns {JSX.Element}
 */
export function Slider({ ...props }: SliderProps): JSX.Element {
  return <Field {...props} component={FieldToSlider} />;
}
