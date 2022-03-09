---
sidebar_position: 5
---

# Checkbox

Blueprint [Checkbox](https://blueprintjs.com/docs/#core/components/checkbox) component controlled and binded to Formik Field component. Holds the same original component properties with extra following properties.

`interface InputGroupProps extends Omit<FieldConfig, 'children'>, Omit<PBInputGroupProps2, 'value' | 'name'> {}`

## Reference

### Props

#### name

`name: string`

***Required***

A field's name in Formik state, to access nested objects or arrays, name can also accept the lodash-like dot like `social.facebook`.

---

## Example