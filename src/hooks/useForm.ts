import { useState, ChangeEvent } from 'react';


export const useForm = <T>(initialValues: T) => {

  const [values, setValues] = useState(initialValues);

  return [
    values,
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      })
    },
    (name, value) => {
      setValues({ ...values, [name]: value })
    }
  ] as [T, (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, (name: string, value: any) => void]
}
