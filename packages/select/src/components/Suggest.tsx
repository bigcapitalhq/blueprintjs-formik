import React, { useCallback, useState } from 'react';
import {
  Suggest as BPSuggest,
  SuggestProps as BPSuggestProps,
  IItemRendererProps,
  ItemPredicate,
} from '@blueprintjs/select';
import { getAccessor } from './utils';
import { MenuItem } from '@blueprintjs/core';
import { Field, FieldConfig, FieldProps } from 'formik';
import { FormikItemRendererState, SelectOptionProps } from './types';

// # Types -----------------
interface SuggestOptionProps extends SelectOptionProps {}

type FormikItemRenderer<T> = (
  item: T,
  itemProps: IItemRendererProps,
  { isSelected }: FormikItemRendererState
) => JSX.Element | null;
interface FormikSuggestCommonProps<T> {
  itemRenderer?: FormikItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  onCreateItemSelect?: (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => void;
  valueAccessor?: string;
  labelAccessor?: string;
  textAccessor?: string;
  onItemChange?: (
    value: string,
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => void;
}
interface FormikSuggestSelectProps<T>
  extends Omit<
      BPSuggestProps<T>,
      'itemRenderer' | 'onItemSelect' | 'inputValueRenderer'
    >,
    FormikSuggestCommonProps<T> {}
interface SuggestFieldProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
    FormikSuggestSelectProps<T> {
  name: string;
}
interface FieldToSuggestProps<T>
  extends FormikSuggestSelectProps<T>,
    FieldProps {}

interface SuggestProps<T> extends FormikSuggestSelectProps<T> {
  selectedValue?: string | number;
}

// # Utils -------------------
/**
 * Transforms suggest to field.
 */
function transformSuggestSelectToField<T extends SelectOptionProps>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  ...props
}: FieldToSuggestProps<T>): SuggestProps<T> {
  return {
    selectedValue: field.value,
    onItemChange: (value: string) => {
      form.setFieldValue(field.name, value);
    },
    ...props,
  };
}

function transformSuggestToField<T extends SelectOptionProps>({
  valueAccessor,
  labelAccessor,
  textAccessor,
  onItemChange,
  selectedValue,
  ...props
}: SuggestProps<T>)  {
  return {
    ...props,
  };
}

// # Components -------------------
/**
 * Suggest component.
 * @param {SuggestProps<T>} props
 * @returns {JSX.Element}
 */
export function Suggest<T extends SuggestOptionProps>(props: SuggestProps<T>) {
  const {
    valueAccessor,
    labelAccessor,
    textAccessor,
    selectedValue,
    onCreateItemSelect,
    onItemChange,
  } = props;

  const _valueAccessor = (valueAccessor || 'value') as 'value';
  const _labelAccessor = (labelAccessor || 'label') as 'label';
  const _textAccessor = (textAccessor || 'text') as 'text';

  // Local selected item value.
  const [localSelected, setLocalSelected] = useState<string | number>(
    selectedValue || ''
  );
  // Activate item.
  const activeItem = props.items.find(
    (item: T) => getAccessor(_valueAccessor, item) === selectedValue
  );
  const renderInputValue = (item: T) => item[_textAccessor] as string;

  // Handle the item change.
  const handleValueChange = (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => {
    const value = getAccessor(_valueAccessor, item);
    const isSelected = isItemSelected(item);

    if (typeof value === 'undefined') {
      onCreateItemSelect && onCreateItemSelect(item, event);
    } else if (!isSelected) {
      setLocalSelected(value);
      onItemChange && onItemChange(value, item, event);
    }
  };
  // Item predicator for searching.
  const itemPredicate: ItemPredicate<T> = (query, item, _index, exactMatch) => {
    const normalizedTitle = item.label?.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    if (exactMatch) {
      return normalizedTitle === normalizedQuery;
    } else {
      return (
        `${item.label} ${normalizedTitle} ${item.text}`.indexOf(
          normalizedQuery
        ) >= 0
      );
    }
  };
  // Default item renderer.
  const defaultItemRenderer = useCallback(
    (
      item: T,
      { handleClick, modifiers, query }: IItemRendererProps,
      { isSelected }: FormikItemRendererState
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
          label={label}
          key={value}
          onClick={handleClick}
          text={text}
          icon={isSelected ? 'tick' : 'blank'}
        />
      );
    },
    [_labelAccessor, _textAccessor, _valueAccessor]
  );
  // Detarmines whether the given item is selected.
  const isItemSelected = useCallback(
    (_item) => {
      return _item === localSelected;
    },
    [localSelected]
  );
  // Override `itemRenderer` to add extra props.
  const localItemRenderer = useCallback(
    (item: T, itemProps: IItemRendererProps): JSX.Element | null => {
      const isSelected = isItemSelected(item);

      return props.itemRenderer
        ? props.itemRenderer(item, itemProps, { isSelected })
        : defaultItemRenderer(item, itemProps, { isSelected });
    },
    [isItemSelected, props, defaultItemRenderer]
  );

  // Specifies how to test if two items are equal.
  // by default, comparing between the item value property.
  const isItemEqual = (itemA: T, itemB: T) => {
    return itemA[_valueAccessor] === itemB[_valueAccessor];
  };

  return (
    <BPSuggest
      activeItem={activeItem}
      selectedItem={activeItem}
      inputValueRenderer={renderInputValue}
      onItemSelect={handleValueChange}
      itemPredicate={itemPredicate}
      itemsEqual={isItemEqual}
      {...transformSuggestToField(props)}
      itemRenderer={localItemRenderer}
    />
  );
}

/**
 * Binds formik field to suggest Blueprint field.
 * @param {FieldToSuggestProps<T>} props
 * @returns {JSX.Element}
 */
function FieldToSuggest<T extends SuggestOptionProps>(
  props: FieldToSuggestProps<T>
) {
  return <Suggest {...transformSuggestSelectToField(props)} />;
}

/**
 * Suggest field binded to Formik.
 * @exports
 * @param {SuggestFieldProps<T>} props
 * @returns {JSX.Element}
 */
export function SuggestField<T extends SuggestOptionProps>(
  props: SuggestFieldProps<T>
): JSX.Element {
  return <Field {...props} component={FieldToSuggest} />;
}
