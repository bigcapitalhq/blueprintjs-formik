// @ts-nocheck
import { isFunction } from 'formik';
import get from 'lodash.get';
import keyBy from 'lodash.keyby';

export const getAccessor = (accessor: any, activeItem: any) => {
  return isFunction(accessor)
    ? accessor(activeItem)
    : get(activeItem, accessor);
};

export const mapItemsById = (items, iteratee) => {
  return keyBy(items, iteratee);
};

