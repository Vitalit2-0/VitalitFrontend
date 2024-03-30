import { Button } from "@mui/material"

function GradientButton({ text, onClick, className } : { text : string, onClick: any, className?: string}) {
    return (
        <Button variant="contained" className={`btn btn-main ${className}`} onClick={onClick}>{text}</Button>
    )
}

export default GradientButton