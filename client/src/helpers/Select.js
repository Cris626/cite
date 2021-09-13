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
export function convertSelectable (data,label,value) {
    let i=0
    return data.map(e=>{
        let name=""
        return {
            label: Array.isArray(label)?label.map(i=>name=e[i]+" "):e[label],
            value: e[value],
            key: i++,
        }
    })
}