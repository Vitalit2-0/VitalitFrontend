import React, { useEffect } from "react";
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";
import { NotificationChecker } from "../services/NotificationChecker";
import Goal from "../components/pages/dashboard/Goal";
import UserNotes from "../components/shared/UserNotes";
import WorkoutShortcut from "../components/pages/workout/WorkoutShortcut";
import Activity from "../components/pages/mentalHealth/Activity";
import { activities } from "../constants/mentalHealth";
import GradientButton from "../components/helpers/GradientButton";
import { useModal } from "../components/shared/PopupAlert";
import { Create } from "../services/OpenAIService";
import { toast } from "react-toastify";
import { NotificationService } from "../services/NotificationDataProvider";
import { GetUserGoal, RegisterGoal } from "../services/GoalsServiceProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

function Home() {

    const auth = useAuthStore((state: any) => state);
    const checker = new NotificationChecker();
    const { openAddModal } = useModal();
    
    let history = useNavigate();
    const [queryParameters] = useSearchParams()
    const [goals, setGoals] = React.useState([]);

    React.useEffect(() => {
        let skippedSurvey = localStorage.getItem("skipSurvey");

        if(!auth.user.survey_answered && !skippedSurvey){
            setTimeout(() => {
                NavigationManager.navigateTo("/survey");
            }, 3000);
        }
    }, [])

    useEffect(() => {
        SyncUserNotifications();
    }, [])

    useEffect(() => {
        GetUserGoals();
    }, [])

    async function SyncUserNotifications() {
        let login = queryParameters.get("login");
        
        if(login) 
        {
            checker.checkNotification(auth.user);
        }
    }

    async function GetUserGoals() {
        const response = await GetUserGoal(auth.user.token, auth.user.id);
        
        if(response.data) 
        {
            console.log("r:",response.data.data);
            setGoals(response.data.data);
        }
    }

    async function handleCreateGoal() {
        const response = await openAddModal("goal");
        
        if(response.confirm) {
            const createGoal = {
                type: "goal",
                description: response.description
            }
            
            console.log(createGoal);
            const goal = await Create(createGoal, auth.user);

            if(goal.data)
            {
                const response = await RegisterGoal(auth.user.token, goal.data);

                if(response.code === "200")
                {
                    toast.success("Objetivo añadido correctamente");
                    return;
                }

                toast.error("Ocurrió un error, por favor intenta de nuevo");
            }

        }
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row min-h-screen gap-5 justify-center items-start base-gray md:ps-28 sm:p-10">
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <div className="bg-white rounded-3xl shadow-md p-5">
                        <h1 className="color-purple text-2xl">Tus objetivos</h1>
                        {goals.length === 0 ? 
                            <div className="flex justify-between items-center">
                                <p className="color-purple">No tienes objetivos aún</p> 
                                <GradientButton text="¡Crea uno!" className="base-gradient" onClick={() => handleCreateGoal()} />
                            </div>
                            : 
                            goals.map((goal: any, index: number) => {
                                return (
                                    <Goal goal={goal} id={index} key={index}/>
                                )
                            })
                        }
                    </div>
                    <div className="bg-white rounded-3xl shadow-md p-5">
                        <h1 className="text-2xl color-purple mb-5">Inicia con una nueva actividad</h1>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="p-5 rounded-lg base-gradient text-white sm:w-1/3 text-center cursor-pointer" onClick={() => NavigationManager.navigateTo("/workout")}>Entrenamiento</div>
                            <div className="p-5 rounded-lg base-gradient text-white sm:w-1/3 text-center cursor-pointer" onClick={() => NavigationManager.navigateTo("/mental-health")}>Salud mental</div>
                            <div className="p-5 rounded-lg base-gradient text-white sm:w-1/3 text-center cursor-pointer" onClick={() => NavigationManager.navigateTo("/nutrition")}>Nutrición</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-md p-5">
                        <WorkoutShortcut />
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <UserNotes />
                    <div className="bg-white rounded-3xl shadow-md p-5">
                        <Activity activity={activities.find((a) => a.id === 1)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home