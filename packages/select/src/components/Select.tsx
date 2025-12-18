import React, { useCallback } from 'react';
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
import { useUncontrolled } from '../../../common/use-uncontrolled';

// # Types -----------------
interface SelectCommonProps<T> {
  itemRenderer?: ItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  onItemChange?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  onCreateItemSelect?: (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => void;
  input?: (props: {
    activeItem: T | null;
    label: string;
    text: string;
    value: string | number;
  }) => React.ReactNode;
  noResultsText?: string;
  placeholder?: string;
  buttonProps?: Partial<BPButtonProps>;
  valueAccessor?: Accessor<T>;
  labelAccessor?: Accessor<T>;
  textAccessor?: Accessor<T>;
}

interface BaseSelectProps<T>
  extends Omit<BPSelectProps<T>, 'itemRenderer' | 'onItemSelect' | 'children'>,
  SelectCommonProps<T> { }

export interface SelectProps<T> extends BaseSelectProps<T> {
  selectedValue?: string | number;
  initialSelectedValue?: string | number;
  onValueChange?: (value: string | number | null) => void;
}

export interface FormikSelectProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
  BaseSelectProps<T> {
  name: string;
}

interface FieldToSelectProps<T> extends BaseSelectProps<T>, FieldProps { }

// # Utils -----------------
/**
 * Transforms Formik field props to Select props.
 */
function transformFieldToSelectProps<T extends SelectOptionProps>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  ...props
}: FieldToSelectProps<T>): SelectProps<T> {
  return {
    selectedValue: field.value,
    onValueChange: (value) => {
      form.setFieldValue(field.name, value);
    },
    ...props,
  };
}

// # Components -----------------
/**
 * Select component (standalone, not bound to Formik).
 * @param {SelectProps<T>} props
 * @returns {JSX.Element}
 */
export function Select<T extends SelectOptionProps>(
  props: SelectProps<T>
): JSX.Element {
  const {
    selectedValue,
    initialSelectedValue,
    onValueChange,
    valueAccessor,
    labelAccessor,
    textAccessor,
    input,
    buttonProps,
    placeholder,
    onCreateItemSelect,
    noResultsText,
    onItemChange,
    itemRenderer: customItemRenderer,
    ...restProps
  } = props;

  const _valueAccessor = (valueAccessor || 'value') as Accessor<T>;
  const _labelAccessor = (labelAccessor || 'label') as Accessor<T>;
  const _textAccessor = (textAccessor || 'text') as Accessor<T>;

  // Local selected value state
  const [localSelected, handleValueChange] = useUncontrolled<
    string | number | null
  >({
    value: selectedValue,
    initialValue: initialSelectedValue,
    finalValue: null,
    onChange: onValueChange,
  });

  // Find active item based on selected value
  const activeItem =
    (props.items.find(
      (item) => getAccessor(_valueAccessor, item) === localSelected
    ) as T) || null;

  const activeItemText = getAccessor(_textAccessor, activeItem);
  const activeItemLabel = getAccessor(_labelAccessor, activeItem);
  const activeItemValue = getAccessor(_valueAccessor, activeItem);

  // Render children (button or custom input)
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
      {...buttonProps}
    />
  );

  // Item predicate for filtering
  const itemPredicate: ItemPredicate<T> = useCallback(
    (query, item, _index, exactMatch) => {
      const text = getAccessor(_textAccessor, item);
      const label = getAccessor(_labelAccessor, item);
      const normalizedText =
        'string' === typeof text ? text?.toLowerCase() : '';
      const normalizedQuery = query.toLowerCase();

      if (exactMatch) {
        return normalizedText === normalizedQuery;
      } else {
        return `${normalizedText} ${label}`.indexOf(normalizedQuery) >= 0;
      }
    },
    [_textAccessor, _labelAccessor]
  );

  // Default item renderer
  const defaultItemRenderer: ItemRenderer<T> = useCallback(
    (item, { handleClick, modifiers }) => {
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
    },
    [_labelAccessor, _textAccessor, _valueAccessor]
  );

  // Handle item selection
  const handleItemSelect = useCallback(
    (item: T, event?: React.SyntheticEvent<HTMLElement>) => {
      const value = getAccessor(_valueAccessor, item);

      if (typeof value !== 'undefined') {
        handleValueChange(value);
        onItemChange && onItemChange(item, event);
      } else {
        onCreateItemSelect && onCreateItemSelect(item, event);
      }
    },
    [_valueAccessor, handleValueChange, onItemChange, onCreateItemSelect]
  );

  const noResults = (
    <MenuItem disabled={true} text={noResultsText || 'No results.'} />
  );

  return (
    <BPSelect<T>
      activeItem={activeItem}
      onItemSelect={handleItemSelect}
      itemPredicate={itemPredicate}
      itemRenderer={customItemRenderer || defaultItemRenderer}
      noResults={noResults}
      {...restProps}
    >
      {children}
    </BPSelect>
  );
}

/**
 * Internal component that bridges Formik field props to Select props.
 * @param {FieldToSelectProps<T>} props
 * @returns {JSX.Element}
 */
function FieldToSelect<T extends SelectOptionProps>(
  props: FieldToSelectProps<T>
): JSX.Element {
  return <Select {...transformFieldToSelectProps(props)} />;
}

/**
 * Select component bound to Formik.
 * @exports
 * @param {FormikSelectProps<T>} props
 * @returns {JSX.Element}
 */
export function FormikSelect<T extends SelectOptionProps>(
  props: FormikSelectProps<T>
): JSX.Element {
  return <Field {...props} component={FieldToSelect} />;
}

/**
 * @deprecated Use FormikSelect instead. This alias is provided for backwards compatibility.
 */
export const SelectField = FormikSelect;
