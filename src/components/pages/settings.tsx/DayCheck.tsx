import { Checkbox, FormControlLabel } from '@mui/material'
import { useEffect, useState } from 'react'

function DayCheck({ selectedData, section, handleCheckboxChange, day } : { selectedData: any, section: string, handleCheckboxChange: any, day: string }) {
    
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(selectedData[section]?.days?.includes(day))
    }, [selectedData, section])
    
    return (
        <FormControlLabel
            value={day}
            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
            label={day.charAt(0).toUpperCase()}
            labelPlacement="top"
            style={{ marginRight: 0 }} 
            checked={checked}
        />
    )
}

export default DayCheck