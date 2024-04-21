
function DefaultButton({ text, className, id, onclick } : { text : string, className?: string, id?: string, onclick?: () => void}) {
    return (
        <a 
            className={`btn btn-main ${className}`} 
            href={id}
            onClick={onclick}
        >
            {text}
        </a>
    )
}

export default DefaultButton