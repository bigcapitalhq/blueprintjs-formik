/** @jest-environment jsdom */
const React = require('react');
const { Field, Formik } = require('formik');
const { fireEvent, render, waitFor } = require('@testing-library/react');
const { FormikSelect, FormikSuggest, FormikMultiSelect } = require('..');

const items = [{ text: 'Checking', value: 1 }];
const cases = [
  ['Select', FormikSelect, null, 'button', fireEvent.click],
  ['Suggest', FormikSuggest, null, 'input', fireEvent.focus],
  [
    'MultiSelect',
    FormikMultiSelect,
    [],
    'input',
    (input) => fireEvent.change(input, { target: { value: 'Check' } }),
  ],
];

test.each(cases)(
  '%s keeps its picker mounted during blur validation',
  async (_, Picker, initialValue, selector, open) => {
    const { container, getByText } = render(
      React.createElement(
        Formik,
        {
          initialValues: { other: '', account: initialValue },
          validate: () => ({ other: 'Required' }),
          onSubmit: () => {},
        },
        ({ errors }) =>
          React.createElement(
            React.Fragment,
            null,
            React.createElement(Field, { name: 'other' }),
            React.createElement(
              'div',
              { className: 'picker' },
              React.createElement(Picker, { name: 'account', items })
            ),
            errors.other
          )
      )
    );

    const trigger = () => container.querySelector('.picker ' + selector);
    const initialTrigger = trigger();
    open(initialTrigger);
    const option = await waitFor(() => getByText('Checking'));
    fireEvent.blur(container.querySelector('[name="other"]'));
    await waitFor(() => getByText('Required'));

    expect(trigger()).toBe(initialTrigger);
    expect(getByText('Checking')).toBe(option);
  }
);
