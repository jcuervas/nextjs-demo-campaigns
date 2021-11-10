import React, {FocusEvent, FormEventHandler, useState} from "react";
import {Form, FormThemeProvider, TextField} from "@react-md/form";
import {differenceInCalendarYears} from 'date-fns';
import {useTranslation} from "next-i18next";
import {Button} from "@react-md/button";

export function YearSelector(props: { onNext: (accept: boolean) => Promise<boolean> }) {

  const {t} = useTranslation('common')
  const [year, setYear] = useState<string>()

  const verifyAge: FormEventHandler = (ev: FocusEvent<HTMLFormElement>) => {
    const differenceInYears = differenceInCalendarYears(new Date(), new Date(ev.target.value))
    return props.onNext(differenceInYears >= 18)
  }
  return (
    <FormThemeProvider theme="underline" underlineDirection="left">
      <Form onSubmit={verifyAge}>
        <h2>{t('insert_birth_year')}</h2>
        <TextField
          type="date"
          id="year_selector"
          value={year} onChange={ev => setYear(ev.target.value)}/>
        <Button type="submit">{t('send')}</Button>
      </Form>
    </FormThemeProvider>
    )
}
