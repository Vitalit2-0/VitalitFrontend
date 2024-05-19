import { toast } from 'react-toastify';
import { NotificationService } from '../services/NotificationDataProvider';

export class NotificationChecker {
    private shownNotifications: { [key: string]: boolean } = {};
    checkNotification(userParams: { day: string[], time: string, section: string }, userToken: string) {
        // Run every 10 seconds
        setInterval(async () => {
            const now = new Date();
            const dayMapping = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const currentDay = dayMapping[now.getDay()];
            const currentTime = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

            if (userParams.day.includes(currentDay) && userParams.time === currentTime) {
                // Check if the notification has already been shown today
                const notificationKey = `${currentDay}-${userParams.section}`;
                if (!this.shownNotifications[notificationKey]) {
                    //const notifications = await getNotificationContent();
                    const notifications = await NotificationService.getNotifications(userToken);
                    const notification = notifications.data.find((n: any) => n.notification_type === userParams.section);
                    toast(`${notification.notification_title}: ${notification.notification_description}`);
                    this.shownNotifications[notificationKey] = true;
                }
                
            } else if (currentTime === '00:00') {
                // Reset shown notifications at midnight
                this.shownNotifications = {};
            }
        }, 10000); // 10 seconds in milliseconds
    }
}