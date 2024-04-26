import { MenuItem, Select } from '@mui/material'

function GenderSelectHelper({ value, handleGenderSelectChange }: { value: string, handleGenderSelectChange: any }) {
    return (
        <Select
            labelId={"select-gender-label"}
            id={"select_gender"}
            label={"Género"}
            name={"gender"}
            value={value}
            onChange={handleGenderSelectChange}
        >
            <MenuItem key={0} value={'M'}>Masculino</MenuItem>
            <MenuItem key={1} value={'F'}>Femenino</MenuItem>
            <MenuItem key={2} value={'O'}>Otro</MenuItem>
        </Select>
    )
}

export default GenderSelectHelper