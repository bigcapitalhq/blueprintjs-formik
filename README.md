# Formik Blueprint.js

Bindings components for using Formik and Blueprint.js components.

- [Documentation](https://bigcapitalhq.github.io/blueprintjs-formik/)
- Codesandbox
  - [Core](https://codesandbox.io/s/core-9prm9y)

## Install

To install the bindings components for `@blueprintjs/core` library.

```
npm install @blueprintjs-formik/core
```

For components of `@blueprintjs/select` library.

```
npm install @blueprintjs-formik/select
```

For Blueprint 6 date and timezone controls, use `@blueprintjs-formik/datetime-v6` with `@blueprintjs/datetime@6`. The existing `@blueprintjs-formik/datetime` package serves Blueprint 3–5.

```tsx
import { DateInput, TimezoneSelect } from '@blueprintjs-formik/datetime-v6';

<DateInput name="invoiceDate" dateFnsFormat="yyyy-MM-dd" />
<TimezoneSelect name="timezone" />
```

DateInput passes date-only strings through to Blueprint and writes the selected calendar day back to Formik as `YYYY-MM-DD`. With `timePrecision`, it stores Blueprint's ISO date-time string. Clearing the input stores an empty string.

## Why is Blueprintjs-formik so awesome?

- Getting going quickly to develop sophisticated forms with Blueprintjs components and Formik.
- All bindings components written using TS and all interfaces exported.

## Changlog

Please see CHANGELOG for more information on what has changed recently.

## Contributing

Please see CONTRIBUTING for details.

---

Made by [Bigcapital.ly](https://bigcapital.ly), [Ahmed Bouhuolia](https://twitter.com)
