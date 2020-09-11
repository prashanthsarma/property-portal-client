import { useState, ChangeEvent } from 'react';


export const useForm = <T>(initialValues: T) => {

  const [values, setValues] = useState(initialValues);

  function setFormValue(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  function setNameValue(name: string, value: any) {
    setValues({ ...values, [name]: value })
  }

  function setAllValues(values: T) {
    setValues({ ...values })
  }

  return [
    values,
    setFormValue,
    setNameValue,
    setAllValues
  ] as [T,
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
      (name: string, value: any) => void,
      (values: T) => void
    ]
}
