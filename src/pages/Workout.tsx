import { FaCirclePlay } from "react-icons/fa6";
import { FaStopCircle } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import { useEffect, useState } from "react";
import useAuthStore from "../stores/AuthStore";
import GradientButton from "../components/helpers/GradientButton";
import { getSurveyResults } from "../services/SurveyDataProvider";
import { CreateWorkoutPlan } from "../services/OpenAIService";
import WorkoutPlan from "../components/pages/workout/WorkoutPlan";
import { useModal } from "../components/shared/PopupAlert";
import { SearchImages } from "../services/UnsPlashImagesProvider";

function Workout() {

    const [workoutStarted, setWorkoutStarted] = useState<boolean>(false);
    const [workoutFinished, setWorkoutFinished] = useState<boolean>(false);
    const [workoutPlan, setWorkoutPlan] = useState<any>([]);
    const [error, setError] = useState<boolean>(false);
    const { openModal, showNotification, showFullScreenLoader } = useModal();
    const user = useAuthStore((state: any) => state.user)

    useEffect(() => {
        SearchImages("saltos de tijera");
        const workoutAlreadyCompleted = localStorage.getItem("workoutComplete");
        //TODO: Add workout to user history. Service is not implemented yet.
        if(workoutAlreadyCompleted)
        {
            setWorkoutFinished(true);
            return;
        }

        CreateWorkoutRoutine();
    }, [])

    async function startWorkout(start: boolean, restart?: boolean) {
        if(!start) {
            let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas terminar el entrenamiento?, puedes volver a empezarlo en cualquier momento.");
    
            if(!confirm) return;
            setWorkoutStarted(false);
            window.location.reload();
        }   

        if(restart) 
        {
            localStorage.removeItem("workoutComplete");
            window.location.reload();
        }

        setWorkoutStarted(true);
    }
    
    async function CreateWorkoutRoutine() {

        showFullScreenLoader(true);
        const response: any = await getSurveyResults(user.id, user.token);
        const workout = await CreateWorkoutPlan(response.data ? response.data : null);

        console.log(workout.data);
        
        if(!workout.data)
        {
            showNotification("¡Lo sentimos! Ha ocurrido un error al cargar tu entrenamiento, por favor intenta de nuevo en un minuto.", "error");
            setError(true);
            showFullScreenLoader(false);
            return;
        }

        setWorkoutPlan(workout.data);
        showFullScreenLoader(false);
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
                                <a className="w-12 mb-5 ms-5" href="#workout-section" onClick={() => startWorkout(!workoutStarted)} data-tooltip-id="start-tooltip" data-tooltip-variant="success" data-tooltip-content="Empecemos!">
                                    {!workoutStarted ? <FaCirclePlay className="text-white text-5xl cursor-pointer" /> :
                                    <FaStopCircle className="text-white text-5xl cursor-pointer" />}
                                </a>
                                <Tooltip id="start-tooltip" place={"right"} />
                            </div>
                        </div>
                    </div>
                    <div id="workout-section" className="w-2/3 bg-white rounded-3xl shadow-md mt-8 sticky top-0 min-h-[90vh] flex items-center">
                        {!workoutStarted && !workoutFinished &&
                            <div className='h-full flex items-center'>
                                <div className='p-32 flex flex-col justify-center'>
                                    <div className='flex items-center'>
                                        <img className='w-4/12 mr-10' src="assets/images/ready-start.webp" alt="" />
                                        <div>
                                            <h1 className="text-2xl font-bold text-[#374151]">Aqui está tu plan de entrenamiento de hoy!</h1>
                                            <p className="mt-3 mb-3 pt-3 pb-3 rounded-xl">
                                                {user.survey_answered ? "Disfruta este entrenamiento creado por inteligencia artificial especialmente para ti, basado en tus intereses y gustos." :
                                                                "Disfruta este entrenamiento general creado por inteligencia artificial. Completa la encuesta inicial para que puedas recibir tu entrenamiento personalizado."}
                                                <span className='ms-1 color-purple font-bold'>¿Estás preparad@?</span>
                                            </p>
                                        </div>
                                    </div>
                                    {!error ? <GradientButton className="base-gradient w-full" text="Comenzar" onClick={() => startWorkout(!workoutStarted)} /> :
                                    <GradientButton className="base-gradient w-full" text="Intentar de nuevo" onClick={() => CreateWorkoutRoutine()} />}
                                </div>
                            </div>
                        }
                        {workoutStarted && !workoutFinished &&
                            <WorkoutPlan workoutPlan={workoutPlan} workoutFinished={workoutFinished} workoutStarted={workoutStarted} setWorkoutFinished={setWorkoutFinished} setWorkoutStarted={setWorkoutStarted} />
                        }
                        {workoutFinished &&
                            <div className="flex h-full items-center">
                                <div className='p-10 ps-32 pe-32 flex flex-col justify-center'>
                                    <div className='text-center'>
                                        <h1 className="text-2xl font-bold text-[#374151]">¡Felicitaciones!</h1>
                                        <img className='mx-auto w-2/5' src="assets/images/train-success.webp" alt="" />
                                        <div className='mt-3 mb-3 '>
                                            <p className="rounded-xl">Has terminado tu entrenamiento de hoy.  
                                                <span className='ms-1 color-purple font-bold'>¡Buen trabajo!</span>
                                            </p>
                                            <p>En caso de que lo desees, puedes realizar otro entrenamiento</p>
                                        </div>
                                    </div>
                                    <GradientButton className="base-gradient w-full" text="Comenzar nuevo entrenamiento" onClick={() => startWorkout(!workoutStarted, true)} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workout