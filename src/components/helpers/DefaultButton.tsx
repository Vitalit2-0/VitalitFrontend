
function DefaultButton({ text, className, id, onclick, submit } : { text : string, className?: string, id?: string, onclick?: () => void, submit?: boolean }) {
    return (
        <a 
            className={`btn btn-main ${className}`} 
            href={id}
            onClick={onclick}
            type={submit ? "submit" : "button"}
        >
            {text}
        </a>
    )
}

export default DefaultButton