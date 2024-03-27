import { Button } from "@mui/material"

function NavigationButton({ page, text, className } : { page: string, text : string, className?: string}) {
    return (
        <Button variant="contained" className={`btn btn-main ${className}`} onClick={() => navigateTo(page)}>{text}</Button>
    )
}

function navigateTo(page: string) {
    window.location.href = page;
}

export default NavigationButton