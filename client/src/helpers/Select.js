import Select from 'react-select';

export function SelectField(FieldProps) {
    return (
        <Select
            options={FieldProps.options}
            {...FieldProps.field}
            onChange={option => FieldProps.form.setFieldValue(FieldProps.field.name, option)}
        />
    )
}