import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  MultiSelect as BPMultiSelect,
  MultiSelectProps as BPMultiSelectProps,
  IItemRendererProps,
  ItemPredicate,
} from '@blueprintjs/select';
import { MenuItem } from '@blueprintjs/core';
import { Field, FieldConfig, FieldProps } from 'formik';
import { getAccessor, mapItemsById } from './utils';
import {
  FormikItemRenderer,
  FormikItemRendererState,
  SelectOptionProps,
} from './types';

// # Types -------------------
interface FormikMultiSelectProps<T>
  extends Omit<
      BPMultiSelectProps<T>,
      'itemRenderer' | 'onItemSelect' | 'selectedItems' | 'tagRenderer'
    >,
    FormikMultiSelectExtraProps<T> {
  itemRenderer?: FormikItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  selectedItems?: T[];
  tagRenderer?: (item: T) => React.ReactNode;
}
interface FormikMultiSelectExtraProps<T> {
  valueAccessor?: string;
  labelAccessor?: string;
  textAccessor?: string;
  tagAccessor?: string;
  noResultsText?: string;
  onCreateItemSelect?: (
    item: T,
    event?: React.SyntheticEvent<HTMLElement>
  ) => void;
}
interface MultiSelectProps<T>
  extends FormikMultiSelectProps<T>,
    Omit<FieldConfig, 'children' | 'as' | 'component'> {
  name: string;
}
interface FieldToMultiSelectProps<T>
  extends FormikMultiSelectProps<T>,
    FieldProps {
  children: React.ReactNode;
}

// # Utils -------------------
/**
 * Transforms multi-select to field.
 */
function transformMutliSelectToField<T extends SelectOptionProps>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  valueAccessor,
  labelAccessor,
  ...props
}: FieldToMultiSelectProps<T>): FormikMultiSelectProps<T> & {
  children: React.ReactNode;
} {
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

// # Components -------------------
/**
 * Binds formik field to multi-select blueprint field.
 */
function FieldToMutliSelect<T extends SelectOptionProps>({
  ...props
}: FieldToMultiSelectProps<T>): JSX.Element {
  const {
    valueAccessor = 'value',
    labelAccessor = 'label',
    textAccessor = 'text',
    tagAccessor = 'text',
    noResultsText,
    onCreateItemSelect,
  } = props;

  // Local selected values.
  const [localSelected, setLocalSelected] = useState<(string | number)[]>(
    props.field.value
  );
  // Sync the field value with the local selected state.
  useEffect(() => {
    if (props.field.value && localSelected) {
      setLocalSelected(props.field.value);
    }
  }, [props.field.value, localSelected]);

  // Updates the local selected state and the formik field.
  const updateLocalAndField = useCallback(
    (newLocalSelected) => {
      props.form.setFieldValue(props.field.name, newLocalSelected);
      setLocalSelected(newLocalSelected);
    },
    [props.field.name, props.form]
  );

  // Items by value.
  const itemsByValue = useMemo<{ [key: string | number]: any }>(
    () => mapItemsById(props.items, valueAccessor),
    [props.items, valueAccessor]
  );
  // Detarmines whether the given item is selected.
  const isItemSelected = useCallback(
    (item) => {
      const value = getAccessor(valueAccessor, item);
      return localSelected.some((i) => i === value);
    },
    [localSelected, valueAccessor]
  );
  // Handles item select.
  const handleItemSelect = useCallback(
    (item: T, event?: React.SyntheticEvent<HTMLElement>) => {
      const value = getAccessor(valueAccessor, item);
      const isSelected = isItemSelected(item);

      if (typeof value === 'undefined') {
        onCreateItemSelect && onCreateItemSelect(item, event);
      } else if (!isSelected) {
        updateLocalAndField([...localSelected, value]);
      }
    },
    [
      localSelected,
      valueAccessor,
      updateLocalAndField,
      isItemSelected,
      onCreateItemSelect,
    ]
  );
  // Handle item tag delete.
  const handleItemRemove = useCallback(
    (deleteItem: T, index: number) => {
      const newLocalSelected = localSelected.filter(
        (item) => item !== getAccessor(valueAccessor, deleteItem)
      );
      updateLocalAndField(newLocalSelected);
    },
    [localSelected, valueAccessor, updateLocalAndField]
  );
  // Computed the selected items from selected ids.
  const selectedItems = useMemo(() => {
    return localSelected
      .filter((value) => itemsByValue[value])
      .map((value) => itemsByValue[value]);
  }, [localSelected, itemsByValue]);

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
          icon={isSelected ? 'tick' : 'blank'}
        />
      );
    },
    [labelAccessor, textAccessor, valueAccessor]
  );
  // Override `itemRenderer` to add extra properties.
  const localItemRenderer = useCallback(
    (item: any, itemProps: IItemRendererProps) => {
      const isSelected = isItemSelected(item);

      return props.itemRenderer
        ? props.itemRenderer(item, itemProps, { isSelected })
        : defaultItemRenderer(item, itemProps, { isSelected });
    },
    [defaultItemRenderer, isItemSelected, props]
  );
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
  // Tag value mapper.
  const tagRenderer = (item: T) => getAccessor(tagAccessor, item);

  const noResults = (
    <MenuItem disabled={true} text={noResultsText || 'No results.'} />
  );

  return (
    <BPMultiSelect<T>
      selectedItems={selectedItems}
      onItemSelect={handleItemSelect}
      onRemove={handleItemRemove}
      itemPredicate={itemPredicate}
      tagRenderer={tagRenderer}
      noResults={noResults}
      {...transformMutliSelectToField(props)}
      itemRenderer={localItemRenderer}
    />
  );
}

/**
 * Multi select binded with Formik.
 * @param {MultiSelectProps<T>} props
 * @returns {JSX.Element}
 */
export function MultiSelect<T extends SelectOptionProps>({
  ...props
}: MultiSelectProps<T>) {
  return <Field {...props} component={FieldToMutliSelect} />;
}
