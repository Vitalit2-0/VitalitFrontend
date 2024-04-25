import { MenuItem } from '@chakra-ui/react'
import { Select } from '@mui/material'
import React from 'react'

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
        </Select>
    )
}

export default GenderSelectHelper