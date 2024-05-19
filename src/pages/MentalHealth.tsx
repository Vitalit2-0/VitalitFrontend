import { useState } from "react"
import Activity from "../components/pages/mentalHealth/Activity"
import { activities } from "../constants/mentalHealth"
import UserNotes from "../components/shared/UserNotes";

function MentalHealth() {

    const [sortedActivities, setSortedActivities] = useState({activities: activities, currentActivity: {} as any});

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

    return (
        <div className="flex flex-col min-h-screen gap-2 justify-start items-center base-gray">
            <div className="w-full p-0 sm:p-10 md:ps-28">
                <div className={`${sortedActivities.currentActivity.title ? "w-full h-auto" : "w-0 h-0"} overflow-hidden bg-white sm:rounded-3xl shadow-md transition-all duration-1000`}>
                    <Activity key={sortedActivities.activities.findIndex(act => act.active)} active={true} activity={sortedActivities.currentActivity} handleActivity={handleActivity} />
                </div>
                <h2 className={`${sortedActivities.currentActivity.title ? "h-16 mt-10" : "h-0"} overflow-hidden w-full text-2xl font-bold color-dark-cyan transition-all duration-1000`}>¡Prueba una actividad diferente!</h2>
                <div className={`flex-col lg:flex-row flex items-start w-full gap-10 relative`}>
                    <div className={`lg:w-1/2 flex flex-col gap-5 transition-all cursor-pointer`}>
                        {
                            Array.from(sortedActivities.activities).map((act, index) => {
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