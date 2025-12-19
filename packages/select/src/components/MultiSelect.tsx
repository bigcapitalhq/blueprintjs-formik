import React, { useMemo, useCallback, ComponentType } from 'react';
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
import { useUncontrolled } from '../utils/use-uncontrolled';

// # Types -------------------
interface MultiSelectCommonProps<T> {
  itemRenderer?: FormikItemRenderer<T>;
  onItemSelect?: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void;
  selectedItems?: T[];
  tagRenderer?: (item: T) => React.ReactNode;
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

interface BaseMultiSelectProps<T>
  extends Omit<
    BPMultiSelectProps<T>,
    'itemRenderer' | 'onItemSelect' | 'selectedItems' | 'tagRenderer'
  >,
  MultiSelectCommonProps<T> { }

export interface MultiSelectProps<T> extends BaseMultiSelectProps<T> {
  selectedValues?: (string | number)[];
  initialSelectedValues?: (string | number)[];
  onValuesChange?: (values: (string | number)[]) => void;
}

export interface FormikMultiSelectProps<T>
  extends Omit<FieldConfig, 'children' | 'as' | 'component'>,
  BaseMultiSelectProps<T> {
  name: string;
}

interface FieldToMultiSelectProps<T> extends BaseMultiSelectProps<T>, FieldProps { }

// # Utils -------------------
/**
 * Transforms Formik field props to MultiSelect props.
 */
function transformFieldToMultiSelectProps<T extends SelectOptionProps>({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  ...props
}: FieldToMultiSelectProps<T>): MultiSelectProps<T> {
  return {
    selectedValues: field.value,
    onValuesChange: (values) => {
      form.setFieldValue(field.name, values);
    },
    tagInputProps: {
      ...props?.tagInputProps,
      inputProps: {
        id: field?.name,
        ...props?.tagInputProps?.inputProps,
      },
    },
    ...props,
  };
}

// # Components -------------------
/**
 * MultiSelect component (standalone, not bound to Formik).
 * @param {MultiSelectProps<T>} props
 * @returns {JSX.Element}
 */
export function MultiSelect<T extends SelectOptionProps>(
  props: MultiSelectProps<T>
): JSX.Element {
  const {
    valueAccessor = 'value',
    labelAccessor = 'label',
    textAccessor = 'text',
    tagAccessor = 'text',
    noResultsText,
    onCreateItemSelect,
    selectedValues,
    initialSelectedValues,
    onValuesChange,
    itemRenderer: customItemRenderer,
    ...restProps
  } = props;

  // Local selected values state
  const [localSelected, handleValuesChange] = useUncontrolled<(string | number)[]>({
    value: selectedValues,
    initialValue: initialSelectedValues,
    finalValue: [],
    onChange: onValuesChange,
  });

  // Items by value.
  const itemsByValue = useMemo(
    () => mapItemsById(props.items, valueAccessor) as { [key: string | number]: T },
    [props.items, valueAccessor]
  );

  // Determines whether the given item is selected.
  const isItemSelected = useCallback(
    (item: T) => {
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
        handleValuesChange([...localSelected, value]);
      }
    },
    [
      localSelected,
      valueAccessor,
      handleValuesChange,
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
      handleValuesChange(newLocalSelected);
    },
    [localSelected, valueAccessor, handleValuesChange]
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
    (item: T, itemProps: IItemRendererProps) => {
      const isSelected = isItemSelected(item);

      return customItemRenderer
        ? customItemRenderer(item, itemProps, { isSelected })
        : defaultItemRenderer(item, itemProps, { isSelected });
    },
    [defaultItemRenderer, isItemSelected, customItemRenderer]
  );

  // Item predicate for searching.
  const itemPredicate: ItemPredicate<T> = useCallback(
    (query, item, _index, exactMatch) => {
      const text = getAccessor(textAccessor, item);
      const label = getAccessor(labelAccessor, item);
      const normalizedText =
        'string' === typeof text ? text?.toLowerCase() : '';
      const normalizedQuery = query.toLowerCase();

      if (exactMatch) {
        return normalizedText === normalizedQuery;
      } else {
        return `${normalizedText} ${label}`.indexOf(normalizedQuery) >= 0;
      }
    },
    [textAccessor, labelAccessor]
  );

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
      itemRenderer={localItemRenderer}
      {...restProps}
    />
  );
}

// # HOC -----------------
/**
 * Props for the Formik-bound MultiSelect component created by withFormikMultiSelect.
 */
export type WithFormikMultiSelectProps<T> = Omit<
  MultiSelectProps<T>,
  'selectedValues' | 'onValuesChange' | 'initialSelectedValues'
> &
  Omit<FieldConfig, 'children' | 'as' | 'component'> & {
    name: string;
  };

/**
 * Higher-Order Component that wraps a MultiSelect component to bind it with Formik.
 *
 * @example
 * ```tsx
 * const FormikBoundMultiSelect = withFormikMultiSelect(MultiSelect);
 *
 * // Usage in a Formik form:
 * <FormikBoundMultiSelect
 *   name="tags"
 *   items={tags}
 *   valueAccessor="id"
 *   labelAccessor="name"
 *   textAccessor="name"
 * />
 * ```
 *
 * @param WrappedComponent - The MultiSelect component to wrap
 * @returns A new component that is bound to Formik
 */
export function withFormikMultiSelect<T extends SelectOptionProps>(
  WrappedComponent: ComponentType<MultiSelectProps<T>>
) {
  // Internal component that bridges Formik field props to the wrapped MultiSelect
  function FieldToWrappedMultiSelect(
    props: BaseMultiSelectProps<T> & FieldProps
  ): JSX.Element {
    const multiSelectProps = transformFieldToMultiSelectProps(props);
    return <WrappedComponent {...multiSelectProps} />;
  }

  // The HOC component that uses Field
  function FormikBoundMultiSelect(props: WithFormikMultiSelectProps<T>): JSX.Element {
    return <Field {...props} component={FieldToWrappedMultiSelect} />;
  }

  // Set display name for debugging
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  FormikBoundMultiSelect.displayName = `withFormikMultiSelect(${wrappedComponentName})`;

  return FormikBoundMultiSelect;
}

/**
 * MultiSelect component bound to Formik.
 * Built using withFormikMultiSelect HOC.
 * @exports
 * @param {FormikMultiSelectProps<T>} props
 * @returns {JSX.Element}
 */
export const FormikMultiSelect = withFormikMultiSelect(MultiSelect);

/**
 * @deprecated Use FormikMultiSelect instead. This alias is provided for backwards compatibility.
 */
export const MultiSelectField = FormikMultiSelect;
