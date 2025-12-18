import React from 'react';
import {
  Button as BPButton,
  ButtonProps as BPButtonProps,
  MenuItem,
} from '@blueprintjs/core';
import {
  Select as BPSelect,
  SelectProps as BPSelectProps,
  ItemPredicate,
  ItemRenderer,
} from '@blueprintjs/select';
import { Field, FieldProps, FieldConfig } from 'formik';
import { Accessor, SelectOptionProps } from './types';
import { getAccessor } from './utils';

// # Types -----------------
interface FormikSelectProps<T>
  extends Omit<BPSelectProps<T>, 'itemRenderer' | 'onItemSelect'> {
  itemRenderer?: ItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  onItemChange?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  onCreateItemSelect?: (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => void;
  input?: (props: {
    activeItem: T;
    label: string;
    text: string;
    value: string | number;
  }) => React.ReactNode;
  noResultsText?: string;
  placeholder?: string;
  buttonProps?: Partial<BPButtonProps>;
}
interface SelectProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
  FormikSelectProps<T> {
  name: string;
  valueAccessor?: Accessor<T>;
  labelAccessor?: Accessor<T>;
  textAccessor?: Accessor<T>;
}
interface FieldToSelectProps<T> extends FormikSelectProps<T>, FieldProps {
  valueAccessor: Accessor<T>;
  labelAccessor: Accessor<T>;
  textAccessor: Accessor<T>;
  input: (props: {
    activeItem: T;
    label: string;
    text: string;
    value: string | number;
  }) => JSX.Element;
  children: React.ReactNode;
}

/**
 * Transform field props to select props.
 * @param {FieldToSelectProps}
 * @returns {BPSelectProps<any> }
 */
function transformSelectToFieldProps<T extends SelectOptionProps>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  input,
  buttonProps,
  placeholder,
  valueAccessor,
  labelAccessor,
  textAccessor,
  onCreateItemSelect,
  noResultsText,
  onItemChange,
  ...props
}: FieldToSelectProps<T>): BPSelectProps<T> & { children: React.ReactNode } {
  const _valueAccessor = valueAccessor || 'value';
  const _labelAccessor = labelAccessor || 'label';
  const _textAccessor = textAccessor || 'text';

  const activeItem = props.items.find(
    (item) => getAccessor(_valueAccessor, item) === field.value
  ) as T;

  const activeItemText = getAccessor(_textAccessor, activeItem);
  const activeItemLabel = getAccessor(_labelAccessor, activeItem);
  const activeItemValue = getAccessor(_valueAccessor, activeItem);

  const children = input ? (
    input({
      activeItem,
      text: activeItemText,
      label: activeItemLabel,
      value: activeItemValue,
    })
  ) : (
    <BPButton
      text={activeItemText || placeholder || 'Select an item...'}
      rightIcon="double-caret-vertical"
      id={field.name}
      {...buttonProps}
    />
  );
  const itemPredicate: ItemPredicate<T> = (query, item, _index, exactMatch) => {
    const text = getAccessor(_textAccessor, item);
    const label = getAccessor(_labelAccessor, item);
    const normalizedText = 'string' === typeof text ? text?.toLowerCase() : '';
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedText === normalizedQuery;
    } else {
      return `${normalizedText} ${label}`.indexOf(normalizedQuery) >= 0;
    }
  };
  const itemRenderer: ItemRenderer<T> = (item, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const label = getAccessor(_labelAccessor, item);
    const text = getAccessor(_textAccessor, item);
    const value = getAccessor(_valueAccessor, item);

    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={label}
        key={value}
        text={text}
        onClick={handleClick}
      />
    );
  };
  // Default behavior of `onItemChange` to set field value to Formik provider.
  const _onItemChange = (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => {
    const value = getAccessor(_valueAccessor, item);
    form.setFieldValue(field.name, value);
  };
  const onItemSelect = (item: T, event?: React.SyntheticEvent<HTMLElement>) => {
    const value = getAccessor(_valueAccessor, item);

    if ('undefined' !== typeof value) {
      onItemChange ? onItemChange(item, event) : _onItemChange(item, event);
    } else {
      onCreateItemSelect && onCreateItemSelect(item, event);
    }
  };
  const noResults = (
    <MenuItem disabled={true} text={noResultsText || 'No results.'} />
  );

  return {
    onItemSelect,
    activeItem,
    itemPredicate,
    itemRenderer,
    noResults,
    ...props,
    children,
  };
}

// # Components -----------------
/**
 * Transformes field props to BP select props.
 * @param {FieldToSelectProps}
 * @returns {JSX.Element}
 */
function FieldToSelect<T extends SelectOptionProps>({
  ...props
}: FieldToSelectProps<T>): JSX.Element {
  return <BPSelect<T> {...transformSelectToFieldProps<T>(props)} />;
}

/**
 * Select binded with formik.
 * @param {JSX.Element}
 * @returns {SelectProps}
 */
export function Select<T extends SelectOptionProps>({
  ...props
}: SelectProps<T>): JSX.Element {
  return <Field {...props} component={FieldToSelect} />;
}
