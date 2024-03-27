import React from 'react'
import { Radio, RadioGroup, Stack } from "@chakra-ui/react"

function RadioButtonHelper(props: any) {
    const [value, setValue] = React.useState('1')
    return (
        <RadioGroup onChange={setValue} value={value}>
            <Stack direction='row'>
                {props.Options.map((option: any) => {
                    return (
                        <Radio key={option.value} value={option.value}>{option.label}</Radio>
                    )
                })}
            </Stack>
        </RadioGroup>
    )
}

export default RadioButtonHelper