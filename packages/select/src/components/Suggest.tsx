import React, { useCallback, useState } from 'react';
import {
  Suggest as BPSuggest,
  SuggestProps as BPSuggestProps,
  ItemPredicate,
  ItemRenderer,
} from '@blueprintjs/select';
import { getAccessor } from './utils';
import { MenuItem } from '@blueprintjs/core';
import { Field, FieldConfig } from 'formik';
import { SelectOptionProps } from './types';


// # Types -----------------
interface SuggestOptionProps extends SelectOptionProps {}
interface FormikItemRendererState {
  isSelected: boolean;
}
interface FormikSelectProps<T> {
  itemRenderer?: ItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  onCreateItemSelect?: (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => void;
}
interface SuggestProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
    FormikSelectProps<T> {
  name: string;
  valueAccessor?: string;
  labelAccessor?: string;
  textAccessor?: string;
}

// # Utils -------------------
/**
 * Transforms suggest to field.
 */
function transformSuggestSelectToField({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  valueAccessor,
  labelAccessor,
  ...props
}) {
  return {
    ...props,
    tagInputProps: {
      ...props?.tagInputProps,
      inputProps: {
        id: field?.name,
        ...props?.tagInputProps?.inputProps,
      },
    },
  };
}

function FieldToSuggest<T extends SuggestOptionProps>(props) {
  const {
    valueAccessor,
    labelAccessor,
    textAccessor,
    field,
    onCreateItemSelect,
  } = props;

  const _valueAccessor = valueAccessor || 'value';
  const _labelAccessor = labelAccessor || 'label';
  const _textAccessor = textAccessor || 'text';

  // Local selected item value.
  const [localSelected, setLocalSelected] = useState<string | number>(
    props.field.value
  );
  // Activate item.
  const activeItem = props.items.find(
    (item: T) => getAccessor(_valueAccessor, item) === field.value
  );

  const renderInputValue = (item: any) => item[textAccessor];

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
      item: any,
      { handleClick, modifiers, query },
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
          //   icon={isSelected ? 'tick' : 'blank'}
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
    (item: any, itemProps: any) => {
      const isSelected = isItemSelected(item);

      return props.itemRenderer
        ? props.itemRenderer(item, itemProps, { isSelected })
        : defaultItemRenderer(item, itemProps, { isSelected });
    },
    [isItemSelected, props, defaultItemRenderer]
  );

  const isItemEqual = (item: any, item2: any) => {
    return item[_valueAccessor] === item2[_valueAccessor];
  };

  return (
    <BPSuggest
      activeItem={activeItem}
      inputValueRenderer={renderInputValue}
      onItemSelect={handleValueChange}
      itemPredicate={itemPredicate}
      itemRenderer={localItemRenderer}
      itemsEqual={isItemEqual}
      {...transformSuggestSelectToField(props)}
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
