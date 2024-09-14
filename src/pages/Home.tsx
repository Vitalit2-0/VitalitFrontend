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
import { GetUserGoal } from "../services/GoalsServiceProvider";
import { useSearchParams } from "react-router-dom";
import MonthGraph from "../components/pages/insights/MonthGraph";
import { VerifySession } from "../services/AuthStateProvider";

function Home() {

    const auth = useAuthStore((state: any) => state);
    const checker = new NotificationChecker();
    const { openAddModal } = useModal();
    
    const [queryParameters] = useSearchParams()
    const [goals, setGoals] = React.useState([]);

    React.useEffect(() => {
        if(!auth.user.survey_answered){
            NavigationManager.navigateTo("/survey");
        }
    }, [])

    useEffect(() => {
        SyncUserNotifications();
    }, [])

    useEffect(() => {
        GetUserGoals();
    }, [])

    useEffect(() => {
        VerifyUserSession();
    }, [])

    async function VerifyUserSession() {
        const authenticated = await VerifySession(auth.user.token);
        
        if(!authenticated)
        {
            console.log("Session expired");
            auth.logout();
            NavigationManager.navigateTo("/login");
        }
    }

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
            const goals = response.data.data;

            Array.from(goals).map((goal: any) => {
                console.log(ResetGoal(goal));
                if(ResetGoal(goal)){
                    goal.goal_achieved = 0;
                }
                return goal;
            })
            console.log(goals);
            setGoals(response.data.data || []);
        }
    }

    function ResetGoal(goal:any) {
        const today = new Date();
        const goalLastModified = parseDate(goal.goal_last_modified);
        const goalRepeat = goal.goal_repeat;

        if (goalRepeat === "diariamente") return today.getDate() !== goalLastModified.getDate();
        if (goalRepeat === "semanalmente") return today.getDay() !== goalLastModified.getDay();
        if (goalRepeat === "mensualmente") return today.getMonth() !== goalLastModified.getMonth();

        return false;
    }

    function parseDate(input:string) {
        const parts = input.split('-');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-based in JS
        const year = parseInt(parts[2], 10);
    
        return new Date(year, month, day);
    }

    async function handleCreateGoal() {
        openAddModal("goal");
    }

    return (
        <div className="pb-10 base-gray">
            <h1 className="font-bold base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-10">Dashboard</h1>
            {auth.user.type === 'premium' && <div className="base-gray sm:p-10 sm:pt-0 pt-0 md:ps-28 ">
                <MonthGraph dashboard={true} />
            </div>}
            <div className="flex flex-col lg:flex-row min-h-screen gap-5 justify-center items-start base-gray md:ps-28 sm:px-10">
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <div className="bg-white rounded-3xl shadow-md p-5 mt-5 md:mt-0">
                        <h1 className="color-purple text-2xl">Tus objetivos</h1>
                        {goals?.length === 0 ? 
                            <div className="flex justify-between items-center">
                                <p className="color-purple">No tienes objetivos aún</p> 
                                <GradientButton text="¡Crea uno!" className="base-gradient" onClick={() => handleCreateGoal()} />
                            </div>
                            : 
                            goals?.map((goal: any, index: number) => {
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