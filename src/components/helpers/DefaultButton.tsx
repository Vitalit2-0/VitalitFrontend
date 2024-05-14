
function DefaultButton({ text, className, onclick, submit } : { text : string, className?: string, onclick?: () => void, submit?: boolean }) {
    
    function handleClick(e:any) {
        e.preventDefault();
        onclick && onclick();
    }
    
    return (
        <a 
            className={`btn btn-main ${className}`} 
            onClick={handleClick}
            type={submit ? "submit" : "button"}
        >
            {text}
        </a>
    )
}

export default DefaultButton