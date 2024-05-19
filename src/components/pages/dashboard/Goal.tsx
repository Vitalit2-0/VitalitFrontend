import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react"
import GoalProgressBar from "./GoalProgressBar";
import { toast } from "react-toastify";

function Goal({goal, id}: any) {

    const [percentage, setPercentage] = useState(0);
    const [checks, setChecks] = useState<boolean[]>([]);

    useEffect(() => {
        const goals = JSON.parse(localStorage.getItem("goals") || "[]");
        
        if(goals[id].repeat === "diariamente")
        {
            compareDays(new Date(goals[id].last_modified));
        }

        setPercentage((goal.currently_achieved / goal.target) * 100)

        if(goal.target <= 12 && goal.target > 0)
        {
            setChecks(Array.from({length: goal.target}, (_, i) => i < goal.currently_achieved));
        }   
    }, [])

    useEffect(() => {
        const goals = JSON.parse(localStorage.getItem("goals") || "[]");
        
        goals[id].currently_achieved = checks.filter((check) => check).length;
        goals[id].last_modified = new Date();

        localStorage.setItem("goals", JSON.stringify(goals));
    }, [percentage])

    const compareDays = (date: Date) => {
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        if(diffDays >= 1)
        {
            let newChecks = [...checks];
            newChecks = newChecks.map((_) => false);
            setChecks(newChecks);
        }
    }

    const handleProgress = (i:number) => {
        let newChecks = [...checks];
        newChecks[i] = !newChecks[i];
        setChecks(newChecks);

        let currentlyAchieved = newChecks.filter((check) => check).length;

        setPercentage((currentlyAchieved / goal.target) * 100)

        if((currentlyAchieved / goal.target) * 100 >= 100)
        {
            toast.success("¡Objetivo completado!");
        }
    }

    return (
        <div className="flex flex-col gap-3 items-center p-5 border border-solid rounded-xl my-3">
            <div className="w-full flex gap-5 justify-between items-center">
                <p>{goal.goal}</p>
                <GoalProgressBar percentage={percentage}/>
            </div>
            <div className={`w-full grid ${goal.target <= 12 && goal.target > 0 ? `grid-cols-[${goal.target}]` : "hidden"}`}>
                <div className="w-full flex gap-1 items-center justify-start">
                    <span className="color-purple">Conteo:</span>
                    {
                        Array.from({length: checks.length}, (_, i) => {
                            return(
                                <Checkbox 
                                    className={`w-4 h-4`} 
                                    key={i} 
                                    checked={checks[i]}
                                    onClick={() => handleProgress(i)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Goal