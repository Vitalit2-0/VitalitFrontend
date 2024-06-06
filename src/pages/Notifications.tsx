import { useEffect, useState } from "react"
import { GetHistory } from "../services/ActivitiesServiceProvider";
import useAuthStore from "../stores/AuthStore";


function Notifications() {

    const user = useAuthStore((state: any) => state.user);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        GetNotifications();
    }, [])

    const GetNotifications = async() => {
        const response = await GetHistory(user.token, 'notification');

        if(response.data.data)
        {
            console.log(response.data.data);
            setNotifications(response.data.data.sort((a:any, b:any) => {
                const dateA = new Date(a.activity_date.split('/').reverse().join('/'));
                const dateB = new Date(b.activity_date.split('/').reverse().join('/'));
                const timeA = new Date(`1970/01/01 ${a.activity_hour}`);
                const timeB = new Date(`1970/01/01 ${b.activity_hour}`);
                const dateTimeA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate(), timeA.getHours(), timeA.getMinutes());
                const dateTimeB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate(), timeB.getHours(), timeB.getMinutes());
                return dateTimeB.getTime() - dateTimeA.getTime();
            }));
        }
    }

    return (
        <div className="base-gray min-h-screen md:ps-28 sm:p-10">
            <h1 className="font-bold w-full base-gray color-dark-cyan text-4xl pt-10 sm:pt-0 pl-5 sm:pl-0 pb-10 sm:pb-10">Notificaciones</h1>
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col items-center justify-center max-h-[80vh] overflow-auto">
                {
                    notifications.length > 0 ?
                    Array.from(notifications).map((notification: any, index: number) => {
                        return (
                            <div key={index} className="w-full flex flex-col sm:gap-4 sm:flex-row items-center justify-between border border-solid border-gray-200 my-2 py-5 px-5 rounded-lg">
                                <p className="w-full text-left font-bold">{notification.activity_date}</p>
                                <p className="w-full text-left sm:text-center">{notification.activity_detail}</p>
                                <p className="w-full text-right font-bold">{notification.activity_hour}</p>
                            </div>
                        )
                    })
                    : <p>Aún no tienes notificaciones</p>
                }
            </div>
        </div>
    )
}

export default Notifications