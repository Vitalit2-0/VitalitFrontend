function Dot({ width, position, className, color, top, right, bottom, left } : { width: string, position?: string, className?: string, color: string, top?: string, right?: string, bottom?: string, left?: string}) {
    return (
        <div className={`${position ? position : "absolute"} circular ${className}`} style={{width: width, height: width, background: color, top: (top) ? top : "auto", right: (right) ? right : "auto", bottom: (bottom) ? bottom : "auto", left: (left) ? left : "auto" }}></div>
    )
}

export default Dot