import { Box, Modal, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

function ModalNotification({ openDate, setOpenDate, style, section } : { openDate: boolean, setOpenDate: any, style: any, section: string}) {


    const getCheckboxLabel = () => {
        return `No quiero recibir notificaciones de la sección ${section}`;
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

                <p>Selecciona los días</p>

                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="lunes"
                            control={<Checkbox />}
                            label="Lunes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="martes"
                            control={<Checkbox />}
                            label="Martes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="miercoles"
                            control={<Checkbox />}
                            label="Miércoles"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="jueves"
                            control={<Checkbox />}
                            label="Jueves"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="viernes"
                            control={<Checkbox />}
                            label="Viernes"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="sabado"
                            control={<Checkbox />}
                            label="Sábado"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="domingo"
                            control={<Checkbox />}
                            label="Domingo"
                            labelPlacement="top"
                        />
                    </FormGroup>
                </FormControl>

                <p>Selecciona la hora</p>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeClock defaultValue={dayjs('2022-04-17T15:30')} ampm={false} />
                </LocalizationProvider>

                <FormControl component="fieldset">
                        <FormControlLabel
                            value="no-notifications"
                            control={<Checkbox />}
                            label={getCheckboxLabel()}
                            labelPlacement="top"
                        />
                </FormControl>
            </Box>
        </Modal>
    )
}

export default ModalNotification