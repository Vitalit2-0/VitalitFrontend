import { Notification } from '../entities/Notification';

export async function getNotificationContent(): Promise<Notification[]> {
    return [
        {
            section: "Actividad Física",
            title: "Notificación actividad física",
            message: "Recuerda hacer actividad física",
        },
        {
            section: "Salud mental",
            title: "Notificación salud mental",
            message: "Recuerda hacer actividad de salud mental",
        },
        {
            section: "Nutrición",
            title: "Notificación nutrición",
            message: "Recuerda hacer actividad nutrición",
        },
        {
            section: "Generales",
            title: "Notificación generales",
            message: "Recuerda hacer actividad generales",
        },
    ];
}