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
import { SelectOptionProps } from './types';

// # Types -----------------
interface SuggestOptionProps extends SelectOptionProps {}
interface FormikItemRendererState {
  isSelected: boolean;
}
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
}
interface FormikSuggestSelectProps<T>
  extends Omit<
      BPSuggestProps<T>,
      'itemRenderer' | 'onItemSelect' | 'inputValueRenderer'
    >,
    FormikSuggestCommonProps<T> {}
interface SuggestProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
    FormikSuggestSelectProps<T> {
  name: string;
}
interface FieldToSuggestProps<T>
  extends FormikSuggestSelectProps<T>,
    FieldProps {}

// # Utils -------------------
/**
 * Transforms suggest to field.
 */
function transformSuggestSelectToField<T extends SelectOptionProps>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  valueAccessor,
  labelAccessor,
  textAccessor,
  ...props
}: FieldToSuggestProps<T>) {
  return {
    ...props,
  };
}

// # Components -------------------
/**
 * Binds formik field to suggest Blueprint field.
 */
function FieldToSuggest<T extends SuggestOptionProps>(
  props: FieldToSuggestProps<T>
) {
  const {
    valueAccessor,
    labelAccessor,
    textAccessor,
    field,
    onCreateItemSelect,
  } = props;

  const _valueAccessor = (valueAccessor || 'value') as 'value';
  const _labelAccessor = (labelAccessor || 'label') as 'label';
  const _textAccessor = (textAccessor || 'text') as 'text';

  // Local selected item value.
  const [localSelected, setLocalSelected] = useState<string | number>(
    props.field.value
  );
  // Activate item.
  const activeItem = props.items.find(
    (item: T) => getAccessor(_valueAccessor, item) === field.value
  );

  const renderInputValue = (item: T) => item[_textAccessor] as string;

  // Handle the item change.
  const handleValueChange = (
    item: any,
    event?: React.SyntheticEvent<HTMLElement>
  ) => {
    const value = getAccessor(_valueAccessor, item);
    const isSelected = isItemSelected(item);

    if (typeof value === 'undefined') {
      onCreateItemSelect && onCreateItemSelect(item, event);
    } else if (!isSelected) {
      props.form.setFieldValue(props.field.name, value);
      setLocalSelected(value);
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

  // Specifies how to test if two items are equal. by default, comparing between the item value property.
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
      {...transformSuggestSelectToField(props)}
      itemRenderer={localItemRenderer}
    />
  );
}

/**
 * Suggest field binded to Formik.
 * @param {SuggestProps<T>} props
 * @returns {JSX.Element}
 */
export function Suggest<T extends SuggestOptionProps>(
  props: SuggestProps<T>
): JSX.Element {
  return <Field {...props} component={FieldToSuggest} />;
}
