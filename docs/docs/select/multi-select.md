---
sidebar_position: 2
---

# MultiSelect

Let's translate `docs/intro.md` to French.

Docusaurus can manage multiple versions of your docs.

## Reference

### Props

#### name

`name: string`

*Required*

A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like `social.facebook`.


#### valueAccessor

`name: string | (item: T): string|number`

*Required*

#### labelAccessor

`name: string | (item: T): string|number`

*Required*

#### input

`input: React.ReactNode`

*Required*

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