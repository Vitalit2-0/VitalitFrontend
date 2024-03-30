import { Button } from "@mui/material"

function DefaultButton({ text, className } : { text : string, className?: string}) {
    return (
        <Button variant="contained" className={`btn btn-main ${className}`} style={{height: "45px"}}>{text}</Button>
    )
}

export default DefaultButton