import { FaCirclePlay } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from "react";
import useAuthStore from "../stores/AuthStore";
import GradientButton from "../components/helpers/GradientButton";
import { getSurveyResults } from "../services/SurveyDataProvider";
import { CreateWorkoutPlan } from "../services/OpenAIService";
import WorkoutPlan from "../components/WorkoutPlan";
import { useModal } from "../components/PopupAlert";

function Workout() {

    const [workoutStarted, setWorkoutStarted] = useState<boolean>(false);
    const [workoutPlan, setWorkoutPlan] = useState<any>([]);
    const { openModal } = useModal();
    const user = useAuthStore((state: any) => state.user)

    useEffect(() => {
        CreateWorkoutRoutine();
    }, [])

    async function startWorkout(start: boolean) {
        if(!start) {
            let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas terminar el entrenamiento?, puedes volver a empezarlo en cualquier momento.");
    
            if(!confirm) return;
            setWorkoutStarted(start);
            window.location.reload();
        }   

        setWorkoutStarted(start);
    }
    
    async function CreateWorkoutRoutine() {
        const response: any = await getSurveyResults(user.id, user.token);
        const workout: any = [
            {
                "exerciseName": "Jumping Jacks",
                "equipment": "None",
                "sets": 2,
                "repetitions": 20,
                "type": "warming",
                "rest": 5
            },
            {
                "exerciseName": "High Knees",
                "equipment": "None",
                "sets": 2,
                "repetitions": 30,
                "type": "warming",
                "rest": 30
            },
            {
                "exerciseName": "Arm Circles",
                "equipment": "None",
                "sets": 2,
                "repetitions": 12,
                "type": "warming",
                "rest": 30
            },
            {
                "exerciseName": "Squats",
                "equipment": "None",
                "sets": 3,
                "repetitions": 15,
                "type": "workout",
                "rest": 60
            },
            {
                "exerciseName": "Push-ups",
                "equipment": "Mat",
                "sets": 3,
                "repetitions": 12,
                "type": "workout",
                "rest": 60
            },
            {
                "exerciseName": "Plank",
                "equipment": "Mat",
                "sets": 3,
                "repetitions": 30,
                "type": "workout",
                "rest": 60
            },
            {
                "exerciseName": "Hamstring Stretch",
                "equipment": "None",
                "sets": 2,
                "repetitions": 15,
                "type": "stretch",
                "rest": 30
            },
            {
                "exerciseName": "Shoulder Stretch",
                "equipment": "None",
                "sets": 2,
                "repetitions": 15,
                "type": "stretch",
                "rest": 30
            },
            {
                "exerciseName": "Quad Stretch",
                "equipment": "None",
                "sets": 2,
                "repetitions": 15,
                "type": "stretch",
                "rest": 30
            }
        ];
        // const requestRoutine = await CreateWorkoutPlan(response.data ? response.data : null);
        // console.log(requestRoutine.data);
        
        setWorkoutPlan(workout);
    }

    return (
        <div className="flex base-gray">
            <div className="w-full pb-10 ps-28 pe-10">
                <div className="flex items-start gap-5 relative">
                    <div className="w-1/3 bg-white rounded-3xl shadow-md mt-8 sticky top-0 p-4">
                        <p className="color-purple font-bold text-center bg-purple-200 p-3 rounded-xl">Recuerda que la constancia es la clave para lograr tus objetivos.</p>
                        <div className="mt-3 relative h-64 overflow-hidden rounded-xl">
                            <img className="w-full rounded-xl" src="assets/images/workout.webp" alt="" />
                            <div className="w-full h-full flex flex-col justify-between rounded-xl absolute top-0 right-0 left-0 bg-[rgba(0,0,0,0.4)]">
                                <h2 className="font-bold text-white text-xl mt-5 ms-5">Entrenamiento de hoy</h2>
                                <a className="w-12 mb-5 ms-5" onClick={() => startWorkout(!workoutStarted)} data-tooltip-id="start-tooltip" data-tooltip-variant="success" data-tooltip-content="Empecemos!">
                                    {!workoutStarted ? <FaCirclePlay className="text-white text-5xl cursor-pointer" /> :
                                    <FaStopCircle className="text-white text-5xl cursor-pointer" />}
                                </a>
                                <Tooltip id="start-tooltip" place={"right"} />
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3 bg-white rounded-3xl shadow-md mt-8 sticky top-0 p-4 h-[90vh]">
                        <WorkoutPlan workoutPlan={workoutPlan} workoutStarted={workoutStarted} startWorkout={startWorkout} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workout