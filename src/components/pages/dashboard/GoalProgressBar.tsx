import { useEffect } from 'react'

function GoalProgressBar({percentage} : {percentage: number}) {

    useEffect(() => {
        
    }, [percentage])

    return (
        <div className={`flex items-center`}>
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <div className="w-16 h-1">
                <div className="w-full h-full bg-gray-400">
                    <div className={`h-full bg-purple-500 transition-all`} style={{width: `${percentage}%`}}></div>
                </div>
            </div>
            <div className={`w-6 h-6 rounded-full ${percentage >= 100 ? "bg-purple-500" : "bg-gray-400"}`}></div>
        </div>
    )
}

export default GoalProgressBar