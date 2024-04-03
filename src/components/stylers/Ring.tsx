function Ring({ width, strokewidth, color, top, right, bottom, left } : { width: string, strokewidth?:string, color: string, top?: string, right?: string, bottom?: string, left?: string}) {
    return (
        <svg className="absolute" viewBox="0 0 120 120" style={{width: width, height: width, top: top ? top : "auto", right: right ? right : "auto", bottom: bottom ? bottom : "auto", left: left ? left : "auto"}}>
            <circle cx="60" cy="60" r="50" fill="transparent" stroke={color} strokeWidth={strokewidth ? strokewidth : "5"} />
        </svg>
    
    )
}

export default Ring