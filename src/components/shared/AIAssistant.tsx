import { useEffect, useState } from "react";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { Create } from "../../services/OpenAIService";
import useAuthStore from "../../stores/AuthStore";
import { toast } from "react-toastify";
import { recomendations } from "../../constants/aiAssistant";
import { GetHistory } from "../../services/ActivitiesServiceProvider";
import { getSurveyResults } from "../../services/SurveyDataProvider";

function AIAssistant({ section } : { section : string}) {
    const user = useAuthStore((state:any) => state.user);
    const [hidden, setHidden] = useState(true);
    const [hideDialig, setHideDialog] = useState(true);
    const [question, setQuestion] = useState("");
    const [suggestions, setSuggestions] = useState([] as string[]);
    const [conversationActive, setConversationActive] = useState(false);
    const [messages, setMessages] = useState([] as string[]);

    useEffect(() => {
        setTimeout(() => {
            setHideDialog(false);
        }, 3000)

        setTimeout(() => {
            setHideDialog(true);
        }, 8000)

        handleSection();
    }, [])

    useEffect(() => {
        handleMessager();
    }, [messages])

    const handleSection = () => {
        if(section === "workout")
        {
            setSuggestions([
                "¿Que grupo muscular debo hacer hoy?",
                "¿Debo entrenar en casa o en el gimnasio?",
            ])
        }
        else if(section === "nutrition")
        {
            setSuggestions([
                "¿Qué debo comer en el desayuno?",
                "¿Qué debo comer en el almuerzo?",
                "¿Qué debo comer en la cena?",
            ])
        }
        else if(section === "mental")
        {
            setSuggestions([
                "¿Qué actividad puedo hacer para relajarme?",
                "¿Qué actividad puedo hacer para mejorar mi estado de ánimo?",
            ])
        }
    }

    const getRecomendations = async(section: string) => {
        
        const history = await getHistoryActivities();
        const survey = await getSurvey();
        const observations : any = recomendations;

        if(section === "workout") observations[section].history = history;

        observations[section].survey = survey;

        return JSON.stringify(observations[section]);
    }

    const getSurvey = async() => {
        const response = await getSurveyResults(user);
        
        if(!response.data)
        {
            toast.error("Ocurrió un error al intentar obtener los resultados de la encuesta inicial");
            return [];
        }

        return response.data;
    }

    const getHistoryActivities = async() => {
        const response = await GetHistory(user.token, "sf");

        if(!response.data.data)
        {
            toast.error("Ocurrió un error al intentar obtener el historial de actividades");
            return [];
        }

        const orderedData = response.data.data.sort((a:any, b:any) => {
            const dateA = new Date(a.activity_date);
            const dateB = new Date(b.activity_date);
            return dateA.getTime() - dateB.getTime();
        });

        const historyElements = orderedData.slice(0, 3);
        
        const historyProperties = historyElements.map((e: any) => ({
            activity_date: e.activity_date,
            activity_detail: e.activity_detail
        }));

        return historyProperties;
    }

    const handleMessager = async() => {
        if(messages.length === 1){
            const createActivity = {
                type: "question",
                description: question,
                section: section,
                recomendations: await getRecomendations(section)
            }
            
            const response = await Create(createActivity, user);
            
            if(response.code !== "200")
            {
                toast.error("Ocurrió un error al intentar obtener la respuesta");
                return;    
            }
            
            setMessages([...messages, response.data.answer]);
            setQuestion("");
        }
    }

    const handleAskQuestion = async(question : string) => {
        setConversationActive(true);
        setQuestion(question);
        setMessages([question]);
    }   

    return (
        <div className={`${hideDialig ? "w-16 h-16" : "w-[380px] h-16"} ${hidden ? "w-16 h-16" : "w-[380px] h-screen md:h-96"} transition-all fixed bottom-20 right-0 md:bottom-10 md:right-10 z-10`}>
            <div className={`${hideDialig || !hidden ? "w-0" : "w-72 p-2"} opacity-0 md:opacity-100 base-gradient text-white transition-all fixed rounded-xl  h-16 shadow-2xl`}>
                <p className={hideDialig ? "opacity-0" : "opacity-100"} >¿No sabes por dónde empezar? <strong>¡Pregúntame!</strong></p>
            </div>
            <div className={`${hidden ? "w-0 h-0" : "w-full md:w-72 h-screen md:h-96"} overflow-hidden transition-all fixed z-10 rounded-xl shadow-2xl bg-white md:bottom-10 bottom-0 right-0 md:right-32`}>
                <div className="h-full w-[calc(100%-64px)] md:w-72 p-4 flex flex-col justify-end gap-2">
                    <div className="overflow-scroll flex flex-col gap-2">
                        {!conversationActive ?
                            suggestions.map((suggestion, index) => (
                                <div key={index} 
                                    className="w-full border border-gray-200 rounded-lg p-2 h-16 flex justify-center items-center cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleAskQuestion(suggestion)}
                                >
                                    <p>{suggestion}</p>
                                </div>
                            )) :
                            messages.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`${index % 2 !== 0 ? "bg-purple-500 text-white" : ""} w-full h-auto border border-gray-200 rounded-lg p-2`}
                                >
                                    <p>{message}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex justify-start md:justify-center gap-2 h-16">
                        <input 
                            type="text" 
                            placeholder="¡Preguntame!" 
                            className="w-[calc(100%-64px)] md:w-56 border-2 bg-white border-gray-300 rounded-xl focus:outline-none focus:border-blue-300"
                            value={question}
                            onInput={(e) => setQuestion(e.currentTarget.value)}
                        />
                        <span 
                            className="flex items-center cursor-pointer"
                            onClick={() => handleAskQuestion(question)}
                        >
                            <IoSend className="text-2xl text-purple-500 m-auto" />
                        </span>
                    </div>
                </div>
            </div>
            <div onClick={() => setHidden(!hidden)} className="fixed flex justify-center items-center cursor-pointer z-10 rounded-full w-16 h-16 base-gradient bottom-20 right-2 md:bottom-10 md:right-10">
                <MdFaceRetouchingNatural className="text-4xl text-white m-auto" />
            </div>
        </div>
    )
}

export default AIAssistant