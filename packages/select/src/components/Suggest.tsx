import React, { useCallback } from 'react';
import {
  Suggest as BPSuggest,
  SuggestProps as BPSuggestProps,
  ItemPredicate,
} from '@blueprintjs/select';
import { getAccessor } from './utils';
import { MenuItem } from '@blueprintjs/core';
import { Field } from 'formik';

// # Utils -------------------
/**
 * Transforms multi-select to field.
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

function FieldToSuggest(props) {
  const { valueAccessor, labelAccessor, textAccessor, field } = props;

  const _valueAccessor = valueAccessor || 'value';
  const _labelAccessor = labelAccessor || 'label';
  const _textAccessor = textAccessor || 'text';

  const activeItem = props.items.find(
    (item) => getAccessor(_valueAccessor, item) === field.value
  );

  const renderInputValue = (item: any) => item[textAccessor];

  const handleValueChange = () => {};

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

  const defaultItemRenderer = useCallback(
    (item: any, { handleClick, modifiers, query }) => {
      if (!modifiers.matchesPredicate) {
        return null;
      }
      const label = getAccessor(labelAccessor, item);
      const text = getAccessor(textAccessor, item);
      const value = getAccessor(valueAccessor, item);

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
    [labelAccessor, textAccessor, valueAccessor]
  );

  const isItemEqual = (item: any, item2: any) => {
    // Compare only the titles (ignoring case) just for simplicity.
    return item[_valueAccessor] === item2[_valueAccessor];
  };

  return (
    <BPSuggest
      activeItem={activeItem}
      inputValueRenderer={renderInputValue}
      onItemSelect={handleValueChange}
      itemPredicate={itemPredicate}
      itemRenderer={defaultItemRenderer}
      itemsEqual={isItemEqual}
      {...transformSuggestSelectToField(props)}
    />
  );
}

export function Suggest(props) {
  return <Field {...props} component={FieldToSuggest} />;
}
