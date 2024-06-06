import { toast } from 'react-toastify';
import { NotificationService } from '../services/NotificationDataProvider';

export class NotificationChecker {
    private shownNotifications: { [key: string]: boolean } = {};
    private notificationsInterval: any;

    async checkNotification(user: User) {

        if(this.notificationsInterval)
        {
            clearInterval(this.notificationsInterval);
        }
            
        const config = await NotificationService.getNotificationConfig(user.id || "", user.token || "");

        if(!config.data) return;
        console.log("config:",config.data);
        const notifications = config.data;

        this.notificationsInterval = setInterval(async () => {
            console.log('Checking notifications...');
            const now = new Date();
            const dayMapping = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const currentDay = dayMapping[now.getDay()];
            const currentTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

            const currentNotification = notifications.find((n:NotificationModel) => n.notification_days.includes(currentDay) && n.notification_hour === currentTime);
            if (currentNotification) 
            {
                const notificationKey = `${currentDay}-${currentNotification.notification_type}`;

                if (!this.shownNotifications[notificationKey]) 
                {
                    const notifications = await NotificationService.getNotifications(user.token || "");
                    const notification = notifications.data.find((n: any) => n.notification_type === currentNotification.notification_type);
                    toast(`${notification.notification_title}: ${notification.notification_description}`);
                    this.shownNotifications[notificationKey] = true;
                }
                
            } 
            else if (currentTime === '00:00') 
            {
                this.shownNotifications = {};
            }
        }, 10000); // 10 seconds in milliseconds
        
    }

    stopCheckingNotifications() {
        clearInterval(this.notificationsInterval);
    }
}