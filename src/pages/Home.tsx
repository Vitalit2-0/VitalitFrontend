import React from "react";
import useAuthStore from "../stores/AuthStore";
import NavigationManager from "../services/NavigationManager";
import { NotificationChecker } from "../services/NotificationChecker";

function Home() {

    const auth = useAuthStore((state: any) => state);
    const checker = new NotificationChecker();

    React.useEffect(() => {

        let skippedSurvey = localStorage.getItem("skipSurvey");

        console.log(auth.user)
        if(!auth.user.survey_answered && !skippedSurvey){
            setTimeout(() => {
                NavigationManager.navigateTo("/survey");
            }, 3000);
        }

        const notificationsListenerStarted = localStorage.getItem('notificationsListenerStarted');

        if (!notificationsListenerStarted) {
            localStorage.setItem('notificationsListenerStarted', 'true');
            console.log('Starting notifications listener');
            const notificationConfig = JSON.parse(localStorage.getItem('notificationConfig') || '[]');
            
            Array.from(notificationConfig).forEach((n: any) => {
                if (n.is_active === 1) {
                    checker.checkNotification({ day: n.days, time: n.time, section: n.section }, auth.user.token);
                }
            });
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