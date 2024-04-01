
function DefaultButton({ text, className, id } : { text : string, className?: string, id: string}) {
    return (
        <a className={`btn btn-main ${className}`} href={id}>{text}</a>
    )
}

export default DefaultButton