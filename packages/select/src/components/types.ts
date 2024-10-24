import { IItemRendererProps } from '@blueprintjs/select';

export interface SelectOptionProps {
  disabled?: boolean;

  /** Label of this option. */
  label?: string;

  /** Text of this option. */
  text?: string;

  /** Value of this option. */
  value?: string | number;
}

export interface FormikItemRendererState {
  isSelected: boolean;
}

export type FormikItemRenderer<T> = (
  item: T,
  itemProps: IItemRendererProps,
  { isSelected }: FormikItemRendererState
) => JSX.Element | null;


export type Accessor<T> = string | ((activeItem: T) => void);