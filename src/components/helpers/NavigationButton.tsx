import { Button } from "@mui/material"

function NavigationButton({ page, text } : { page: string, text : string}) {
    return (
        <Button variant="contained" className="btn btn-main" onClick={() => navigateTo(page)}>{text}</Button>
    )
}

function navigateTo(page: string) {
    window.location.href = page;
}

export default NavigationButton