import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer } from '@blueprintjs/select';
import { FormValues } from './FormValues';

import { FormGroup } from '../packages/core/src';
import { Select } from '../packages/select/src';

const FormValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

interface Values {
  number: number;
}

interface IFilm {
  title: string;
  year: number;
}
/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
export const TOP_100_FILMS: IFilm[] = [
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

export const filterFilm: ItemPredicate<IFilm> = (
  query,
  film,
  _index,
  exactMatch
) => {
  const normalizedTitle = film.title.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  } else {
    return (
      `${film.rank}. ${normalizedTitle} ${film.year}`.indexOf(
        normalizedQuery
      ) >= 0
    );
  }
};

export const renderFilm: ItemRenderer<IFilm> = (
  film,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${film.title}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={film.year.toString()}
      key={film.year}
      onClick={handleClick}
      text={text}
    />
  );
};

const filmSelectProps = {
  itemPredicate: filterFilm,
  itemRenderer: renderFilm,
  items: TOP_100_FILMS,
  valueAccessor: (film: IFilm) => film.year,
  labelAccessor: (film: IFilm) => film.title,
};

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
                input={({ label }) => <button>{label}</button>}
                {...filmSelectProps}
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
