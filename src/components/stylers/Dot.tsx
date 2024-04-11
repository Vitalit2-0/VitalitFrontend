function Dot({ width, className, color, top, right, bottom, left } : { width: string, className?: string, color: string, top?: string, right?: string, bottom?: string, left?: string}) {
    return (
        <div className={`absolute circular ${className}`} style={{width: width, height: width, background: color, top: (top) ? top : "auto", right: (right) ? right : "auto", bottom: (bottom) ? bottom : "auto", left: (left) ? left : "auto" }}></div>
    )
}

export default Dot