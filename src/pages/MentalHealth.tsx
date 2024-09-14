import { useEffect, useState } from "react"
import Activity from "../components/pages/mentalHealth/Activity"
import { activities } from "../constants/mentalHealth"
import UserNotes from "../components/shared/UserNotes";
import PremiumBlock from "../components/shared/PremiumBlock";
import { VerifySession } from "../services/AuthStateProvider";
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";
import AIAssistant from "../components/shared/AIAssistant";
import { FaFaceAngry, FaFaceFrown, FaFaceGrinBeam, FaFaceTired, FaFaceLaughWink } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { Create } from "../services/OpenAIService";
import { toast } from "react-toastify";

function MentalHealth() {

    const user = useAuthStore((state: any) => state);
    const [mood, setMood] = useState("");
    const [recommendedActivity, setRecommendedActivity] = useState({} as any);
    const [sortedActivities, setSortedActivities] = useState({activities: activities, currentActivity: {} as any});

    useEffect(() => {
        VerifyUserSession();
    }, [])

    useEffect(() => {
        if(mood) GetRecommendation();
    }, [mood])

    async function VerifyUserSession() {
        const authenticated = await VerifySession(user.user.token);
        if(!authenticated)
        {
            user.logout();
            NavigationManager.navigateTo("/login");
        }
    }

    const handleActivity = (activity:number) => {
        const updatedItems = activities.map(item => {
            return item.id === activity ? { ...item, active: true } : item
        });
        
        setSortedActivities({
            activities: updatedItems.sort((a, b) => {
                if (a.active && !b.active) { return -1; }
                if (!a.active && b.active) { return 1; }
                return 0; 
            }),
            currentActivity: activities.find(act => act.id === activity) || {}
        })
        
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    }

    const handleMood = (mood:string) => {
        setMood(mood);
    }

    const GetRecommendation = async() => {
        const createActivity = {
            type: "recomendation",
            description: mood,
        }
        
        const response = await Create(createActivity, user);

        if(response.code !== "200")
        {
            toast.error("Ocurrió un error al intentar obtener la recomendación");
            return;
        }
        
        setRecommendedActivity(response.data);
    }

    return (
        <div className="flex flex-col min-h-screen gap-2 justify-start items-center base-gray">
            <AIAssistant section="mental" />
            <h1 className="font-bold w-full base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-0">Salud Mental</h1>
            <div className="w-full p-0 sm:p-10 md:ps-28">
                <div>
                    {recommendedActivity.activity ? 
                    <div className="text-left bg-white sm:rounded-3xl shadow-md flex flex-col gap-3 items-start justify-center p-5 mb-10">
                        <p className="text-2xl">
                            <strong className="text-purple-500">Nuestra recomendación</strong>: {recommendedActivity.activity}
                        </p>
                        <div>
                            <p>
                                <strong className="text-purple-500">Observaciones de nuestro asistente virutal: </strong>
                                {recommendedActivity.observation}
                            </p>
                        </div>
                        <div className="w-full p-5 bg-yellow-200 mb-2 border border-yellow-500 text-yellow-500 rounded-xl">
                            <p className="text-center font-bold">
                                Recuerda que las herramientas de salud mental (yoga, meditación e imágenes guiadas) son complementarias y no sustituyen el apoyo profesional. En caso de necesitar ayuda, no dudes en contactar a un especialista. 
                            </p>
                        </div>
                    </div> :
                    <div className="bg-white sm:rounded-3xl shadow-md flex flex-col items-center justify-center p-5 mb-10">
                        <p className="text-purple-500 text-2xl">¿Cómo te sientes en este momento?</p>
                        <div className="mt-5 flex gap-3">
                            <div>
                                <a onClick={() => handleMood("angry")} data-tooltip-id="angry-tooltip" data-tooltip-variant="light" data-tooltip-content={"Bravo"} className="cursor-pointer flex justify-center items-center w-10 h-10 bg-purple-500 rounded-full">
                                    <FaFaceAngry className="text-white text-xl"/>
                                </a>
                                <Tooltip id="angry-tooltip" place={"bottom"}  />
                            </div>
                            <div>
                                <a onClick={() => handleMood("sad")} data-tooltip-id="frown-tooltip" data-tooltip-variant="light" data-tooltip-content={"Triste"} className="cursor-pointer flex justify-center items-center w-10 h-10 bg-purple-500 rounded-full">
                                    <FaFaceFrown className="text-white text-xl"/>
                                </a>
                                <Tooltip id="frown-tooltip" place={"bottom"}  />
                            </div>
                            <div>
                                <a onClick={() => handleMood("frustrated")} data-tooltip-id="tired-tooltip" data-tooltip-variant="light" data-tooltip-content={"Frustrado"} className="cursor-pointer flex justify-center items-center w-10 h-10 bg-purple-500 rounded-full">
                                    <FaFaceTired className="text-white text-xl"/>
                                </a>
                                <Tooltip id="tired-tooltip" place={"bottom"}  />
                            </div>
                            <div>
                                <a onClick={() => handleMood("happy")} data-tooltip-id="happy-tooltip" data-tooltip-variant="light" data-tooltip-content={"Feliz"} className="cursor-pointer flex justify-center items-center w-10 h-10 bg-purple-500 rounded-full">
                                    <FaFaceGrinBeam className="text-white text-xl"/>
                                </a>
                                <Tooltip id="happy-tooltip" place={"bottom"}  />
                            </div>
                            <div>
                                <a onClick={() => handleMood("relax")} data-tooltip-id="relax-tooltip" data-tooltip-variant="light" data-tooltip-content={"Tranquilo"} className="cursor-pointer flex justify-center items-center w-10 h-10 bg-purple-500 rounded-full">
                                    <FaFaceLaughWink className="text-white text-xl"/>
                                </a>
                                <Tooltip id="relax-tooltip" place={"bottom"}  />
                            </div>
                        </div>
                        <p className="pt-5">
                        ¡Te recomendaremos una actividad acorde a tu estado de ánimo!
                        </p>
                    </div>}
                </div>
                <div className={`${sortedActivities.currentActivity.title ? "w-full h-auto" : "w-0 h-0"} overflow-hidden bg-white sm:rounded-3xl shadow-md transition-all duration-1000`}>
                    <Activity key={sortedActivities.activities.findIndex(act => act.active)} active={true} activity={sortedActivities.currentActivity} handleActivity={handleActivity} />
                </div>
                <h2 className={`${sortedActivities.currentActivity.title ? "h-16 mt-10" : "h-0"} overflow-hidden w-full text-2xl font-bold color-dark-cyan transition-all duration-1000`}>¡Prueba una actividad diferente!</h2>
                <div className={`flex-col lg:flex-row flex items-start w-full gap-10 relative`}>
                    <div className={`w-full lg:w-1/2 flex flex-col gap-5 transition-all cursor-pointer`}>
                        {
                            Array.from(sortedActivities.activities).map((act, index) => {
                                if(act.id === 2) return(
                                    <PremiumBlock feature={act.title} >
                                        <div className={`transition-all overflow-hidden bg-white sm:rounded-3xl shadow-md`}>
                                            <Activity key={index} activity={act} handleActivity={handleActivity} />
                                        </div>
                                    </PremiumBlock>
                                )
                                return (!act.active && 
                                    <div className={`transition-all overflow-hidden bg-white sm:rounded-3xl shadow-md`}>
                                        <Activity key={index} activity={act} handleActivity={handleActivity} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="lg:w-1/2 sticky top-10">
                        <UserNotes />
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default MentalHealth