import { Box, Button, Modal, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { NotificationChecker } from '../../services/NotificationChecker';

function ModalNotification({ openDate, setOpenDate, style, section } : { openDate: boolean, setOpenDate: any, style: any, section: string}) {

    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");

    const getCheckboxLabel = () => {
        return `No quiero recibir notificaciones de la sección ${section}`;
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedDays([...selectedDays, event.target.value]);
        } else {
            setSelectedDays(selectedDays.filter((day: string) => day !== event.target.value));
        }
    };

    const handleTimeChange = (time: any) => {
        const localTime = new Date(time);
        const hours = localTime.getHours().toString().padStart(2, '0');
        const minutes = localTime.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setSelectedTime(formattedTime);
    };

    const handleSaveChanges = () => {
        let message = 'Cambios guardados correctamente!';

        if (selectedDays.length > 0) {
            message += ` Recibiras notificaciones los días: ${selectedDays.join(', ')}.`;
        }

        if (selectedTime) {
            message += ` A la hora: ${selectedTime}.`;
        }

        toast.success(message);

        const checker = new NotificationChecker();
        checker.checkNotification({ day: selectedDays, time: selectedTime, section });
    };

    //useEffect(() => {
    //    const checker = new NotificationChecker();
    //    checker.checkNotification({ day: selectedDays, time: selectedTime, section });
    //}, [selectedDays, selectedTime, section]);

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

                <p>Selecciona los días</p>

                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="Lunes"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Lunes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="Martes"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Martes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="Miércoles"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Miércoles"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="Jueves"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Jueves"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="Viernes"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Viernes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="Sábado"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Sábado"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="Domingo"
                            control={<Checkbox onChange={handleCheckboxChange}/>}
                            label="Domingo"
                            labelPlacement="top"
                        />
                    </FormGroup>
                </FormControl>

                <p>Selecciona la hora</p>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeClock ampm={false} onChange={handleTimeChange}/>
                </LocalizationProvider>

                <FormControl component="fieldset">
                        <FormControlLabel
                            value="no-notifications"
                            control={<Checkbox />}
                            label={getCheckboxLabel()}
                            labelPlacement="top"
                        />
                </FormControl>

                <Button onClick={handleSaveChanges}>Guardar cambios</Button>
            </Box>
        </Modal>
    )
}

export default ModalNotification