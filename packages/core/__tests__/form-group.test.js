/** @jest-environment jsdom */
const React = require('react');
const { Classes } = require('@blueprintjs/core');
const { Field, Formik } = require('formik');
const { fireEvent, render, waitFor } = require('@testing-library/react');
const { FormGroup } = require('..');

test.each([false, true])(
  'FormGroup displays nested validation errors after blur (fastField: %s)',
  async (fastField) => {
    const name = 'contact.email';
    const { getByLabelText, getByText, queryByText } = render(
      React.createElement(
        Formik,
        {
          initialValues: { contact: { email: '' } },
          initialErrors: { contact: { email: 'Email is required' } },
          validate: ({ contact }) =>
            contact.email ? {} : { contact: { email: 'Email is required' } },
          onSubmit: () => {},
        },
        React.createElement(
          FormGroup,
          { name, label: 'Email', fastField },
          React.createElement(Field, { id: name, name })
        )
      )
    );

    const input = getByLabelText('Email');
    expect(queryByText('Email is required')).toBeNull();

    fireEvent.blur(input);
    const error = await waitFor(() => getByText('Email is required'));
    expect(error.closest(`.${Classes.INTENT_DANGER}`)).not.toBeNull();

    fireEvent.change(input, { target: { value: 'user@example.com' } });
    await waitFor(() => expect(queryByText('Email is required')).toBeNull());
  }
);
