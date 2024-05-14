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
import { focusOptions, stages } from "../constants/workout";
import MultipleChoiceButton from "../components/helpers/MultipleChoiceButton";
import { TextareaAutosize } from "@mui/material";

function Workout() {
    const [stage, setStage] = useState<number>(stages.choosingFocus);
    const [place, setPlace] = useState<string>("En casa");
    const [recomendations, setRecomendations] = useState("");
    const [workoutPlan, setWorkoutPlan] = useState<any>([]);
    const [error, setError] = useState<boolean>(false);
    const { openModal, showNotification, showFullScreenLoader } = useModal();
    const user = useAuthStore((state: any) => state.user)

    useEffect(() => {
        const workoutAlreadyCompleted = localStorage.getItem("workoutComplete");
        //TODO: Add workout to user history. Service is not implemented yet.
        if(workoutAlreadyCompleted)
        {
            setStage(stages.workoutFinished);
            return;
        }
    }, [])

    async function startWorkout(start: boolean, restart?: boolean) {
        if(!start) {
            let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas terminar el entrenamiento?, puedes volver a empezarlo en cualquier momento.");
    
            if(!confirm) return;
            setStage(stages.choosingFocus);
            window.location.reload();
            return;
        }   

        if(restart) 
        {
            localStorage.removeItem("workoutComplete");
            setStage(stages.choosingFocus);
            window.location.reload();
            return;
        }

        setStage(stages.workoutStarted);
    }
    
    async function CreateWorkoutRoutine(focus: string) {
        
        showFullScreenLoader(true, "Regálanos un momento. Estamos creando la rutina perfecta para ti.");
        const survey: any = await getSurveyResults(user.id, user.token);
        const workout = await CreateWorkoutPlan(survey.data ? survey.data : null, place, recomendations, focus, user.token);

        if(!workout.data)
        {
            showNotification("¡Lo sentimos! Ha ocurrido un error al cargar tu entrenamiento, por favor intenta de nuevo en un minuto.", "error");
            setError(true);
            showFullScreenLoader(false, "");
            return;
        }

        setWorkoutPlan(workout.data);
        setStage(stages.routineReady);
        showFullScreenLoader(false, "");
    }

    function handleFocus(focusId: number) {
        CreateWorkoutRoutine(focusOptions.find((f: any) => f.id === focusId)?.name || "");
    }

    function handlePlaceChange(place: string) {
        setPlace(place);
    }

    function handleRecomendations(e: any) {
        setRecomendations(e.target.value);
    }

    return (
        <div className="flex base-gray min-h-screen">
            <div className="w-full pb-10 p-10 md:ps-28">
                <div className="flex flex-col lg:flex-row items-start gap-5 relative">
                    {stage !== stages.choosingFocus &&<div className={`w-full lg:w-1/3 p-4 bg-white rounded-3xl shadow-md lg:sticky top-8 transition-all`}>
                        <div>
                            <p className="color-purple font-bold text-center bg-purple-200 p-3 rounded-xl">Recuerda que la constancia es la clave para lograr tus objetivos.</p>
                            <div className="mt-3 relative h-64 overflow-hidden rounded-xl">
                                <img className="w-full rounded-xl" src="assets/images/workout.webp" alt="" />
                                <div className="w-full h-full flex flex-col justify-between rounded-xl absolute top-0 right-0 left-0 bg-[rgba(0,0,0,0.4)]">
                                    <h2 className="font-bold text-white text-xl mt-5 ms-5">Entrenamiento de hoy</h2>
                                    <a className="w-12 mb-5 ms-5" onClick={() => startWorkout(stage === stages.workoutStarted ? false : true)} data-tooltip-id="start-tooltip" data-tooltip-variant="success" data-tooltip-content="Empecemos!">
                                        {stage !== stages.workoutStarted ? <FaCirclePlay className="text-white text-5xl cursor-pointer" /> :
                                        <FaStopCircle className="text-white text-5xl cursor-pointer" />}
                                    </a>
                                    <Tooltip id="start-tooltip" place={"right"} />
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div id="workout-section" className={`${stage !== stages.choosingFocus ? 'w-full lg:w-2/3' : 'w-full'} sticky top-0 min-h-[90vh] flex items-start`}>
                        {stage === stages.choosingFocus &&
                            <div className='w-full h-full gap-5 flex flex-col md:flex-row justify-start items-start'>
                                <div className="md:w-1/2 lg:w-1/3 p-5 bg-white rounded-3xl shadow-md">
                                    <p className="color-purple font-bold text-center bg-purple-200 p-3 mb-5 rounded-xl">Recuerda que la constancia es la clave para lograr tus objetivos.</p>
                                    <h1 className="font-bold text-2xl mb-8 text-left color-dark-cyan">Hoy entrenaré:</h1>
                                    <MultipleChoiceButton options={["En casa", "En el gimnasio"]} onChange={handlePlaceChange} />
                                    <h3 className="mb-8 text-left color-dark-cyan mt-10"><span className="color-purple">¿Alguna recomendación especifica antes de crear tu rutina?</span>Ten en cuenta que tus respuestas a la encuesta serán tenidas en cuenta</h3>
                                    <TextareaAutosize onChange={handleRecomendations} className="w-full p-3 rounded-xl" placeholder="Escribe aquí tus recomendaciones" />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-2/3 p-5 bg-white rounded-3xl shadow-md">
                                    <h1 className="font-bold text-2xl mb-4 text-left color-dark-cyan">¿Que te gustaría entrenar hoy?</h1>
                                    <p className="mb-4">Has click en el enfoque que quieres tener hoy para iniciar tu rutina!</p>
                                    <div className="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                                        {
                                            Array.from(focusOptions).map((focus: any) => {
                                                return (
                                                    <div key={focus.id} className="w-full flex flex-col items-center">
                                                        <div className="w-full relative rounded-xl overflow-hidden choose-workout-card">
                                                            <div className="w-full h-52 overflow-hidden flex justify-center">
                                                                <img className="w-full object-cover" src={focus.image} alt={focus.name} />
                                                            </div>
                                                            <div onClick={() => handleFocus(focus.id)} className={`flex w-full font-bold choose-workout-card_hover cursor-pointer flex-col justify-center rounded-xl absolute bottom-0 right-0 left-0 px-5 py-3 bg-[rgba(0,0,0,0.6)]`}>
                                                                <h2 className="text-white text-md text-center">{focus.name}</h2>
                                                                <div className={`text-white gap-5 justify-center items-center choose-workout-card_info`}>
                                                                    <a className="w-12 mt-5" onClick={() => setStage(stages.creatingRoutine)} >
                                                                        <FaCirclePlay className="text-white text-5xl cursor-pointer" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        {stage === stages.routineReady &&
                            <div className='h-full flex items-center bg-white rounded-3xl shadow-md'>
                                <div className='p-10 lg:p-32 flex flex-col justify-center'>
                                    <div className='flex gap-10 flex-col lg:flex-row items-center'>
                                        <img className='w-1/2 lg:w-1/3' src="assets/images/ready-start.webp" alt="" />
                                        <div>
                                            <h1 className="text-2xl font-bold color-dark-cyan">Aqui está tu plan de entrenamiento de hoy!</h1>
                                            <p className="mt-3 mb-3 pt-3 pb-3 rounded-xl">
                                                {user.survey_answered ? "Disfruta este entrenamiento creado por inteligencia artificial especialmente para ti, basado en tus intereses y gustos." :
                                                                "Disfruta este entrenamiento general creado por inteligencia artificial. Completa la encuesta inicial para que puedas recibir tu entrenamiento personalizado."}
                                                <span className='ms-1 color-purple font-bold'>¿Estás preparad@?</span>
                                            </p>
                                        </div>
                                    </div>
                                    {!error ? <GradientButton className="base-gradient w-full" text="Comenzar" onClick={() => startWorkout(stage === stages.workoutStarted ? false : true)} /> :
                                    <GradientButton className="base-gradient w-full" text="Intentar de nuevo" onClick={() => startWorkout(true, true)} />}
                                </div>
                            </div>
                        }
                        {stage === stages.workoutStarted &&
                            <WorkoutPlan workoutPlan={workoutPlan} stage={stage} setStage={setStage} />
                        }
                        {stage === stages.workoutFinished &&
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
                                    <GradientButton className="base-gradient w-full" text="Comenzar nuevo entrenamiento" onClick={() => startWorkout(stage === stages.workoutStarted ? false : true, true)} />
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