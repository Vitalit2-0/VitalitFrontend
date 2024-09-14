import axios from 'axios';

export class NotificationService {
    static async getNotifications(token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('https://app-j462ku7pkq-uc.a.run.app/v1/notification', config);
        return response.data;
    }

    static async getNotificationConfig(id: string, token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get(`https://app-j462ku7pkq-uc.a.run.app/v1/notification/${id}`, config);
        return response.data;
    }

    static async saveNotification(token: string, notification: any) {
        console.log(notification);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('https://app-j462ku7pkq-uc.a.run.app/v1/notification', notification, config);
        return response.data;
    }
}   