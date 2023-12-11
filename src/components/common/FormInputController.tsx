import React from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import { FormControl, Box, TextField } from '@mui/material'
import { FormInputControllerProps } from 'types/formInputs'

const FormInputController = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  defaultValue,
  type,
  placeholder,
  rows
}: FormInputControllerProps<TFieldValues>) => {
  console.log(type)

  return (
    <Box>
      <FormControl sx={{ width: 400 }} variant='outlined' margin='normal' fullWidth>
        <Controller
          name={name}
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id={name}
              type={type}
              InputProps={{
                inputProps: {
                  type: { type }
                }
              }}
              placeholder={placeholder}
              className='form-control'
              multiline
              rows={rows}
            />
          )}
        />
      </FormControl>
    </Box>
  )
}

export default FormInputController
