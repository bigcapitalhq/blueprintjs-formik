import React from 'react';
import styled from 'styled-components';

function replacer(_: string, value: unknown) {
  // Filtering out properties
  if (value instanceof File) {
    return {
      size: value.size,
      name: value.name,
      type: value.type,
    };
  }
  return value;
}

interface Props {
  values: unknown;
}

export const FormValues = ({ values }: Props) => (
  <FormValuesRoot>
    <Code component="pre">{JSON.stringify(values, replacer, 2)}</Code>
  </FormValuesRoot>
);

const Code = styled.pre``;
const FormValuesRoot = styled.div``;
