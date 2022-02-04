// @ts-nocheck
import React from 'react';
import { FastField as FormikFastField, Field as FormikField } from 'formik';

export function Field({ fastField, ...props }) {
  return fastField ? (
    <FormikFastField {...props} />
  ) : (
    <FormikField {...props} />
  );
}
