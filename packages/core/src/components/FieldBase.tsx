import React from 'react';
import {
  FastField as FormikFastField,
  Field as FormikField,
  FieldConfig,
  FastFieldConfig,
} from 'formik';

export interface FieldBaseProps extends FieldConfig, FastFieldConfig<any> {
  fastField?: boolean;
  shouldUpdateDeps?: Record<string, any>;
}

/**
 * Field.
 * @param {FieldBaseProps}
 */
export function Field({ fastField, ...props }: FieldBaseProps): JSX.Element {
  return fastField ? (
    <FormikFastField {...props} />
  ) : (
    <FormikField {...props} />
  );
}
