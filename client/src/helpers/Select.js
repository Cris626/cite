import Select from 'react-select';

export function SelectField(FieldProps) {
    return (
        <Select
            options={FieldProps.options}
            {...FieldProps.options}
            // onChange={option => FieldProps.form.setFieldValue(FieldProps.field.name, option)}
            onChange={option => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)}
            // defaultValue={FieldProps.options[0]}
        />
    )
}