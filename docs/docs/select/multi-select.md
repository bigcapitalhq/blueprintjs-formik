---
sidebar_position: 2
---

# MultiSelect

## Reference

### Props

#### name

`name: string`

_Required_

A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like `social.facebook`.

#### valueAccessor

`name: string | (item: T): string|number`

_Required_

#### labelAccessor

`name: string | (item: T): string|number`

_Required_

#### input

`input: React.ReactNode`

_Required_

#### onItemSelect

`onItemSelect: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void`

Callback invoked when an item from the list is selected.

#### onAfterItemSelect

`onAfterItemSelect: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void`

Callback invoked after the selected item set to the formik values. gives ability to write extra logic without overriding the `onItemSelect` property.

#### onBeforeItemSelect

`onBeforeItemSelect: (item: T, event?: React.SyntheticEvent<HTMLElement>) => void`

Callback invoked before the selected item is set to the formik values. gives ability to write extra logic without overriding the `onItemSelect` property.

---

## Example
