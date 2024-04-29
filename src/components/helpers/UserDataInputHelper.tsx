import { TextField } from '@mui/material'
import { useEffect } from 'react'
import { calculateIMC } from '../../services/FitCalcProvider'

function UserDataInputHelper(props:any) {

    useEffect(() => {
        if(props.field === "height")
        {
            props.setUserData((prev: any) => ({ ...prev, imc: calculateIMC(props.userData.weight, props.value) }))
        }
        if(props.field === "weight")
        {
            props.setUserData((prev: any) => ({ ...prev, imc: calculateIMC(props.value, props.userData.height) }))
        }
    }, [props.value])

    function handleInput(event: React.ChangeEvent<HTMLInputElement>)
    {
        props.setUserData((prev: any) => ({ ...prev, [props.field]: event.target.value }))
        props.setQuestionsData({...props.questionsData, answer: [0]});
    }

    return (
        <TextField 
            className="w-1/3"
            id={`${props.field}-field`} 
            type={props.type} 
            value={props.value} 
            onInput={handleInput} 
            label={props.label} 
            variant="outlined" 
            inputProps={{ min: props.min, max: props.max, step: "1" }} />
    )
}

export default UserDataInputHelper