import { toast } from 'react-toastify';
import { getNotificationContent } from './NotificationDataProvider';

export class NotificationChecker {
    checkNotification(userParams: { day: string[], time: string, section: string }) {
        // Run every 30 minutes
        setInterval(async () => {
            const now = new Date();
            const dayMapping = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const currentDay = dayMapping[now.getDay()];
            const currentTime = now.getHours().toString() + ":" + now.getMinutes().toString();

            if (userParams.day.includes(currentDay) && userParams.time === currentTime) {
                const notifications = await getNotificationContent();
                const notification = notifications.find(n => n.section === userParams.section);
                if (notification) {
                    // Display notification using react-toastify
                    toast(`${notification.title}: ${notification.message}`);
                }
            }
        }, 10000); // 30 minutes in milliseconds
    }
}