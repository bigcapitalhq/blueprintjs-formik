import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FormValues } from './FormValues';

import { FormGroup } from '../packages/core/src';
import { Select, SelectOptionProps } from '../packages/select/src';

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
  return (
    <article>
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
              <Select
                items={TOP_100_FILMS}
                name={'number'}
                input={({ text }) => <button>{text}</button>}
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
    </article>
  );
};
