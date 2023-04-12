import React from 'react';
import get from 'lodash.get';
import {
  Select as BPSelect,
  SelectProps as BPSelectProps,
  ItemPredicate,
  ItemRenderer,
} from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';
import { Field, FieldProps, FieldConfig, isFunction } from 'formik';

// # Types -----------------
export interface CommonSelectItem {
  /** Whether this option is non-interactive. */
  disabled?: boolean;

  /** Label text for this option. If omitted, `value` is used as the label. */
  label?: string;

  /** Value of this option. */
  value: string | number;

  /** Text for this option. */
  text?: string;
}
interface FormikSelectProps<T>
  extends Omit<BPSelectProps<T>, 'itemRenderer' | 'onItemSelect'> {
  itemRenderer?: ItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
}
interface SelectProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
    FormikSelectProps<T> {
  name: string;
  valueAccessor?: string;
  labelAccessor?: string;
  textAccessor?: string;
  input: (props: {
    activeItem: T;
    label: string;
    text: string;
    value: string | number;
  }) => React.ReactNode;
}
interface FieldToSelectProps<T> extends FormikSelectProps<T>, FieldProps {
  valueAccessor: string;
  labelAccessor: string;
  textAccessor: string;
  input: (props: {
    activeItem: T;
    label: string;
    text: string;
    value: string | number;
  }) => JSX.Element;
  children: React.ReactNode;
}

// # Utils -----------------
const getAccessor = (accessor: any, activeItem: any) => {
  return isFunction(accessor)
    ? accessor(activeItem)
    : get(activeItem, accessor);
};

/**
 * Transform field props to select props.
 * @param {FieldToSelectProps}
 * @returns {BPSelectProps<any> }
 */
function transformSelectToFieldProps<T extends CommonSelectItem>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  input,
  valueAccessor,
  labelAccessor,
  textAccessor,
  ...props
}: FieldToSelectProps<T>): BPSelectProps<T> & { children: React.ReactNode } {
  const _valueAccessor = valueAccessor || 'value';
  const _labelAccessor = labelAccessor || 'label';
  const _textAccessor = textAccessor || 'text';

  const activeItem = props.items.find(
    (item) => getAccessor(_valueAccessor, item) === field.value
  ) as T;

  const children = input
    ? input({
        activeItem,
        text: getAccessor(_textAccessor, activeItem),
        label: getAccessor(_labelAccessor, activeItem),
        value: getAccessor(_valueAccessor, activeItem),
      })
    : props.children;

  const itemPredicate: ItemPredicate<T> = (query, item, _index, exactMatch) => {
    const label = getAccessor(_labelAccessor, item);
    const normalizedLabel =
      'string' === typeof label ? label?.toLowerCase() : '';
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedLabel === normalizedQuery;
    } else {
      return `${normalizedLabel} ${label}`.indexOf(normalizedQuery) >= 0;
    }
  };
  const itemRenderer: ItemRenderer<T> = (
    item,
    { handleClick, modifiers, query }
  ) => {
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
        label={`${label}`}
        key={value}
        text={`${text}`}
        onClick={handleClick}
      />
    );
  };

  return {
    onItemSelect: (item: T) => {
      const value = getAccessor(_valueAccessor, item);
      form.setFieldValue(field.name, value);
    },
    activeItem,
    itemPredicate,
    itemRenderer,
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
function FieldToSelect<T extends CommonSelectItem>({
  ...props
}: FieldToSelectProps<T>): JSX.Element {
  return <BPSelect<T> {...transformSelectToFieldProps<T>(props)} />;
}

/**
 * Select binded with formik.
 * @param {JSX.Element}
 * @returns {SelectProps}
 */
export function Select<T extends CommonSelectItem>({
  ...props
}: SelectProps<T>): JSX.Element {
  return <Field {...props} component={FieldToSelect} />;
}
