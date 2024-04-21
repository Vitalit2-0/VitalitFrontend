import React from "react";
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";

function Home() {

    const auth = useAuthStore((state: any) => state);

    React.useEffect(() => {

        let skippedSurvey = localStorage.getItem("skipSurvey");

        if(!auth.user.hasAnsweredSurvey && !skippedSurvey){
            setTimeout(() => {
                NavigationManager.navigateTo("/survey");
            }, 3000);
        }
    }, [])

    return (
        <div>
            <div className="flex flex-col h-screen gap-2 justify-center items-center base-gray">
                <p>Dashboard</p>
            </div>
        </div>
    )
}

export default Home