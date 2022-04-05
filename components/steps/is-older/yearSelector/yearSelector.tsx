import React, {useState} from 'react';
import {differenceInCalendarYears} from 'date-fns';
import {useTranslation} from 'next-i18next';
import {Button} from '@mui/material';
import {useForm} from 'react-hook-form';
import {StyledTextField} from '@components/shared';

export function YearSelector(props: { onNext: (accept: boolean) => void }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const {t} = useTranslation('common');
  const [year, setYear] = useState('');

  function verifyAge(data: {year: string}) {
    const differenceInYears = differenceInCalendarYears(new Date(), new Date(data.year));
    return props.onNext(differenceInYears >= 18);
  }
  return (
    <form onSubmit={handleSubmit(verifyAge)}>
      <h2>{t('insert_birth_year')}</h2>
      <StyledTextField
        type="date"
        variant="standard"
        {...register("year")}
        id="year_selector"
        value={year} onChange={ev => setYear(ev.target.value)}/>
      <Button type="submit" variant="contained" color="primary" className="ok">{t('send')}</Button>
    </form>
  );
}
