import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FormValues } from './FormValues';

import { FormGroup } from '../packages/core/src';
import { Select, FormikSelect, SelectOptionProps } from '../packages/select/src';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  number: number;
}

interface IFilm extends SelectOptionProps {
  title: string;
  year: number;
}
/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
const TOP_100_FILMS: IFilm[] = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
];

export const SelectPage = () => {
  // Standalone Select state
  const [standaloneValue, setStandaloneValue] = useState<string | number | undefined>(1999);

  return (
    <article>
      {/* Standalone Select (without Formik) */}
      <section style={{ marginBottom: '2rem' }}>
        <h3>Standalone Select (without Formik)</h3>
        <Select
          items={TOP_100_FILMS}
          selectedValue={standaloneValue}
          onValueChange={(value) => setStandaloneValue(value ?? undefined)}
          valueAccessor={'year'}
          labelAccessor={'year'}
          textAccessor={'title'}
        />
        <p style={{ marginTop: '0.5rem' }}>
          Selected value: <strong>{standaloneValue ?? 'None'}</strong>
        </p>
      </section>

      {/* FormikSelect (with Formik) */}
      <section>
        <h3>FormikSelect (with Formik)</h3>
        <Formik
          initialValues={{
            number: 1972,
          }}
          validationSchema={FormValidation}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {}}
        >
          {({ values }) => (
            <Form>
              <FormGroup name={'number'} label={'Number'}>
                <FormikSelect
                  items={TOP_100_FILMS}
                  name={'number'}
                  valueAccessor={'year'}
                  labelAccessor={'year'}
                  textAccessor={'title'}
                />
              </FormGroup>

              <button type="submit">Submit</button>
              <FormValues values={values} />
            </Form>
          )}
        </Formik>
      </section>
    </article>
  );
};
