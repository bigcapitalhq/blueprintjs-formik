import { ComponentMeta } from '@storybook/react';

import "normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css"

import { Page } from './Page';
import { NumericInputPage } from './NumericInputPage';
import { SelectPage } from './SelectPage';
import { MultiSelectPage } from './MultiSelectPage';
import { SwitchPage } from './SwitchPage';
import { RadioGroupPage } from './RadioGroupPage';
import { TextAreaPage } from './TextAreaPage';
import { SliderPage } from './SliderPage';
import { HTMLSelectPage } from './HTMLSelectPage';
import { EditableTextPage } from './EditableTextPage';
import { DateInputPage } from './DateInputPage'; 

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
export const Switch = SwitchPage.bind({});
export const RadioGroup = RadioGroupPage.bind({});
export const TextArea = TextAreaPage.bind({});
export const Slider = SliderPage.bind({});
export const HTMLSelect = HTMLSelectPage.bind({});
export const EditableText = EditableTextPage.bind({});
export const DateInput = DateInputPage.bind({});

// // More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
// LoggedIn.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement);
//   const loginButton = await canvas.getByRole('button', { name: /Log in/i });
//   await userEvent.click(loginButton);
// };
