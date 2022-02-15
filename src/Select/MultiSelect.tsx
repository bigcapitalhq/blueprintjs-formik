// @ts-nocheck
import React from 'react';
import {
  MultiSelect as BPMultiSelect,
  IItemRendererProps,
} from '@blueprintjs/select';
import { Field } from 'formik';
import { getAccessor, mapItemsById } from './utils';

/**
 * Transforms multi-select to field.
 * @param   {}
 * @returns {}
 */
function transformMutliSelectToField({
  field: { onBlur: onFieldBlur, ...field },
  form: { touched, errors, ...form },
  meta,
  input,
  valueAccessor,
  labelAccessor,
  ...props
}) {
  return props;
}

/**
 * Binds formik field to multi-select blueprint field.
 * @returns {JSX.Element}
 */
function FieldToMutliSelect({ ...props }): JSX.Element {
  // Local selected values.
  const [localSelected, setLocalSelected] = React.useState<string | number[]>(
    props.field.value
  );
  // Sync the field value with the local selected state.
  React.useEffect(() => {
    if (props.field.value && localSelected) {
      setLocalSelected(props.field.value);
    }
  }, [props.field.value, localSelected]);

  // Updates the local selected state and the formik field.
  const updateLocalAndField = React.useCallback(
    (newLocalSelected) => {
      props.form.setFieldValue(props.field.name, newLocalSelected);
      setLocalSelected(newLocalSelected);
    },
    [props.field.name, props.form]
  );

  // Items by value.
  const itemsByValue = React.useMemo<{ [key: string | number]: any }>(
    () => mapItemsById(props.items, props.valueAccessor),
    [props.items, props.valueAccessor]
  );
  // Detarmines whether the given item is selected.
  const isItemSelected = React.useCallback(
    (item) => {
      const value = getAccessor(props.valueAccessor, item);
      return localSelected.some((i) => i === value);
    },
    [localSelected, props.valueAccessor]
  );
  // Handles item select.
  const handleItemSelect = React.useCallback(
    (item, event: React.SyntheticEvent<HTMLElement>) => {
      const value = getAccessor(props.valueAccessor, item);
      updateLocalAndField([...localSelected, value]);
    },
    [localSelected, props.valueAccessor, updateLocalAndField]
  );
  // Handle item tag delete.
  const handleItemRemove = React.useCallback(
    (deleteItem: any, index: number) => {
      const newLocalSelected = localSelected.filter(
        (item) => item !== getAccessor(props.valueAccessor, deleteItem)
      );
      updateLocalAndField(newLocalSelected);
    },
    [localSelected, props.valueAccessor, updateLocalAndField]
  );
  // Computed the selected items from selected ids.
  const selectedItems = React.useMemo(() => {
    return localSelected
      .filter((value) => itemsByValue[value])
      .map((value) => itemsByValue[value]);
  }, [localSelected, itemsByValue]);

  // Override `itemRenderer` to add extra properties.
  const localItemRenderer = React.useCallback(
    (item: any, itemProps: IItemRendererProps) => {
      const isSelected = isItemSelected(item);
      return props.itemRenderer(item, itemProps, { isSelected });
    },
    [isItemSelected, props]
  );

  return (
    <BPMultiSelect
      selectedItems={selectedItems}
      onItemSelect={handleItemSelect}
      onRemove={handleItemRemove}
      {...transformMutliSelectToField(props)}
      itemRenderer={localItemRenderer}
    />
  );
}

/**
 *
 * @param
 * @returns {JSX.Element}
 */
export function MultiSelect({ ...props }) {
  return <Field {...props} component={FieldToMutliSelect} />;
}
