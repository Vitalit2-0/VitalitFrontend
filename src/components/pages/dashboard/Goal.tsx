import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react"
import GoalProgressBar from "./GoalProgressBar";
import { toast } from "react-toastify";
import { DeleteGoal, GetUserGoal, UpdateGoal } from "../../../services/GoalsServiceProvider";
import useAuthStore from "../../../stores/AuthStore";
import { CreateNotification } from "../../../services/ActivitiesServiceProvider";
import { MdDelete } from "react-icons/md";
import { useModal } from "../../shared/PopupAlert";
import { Tooltip } from "react-tooltip";


function Goal({goal, id}: any) {

    const [percentage, setPercentage] = useState(0);
    const [checks, setChecks] = useState<boolean[]>([]);
    const user = useAuthStore((state: any) => state.user);
    const { openModal } = useModal();

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
            
            setPercentage((goal.goal_achieved / goal.goal_target) * 100)
    
            if(goal.goal_target <= 12 && goal.goal_target > 0)
            {
                setChecks(Array.from({length: goal.goal_target}, (_, i) => i < goal.goal_achieved));
            }   
        }
    }

    const handleDeleteGoal = async() => {
        const confirm = await openModal("¿Estás seguro de que deseas eliminar este objetivo?");
        
        if (!confirm) return;
        
        const response = await DeleteGoal(user, goal.goal_id);
        console.log(response);
        if(response.data.data === 'ok') 
        {
            toast.success("Objetivo eliminado correctamente");
            window.location.reload();
        }
    }

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
        <div className="relative flex flex-col gap-3 items-center p-5 border border-solid rounded-xl my-3">
            <span>
                <MdDelete 
                    className="text-purple-500 text-2xl cursor-pointer absolute bottom-2 right-2" 
                    onClick={() => handleDeleteGoal()}
                />
            </span>
            <div 
                className="z-10 text-yellow-500 absolute top-2 right-2 bg-yellow-200 px-1 rounded-md" 
                onClick={() => handleDeleteGoal()}
            >
                <a 
                    className="text-yellow-500 hover:text-yellow-500" 
                    data-tooltip-id="info-tooltip" 
                    data-tooltip-variant="success" 
                    data-tooltip-content={"Este objetivo será revisado por un profesional"}
                >
                    <small>Pendiente por aprobación</small>
                </a>
                <Tooltip id="info-tooltip" place={"left"} />
            </div>
            <div className="w-full flex gap-5 justify-between items-center">
                <div>
                    <p>{goal.goal_name}</p>
                    <small className="text-purple-500">
                        {goal.goal_repeat === "diariamente" ? "Hoy" : (goal.goal_repeat === "semanalmente" ? "Esta semana" : "Este mes")} llevas {`${checks.filter((check) => check).length}/${goal.goal_target}`} {goal.goal_unit} 
                    </small>
                </div>
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