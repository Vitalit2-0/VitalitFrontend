import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react"
import GoalProgressBar from "./GoalProgressBar";
import { toast } from "react-toastify";
import { GetUserGoal, UpdateGoal } from "../../../services/GoalsServiceProvider";
import useAuthStore from "../../../stores/AuthStore";
import { CreateNotification } from "../../../services/ActivitiesServiceProvider";

function Goal({goal, id}: any) {

    const [percentage, setPercentage] = useState(0);
    const [checks, setChecks] = useState<boolean[]>([]);
    const user = useAuthStore((state: any) => state.user);

    useEffect(() => {
        GetCurrentGoal();
    }, [])

    useEffect(() => {
        CheckGoal();
    }, [percentage])

    const CheckGoal = async() => {
        const response = await GetUserGoal(user.token, user.id);
        
        if(response.data) 
        {
            const goals = response.data.data;
            
            goals[id].goal_achieved = checks.filter((check) => check).length;
            goals[id].last_modified = new Date();
            
            await UpdateGoal(user.token, goals[id], user.id, goals[id].goal_id);
        }
    }

    const GetCurrentGoal = async () => {
        const response = await GetUserGoal(user.token, user.id);
        
        if(response.data) 
        {
            const goals = response.data.data;
            
            if(goals[id].goal_repeat === "diariamente")
            {
                //compareDays(new Date(goals[id].last_modified));
            }
            console.log("g:",goal);
            setPercentage((goal.goal_achieved / goal.goal_target) * 100)
    
            if(goal.goal_target <= 12 && goal.goal_target > 0)
            {
                setChecks(Array.from({length: goal.goal_target}, (_, i) => i < goal.goal_achieved));
            }   
        }
    }

    // const compareDays = (date: Date) => {
    //     const today = new Date();
    //     const diffTime = Math.abs(today.getTime() - date.getTime());
    //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    //     if(diffDays >= 1)
    //     {
    //         let newChecks = [...checks];
    //         newChecks = newChecks.map((_) => false);
    //         setChecks(newChecks);
    //     }
    // }

    const handleProgress = (i:number) => {
        let newChecks = [...checks];
        newChecks[i] = !newChecks[i];
        setChecks(newChecks);

        let currentlyAchieved = newChecks.filter((check) => check).length;

        setPercentage((currentlyAchieved / goal.goal_target) * 100)

        if((currentlyAchieved / goal.goal_target) * 100 >= 100)
        {
            toast.success("¡Objetivo completado!");
            CreateNotification(user.token, "¡Objetivo completado!");
        }
    }

    return (
        <div className="flex flex-col gap-3 items-center p-5 border border-solid rounded-xl my-3">
            <div className="w-full flex gap-5 justify-between items-center">
                <p>{goal.goal_name}</p>
                <GoalProgressBar percentage={percentage}/>
            </div>
            <div className={`w-full grid ${goal.goal_target <= 12 && goal.goal_target > 0 ? `grid-cols-[${goal.goal_target}]` : "hidden"}`}>
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