import React from "react";
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";
import Goal from "../components/pages/dashboard/Goal";
import UserNotes from "../components/shared/UserNotes";
import WorkoutShortcut from "../components/pages/workout/WorkoutShortcut";
import Activity from "../components/pages/mentalHealth/Activity";
import { activities } from "../constants/mentalHealth";

function Home() {

    const auth = useAuthStore((state: any) => state);

    const [goals, setGoals] = React.useState([]);

    React.useEffect(() => {

        let skippedSurvey = localStorage.getItem("skipSurvey");

        console.log(auth.user)
        if(!auth.user.survey_answered && !skippedSurvey){
            setTimeout(() => {
                NavigationManager.navigateTo("/survey");
            }, 3000);
        }

        //TODO: Fetch goals from API
        const goals = JSON.parse(localStorage.getItem("goals") || "[]");
        setGoals(goals);
        console.log(goals)
    }, [])

    return (
        <div>
            <div className="flex flex-col lg:flex-row min-h-screen gap-5 justify-center items-start base-gray md:ps-28 sm:p-10">
                <div className="w-full lg:w-1/2 flex flex-col gap-5">
                    <div className="bg-white rounded-3xl shadow-md p-5">
                        <h1 className="color-purple text-2xl">Tus objetivos</h1>
                        {
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