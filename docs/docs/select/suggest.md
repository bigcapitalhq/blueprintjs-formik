---
sidebar_position: 3
---

# Suggest

Blueprint [Suggest](https://blueprintjs.com/docs/#select/suggest) component binded with Formik [Field](https://formik.org/docs/api/field) component, holds the same Blueprint's select properties with additional props where it makes sense.


## Reference

### Props

#### name

`name: string`

*Required*

A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like `social.facebook`.

#### valueAccessor

`name: string | (item: T): string|number`

*Required*

If a string is passed, the item's value will be looked up on the original item via that key, eg. If your accessor is `firstName` then its value would be read from item['firstName'].

If a function is passed, the column's value will be looked up on the original item using this accessor function, eg. If your accessor is `item => item.firstName`, then its value would be determined by passing the item to this function and using the resulting value.

#### labelAccessor

`name: string | (item: T): string|number`

*Required*

If a string is passed, the item's value will be looked up on the original item via that key, eg. If your accessor is `firstName` then its value would be read from item['firstName'].

If a function is passed, the column's value will be looked up on the original item using this accessor function, eg. If your accessor is `item => item.firstName`, then its value would be determined by passing the item to this function and using the resulting value.

#### input

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