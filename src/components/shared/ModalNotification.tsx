import { Box, Button, Modal, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NotificationChecker } from '../../services/NotificationChecker';
import useAuthStore from '../../stores/AuthStore';
import { NotificationService } from '../../services/NotificationDataProvider';

function ModalNotification({ openDate, setOpenDate, style, section, notifications } : { openDate: boolean, setOpenDate: any, style: any, section: string, notifications: NotificationModel[] }) {

    const [selectedData, setSelectedData] = useState<{ [key: string]: { days: string[], time: string } }>({});
    const user: any = useAuthStore((state: any) => state.user);
    const checker = new NotificationChecker();

    useEffect(() => {
        console.log(notifications);
        console.log(section);
        const notification = notifications.find((notification: any) => notification.notification_type === section) || {notification_days: []};
        console.log(notification);
        setSelectedData({ ...selectedData, [section]: { ...selectedData[section], days: notification?.notification_days } });
    }, [notifications, section]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const days = selectedData[section]?.days || [];

        if (event.target.checked) 
        {
            setSelectedData({ ...selectedData, [section]: { ...selectedData[section], days: [...days, event.target.value] } });
        } 
        else 
        {
            setSelectedData({ ...selectedData, [section]: { ...selectedData[section], days: days.filter((day: string) => day !== event.target.value) } });
        }
    };

    const handleTimeChange = (time: any) => {
        const localTime = new Date(time);
        const hours = localTime.getHours().toString().padStart(2, '0');
        const minutes = localTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setSelectedData({ ...selectedData, [section]: { ...selectedData[section], time: formattedTime } });
    };

    const handleSaveChanges = async () => {

        const selectedDays = selectedData[section]?.days || [];
        const selectedTime = selectedData[section]?.time || "";
        let is_active = 0;

        if (selectedDays.length === 0 && !selectedTime) {
            toast.info(`No recibirás notificaciones para la sección ${section}.`);
            return;
        }

        if (selectedDays.length === 0) {
            toast.error('Selecciona al menos un día.');
            return;
        }

        if (!selectedTime) {
            toast.error('Selecciona una hora.');
            return;
        }

        if (selectedDays.length > 0 && selectedTime) {
            is_active = 1;
        }    

        let message = 'Cambios guardados correctamente!';

        if (selectedDays.length > 0 && selectedTime) {

            const notificaions = await NotificationService.getNotifications(user.token);
            const matchingNotification = notificaions.data.find((n: any) => n.notification_type === section);

            if (matchingNotification) {

                const notification =  {
                    notification_id: matchingNotification.notification_id,
                    notification_is_active: is_active,
                    notification_days: selectedDays,
                    notification_hour: selectedTime,
                }

                const response: any = await NotificationService.saveNotification(user.token, notification);
                
                if(response.data = 'ok') 
                {
                    message += ` Recibiras notificaciones los días: ${selectedDays.join(', ')}.`;
                    message += ` A la hora: ${selectedTime}.`;

                    toast.success(message);

                    checker.checkNotification(user);
                    setOpenDate(false);
                    return;
                }

                toast.error('Lo sentimos, ha ocurrido un error al guardar los cambios. Por favor intenta de nuevo');
            }
        }
    };

    return (
        <Modal
        open={openDate}
        onClose={() => setOpenDate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    ¿Cuándo quieres recibir tus notificaciones?
                </Typography>

                <p className="mt-3">Selecciona los días</p>

                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="Lunes"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="L"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Lunes')}
                        />
                        <FormControlLabel
                            value="Martes"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="M"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Martes')}
                        />
                        <FormControlLabel
                            value="Miércoles"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="M"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Miércoles')}
                        />
                        <FormControlLabel
                            value="Jueves"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="J"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Jueves')}
                        />
                        <FormControlLabel
                            value="Viernes"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="V"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Viernes')}
                        />
                        <FormControlLabel
                            value="Sábado"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="S"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Sábado')}
                        />
                        <FormControlLabel
                            value="Domingo"
                            control={<Checkbox onChange={handleCheckboxChange} style={{ padding: 3 }}/>}
                            label="D"
                            labelPlacement="top"
                            style={{ marginRight: 0 }} 
                            checked={selectedData[section]?.days?.includes('Domingo')}
                        />
                    </FormGroup>
                </FormControl>

                <p className="mt-3">Selecciona la hora</p>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeClock ampm={false} onChange={handleTimeChange}/>
                </LocalizationProvider>

                <Box style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button 
                        style={{ marginTop: 10, backgroundColor: 'purple'}} 
                        variant="contained" 
                        onClick={handleSaveChanges}
                    >
                        Guardar cambios
                    </Button>
                </Box>


            </Box>
        </Modal>
    )
}

export default ModalNotification