import { ComponentMeta } from '@storybook/react';
// import { within, userEvent } from '@storybook/testing-library';
import { Page } from './Page';
import { NumericInputPage } from './NumericInputPage';
import { SelectPage } from './SelectPage';
import { MultiSelectPage } from './MultiSelectPage';

export default {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Page>;

export const InputGroup = Page.bind({});
export const NumericInput = NumericInputPage.bind({});
export const Select = SelectPage.bind({});
export const MultiSelect = MultiSelectPage.bind({});
// export const LoggedIn = Template.bind({});

// // More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = await canvas.getByRole('button', { name: /Log in/i });
//   await userEvent.click(loginButton);
// };
