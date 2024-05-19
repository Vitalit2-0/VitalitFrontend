import axios from 'axios';

export class NotificationService {
    static async getNotifications(token: string) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('https://app-wlimmpn7xa-uc.a.run.app/v1/notification', config);
        return response.data;
    }

    static async saveNotification(token: string, notification: any) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.post('https://app-wlimmpn7xa-uc.a.run.app/v1/notification', notification, config);
        return response.data;
    }
}   