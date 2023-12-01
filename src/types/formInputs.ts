import { Control, FieldValues, Path, PathValue } from 'react-hook-form'

export type FormInputControllerProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>
  control: Control<TFieldValues>
  type?: string
  placeholder?: string
  rows?: number
}
