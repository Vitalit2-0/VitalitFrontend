import { useEffect, useState } from "react"
import GradientButton from "../../helpers/GradientButton";
import { useModal } from "../../shared/PopupAlert";
import { stages } from "../../../constants/mentalHealth";
import CurrentActivity from "./CurrentActivity";
import useAuthStore from "../../../stores/AuthStore";
import { Create } from "../../../services/OpenAIService";
import { TextareaAutosize } from "@mui/material";
import NavigationManager from "../../../services/NavigationManager";
import { toast } from "react-toastify";
import { RegisterActivity } from "../../../services/ActivitiesServiceProvider";

function Activity({ activity, handleActivity, active=false } : { activity:any, handleActivity?:any, active?:boolean }) {
    
    const [stage, setStage] = useState(0);
    const [hidden, setHidden] = useState(true);
    const [opacity, setOpacity] = useState(false);
    const [countDown, setCountDown] = useState(600);
    const [recomendations, setRecomendations] = useState("");
    const [currentActivity, setCurrentActivity] = useState({});

    const user = useAuthStore((state:any) => state.user);
    const { showFullScreenLoader, openModal } = useModal();

    useEffect(() => {
        setStage(stages.choosingActivity);
        setTimeout(() => {
            setHidden(false);
        }, 1000);
    }, [activity]);

    useEffect(() => {
        setTimeout(() => {
            setOpacity(true);
        }, 1000);
    }, []);

    useEffect(() => {
        if(stage === stages.activityStarted)
        {
            const interval = setInterval(() => {
                if (countDown > 1) 
                {
                    setCountDown(countDown - 1);
                } 
                else
                {
                    clearInterval(interval);
                    restoreDefaultState(stages.activityFinished);
                    registerActivityFinished("Has completado tu meditación basada en imágenes");
                }
            }, 1000);
    
            return () => {
                clearInterval(interval);
            };
        }
    }, [stage, countDown]);

    const registerActivityFinished = (message:string) => {
        const register: ActivityDto = {
            activity_type: "activity",
            activity_date: new Date().toLocaleDateString('en-GB'),
            activity_hour: new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}),
            activity_detail: `${message}. ¡Felicidades!`
        }

        toast.success(`${message}. ¡Felicidades! 🎉`)
        
        RegisterActivity(user.token, register);
    }

    const handleStartActivity = async(id: number) => {
        showFullScreenLoader(true, "Regálanos un momento. ¡Estamos creando una actividad genial!");

        let activities: any = null;
        
        const createActivity = {
            type: (id === 0) ? "yoga" : (id === 1) ? "meditation" : "guided_images",
            recomendations: recomendations
        }
        
        activities = await Create(createActivity, user);
        
        if(createActivity.type === "yoga")
        {
            activities.data = {
                yogaPoses: activities.data
            }
        }

        if(createActivity.type === "meditation")
        {
            activities.data = {
                instructions: activities.data
            }
        }

        setStage(stages.activityStarted)
        setCurrentActivity({...activity, ...activities.data});
        showFullScreenLoader(false, "");
        
        setTimeout(() => {
            window.scrollTo(0, 10);
        }, 200);
    }

    const handleFinishActivity = async(stage: any) => {
        let confirm = await openModal("¡Atención!", "¿Estás seguro de que deseas terminar la actividad? Puedes iniciar de nuevo cuando quieras.");
    
        if(!confirm) return;

        restoreDefaultState(stage);
    }

    const restoreDefaultState = (stage: any) => {
        setStage(stage);
        setCurrentActivity({});
        setCountDown(600);
    }

    function handleRecomendations(e: any) {
        setRecomendations(e.target.value);
    }
    
    function handleShowActivity(id: number) {
        if(handleActivity){
            handleActivity(id);
            return;
        }
        NavigationManager.navigateTo("/mental-health");
    }

    return (
        <div className={`${active ? ((hidden) ? "invisible p-0" : "visible") : "w-full"}`}>
            {stage !== stages.activityStarted && <div className={`overflow-hidden transition-all`} onClick={() => handleShowActivity(activity.id)}>
                <div className={`overflow-hidden flex  ${active ? 'flex-col lg:flex-row' : 'flex-col'}`}>
                    {activity.video && <video className={`${active ? 'w-full lg:w-1/2' : 'w-full'} sm:rounded-lg mb-5 md:my-5 overflow-hidden transition-all ${(opacity && active || !active) ? "opacity-100" : "opacity-0"} transition-all duration-500`} loop autoPlay>
                        <source src={activity.video} type="video/mp4" />
                    </video>}
                    {activity.image && 
                    <div className={`${active ? 'lg:w-1/2' : 'w-full'} overflow-hidden h-full`}>
                        <img className={`sm:rounded-lg my-5 relative overflow-hidden w-full transition-all ${(opacity && active || !active) ? "opacity-100" : "opacity-0"} transition-all duration-500`} src={activity.image} alt="" />
                    </div>}
                    {stage !== stages.activityFinished && <div className={`${active ? ((hidden) ? "hidden" : "p-5 sm:px-10 w-full lg:w-1/2") : "w-full p-5"} ${(opacity && active || !active) ? "opacity-100" : "opacity-0"} transition-all duration-500 flex flex-col justify-center`}>
                        <div className="flex justify-between items-center mb-5 ">
                            <h2 className="font-bold color-dark-cyan text-2xl overflow-hidden transition-all">{activity.title}</h2>
                            <p className="px-5 py-2 bg-green-200 text-green-600 rounded-lg">{activity.time} min</p>
                        </div>
                        <p className={`overflow-hidden transition-all mb-5`}>
                            {activity.description}
                        </p>
                        {activity.id === 0 && active && 
                            <TextareaAutosize onChange={handleRecomendations} className="w-full h-20 p-2 mb-5" placeholder="¿Alguna recomendación?" />
                        }
                        {active && <GradientButton text="Comenzar" className="w-full base-gradient" onClick={() => handleStartActivity(activity.id)}/>}
                    </div>}
                    {stage === stages.activityFinished && 
                        <div className={`${active ? ((hidden) ? "hidden" : "p-5 sm:px-10 lg:w-1/2") : "w-full p-5"} ${(opacity && active || !active) ? "opacity-100" : "opacity-0"} transition-all duration-500 flex flex-col justify-center`}> 
                        <h2 className="font-bold mb-5 color-dark-cyan text-2xl overflow-hidden transition-all">{activity.title}</h2>
                        <div className="flex flex-col lg:flex-row lg:w-full items-center gap-5">
                            <img className="w-1/3 pb-5" src="assets/images/meditation-sit.png" alt="" />
                            <div>
                                <h2 className="font-bold mb-5 color-dark-cyan text-2xl overflow-hidden transition-all color-purple">¡Listo!</h2>
                                <p className={`overflow-hidden transition-all mb-5`}>
                                    ¡Has completado la actividad! Esperamos que te haya gustado. Recuerda que puedes intentar cualquier otra actividad cuando quieras.
                                </p>
                            </div>
                        </div>
                        <GradientButton text="Volver a hacer esta actividad" className="w-full base-gradient" onClick={() => handleStartActivity(activity.id)}/>
                    </div>}
                </div>
            </div>}
            {stage === stages.activityStarted && 
                <div className="w-full min-h-screen">
                    <CurrentActivity activity={currentActivity} handleFinishActivity={handleFinishActivity} setStage={setStage}/>
                </div>
            }
        </div>
    )
}

export default Activity