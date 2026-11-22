/** @jest-environment jsdom */
const React = require('react');
const { Formik } = require('formik');
const { fireEvent, render, waitFor } = require('@testing-library/react');
const { enUS } = require('date-fns/locale');
const { DateInput, TimezoneSelect } = require('..');

test('date-only values keep their calendar day when displayed, edited and cleared', async () => {
  const { getByRole, getByTestId } = render(
    React.createElement(
      Formik,
      {
        initialValues: { day: '2024-03-10' },
        onSubmit: () => {},
      },
      ({ values }) =>
        React.createElement(
          React.Fragment,
          null,
          React.createElement(DateInput, {
            name: 'day',
            dateFnsFormat: 'yyyy-MM-dd',
            locale: enUS,
            fastField: true,
            minDate: new Date(2024, 0, 1),
            maxDate: new Date(2024, 11, 31),
          }),
          React.createElement('output', { 'data-testid': 'stored' }, values.day)
        )
    )
  );

  const input = getByRole('combobox');
  expect(input.value).toBe('2024-03-10');
  fireEvent.change(input, { target: { value: '2024-11-03' } });
  await waitFor(() =>
    expect(getByTestId('stored').textContent).toBe('2024-11-03')
  );
  fireEvent.change(input, { target: { value: '' } });
  await waitFor(() => expect(getByTestId('stored').textContent).toBe(''));
});

test('timezone selection updates the Formik field', async () => {
  const { getByRole, getByTestId, findByText } = render(
    React.createElement(
      Formik,
      {
        initialValues: { zone: 'America/New_York' },
        onSubmit: () => {},
      },
      ({ values }) =>
        React.createElement(
          React.Fragment,
          null,
          React.createElement(TimezoneSelect, { name: 'zone' }),
          React.createElement(
            'output',
            { 'data-testid': 'stored' },
            values.zone
          )
        )
    )
  );

  fireEvent.click(getByRole('button'));
  fireEvent.change(getByRole('combobox'), { target: { value: 'Tokyo' } });
  fireEvent.click(await findByText(/Tokyo/));
  await waitFor(() =>
    expect(getByTestId('stored').textContent).toBe('Asia/Tokyo')
  );
});
