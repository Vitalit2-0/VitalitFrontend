
function ProgressBar({ percentage } : { percentage: number }) {
    return (
        <div className="progress-bar p-2">
            <span className="bar">
                <span className={`progress ${percentage === 100 ? "complete" : (percentage > 49 ? "half-complete" : "incomplete")}`} style={{width: `${percentage}%` }}></span>
            </span>
        </div>
    )
}

export default ProgressBar