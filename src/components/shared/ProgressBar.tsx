import { useEffect } from "react"

function ProgressBar({ percentage } : { percentage: number }) {

    useEffect(() => {
    }, [percentage])

    return (
        <div className="progress-bar">
            <span className="bar">
                <span className={`progress ${percentage === 100 ? "complete" : (percentage > 49 ? "half-complete" : "incomplete")}`} style={{width: `${percentage}%` }}></span>
            </span>
        </div>
    )
}

export default ProgressBar