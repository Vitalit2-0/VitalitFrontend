import { Switch } from "@mui/material";
import { useModal } from "../components/shared/PopupAlert";
import React, { useEffect, useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { activate2fa } from "../services/AuthStateProvider";
import ModalQr from "../components/shared/Modal2fa";
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import ModalNotification from "../components/shared/ModalNotification"
import { NotificationService } from "../services/NotificationDataProvider";
import { toast } from "react-toastify";
import { CreateNotification } from "../services/ActivitiesServiceProvider";

function Settings() {
    const { openModal } = useModal();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const user = useAuthStore((state:any) => state.user);

    const [qr, setQr] = React.useState("");
    const [value2fa, setValue2fa] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [notificationsConfig, setNotificationsConfig] = React.useState([] as any);

    const [isChecked, setIsChecked] = React.useState(false);

    const [openDate, setOpenDate] = React.useState(false);
    const [activeSection, setActiveSection] = useState('');

    const handleOpen = (section: string) => {
        setActiveSection(section);
        setOpenDate(true);
    };

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        setValue2fa(user.ft_login === true);
    }, [])

    useEffect(() => {
        GetNotificationsConfig();
    }, [])

    const handleConfirm = async() => {
        let confirm = await openModal('Doble factor de autenticación', `¿Estás seguro de que deseas ${value2fa ? "des" : ""}activar el doble factor de autenticación?`)
        
        if(confirm && value2fa === false) 
        {
            const result = await activate2fa({username: user.username});
            console.log(result);
            if(!result.data) {
                toast.error('Error generando el código QR');
                CreateNotification(user.token, 'Error generando el código QR');
                return;
            }
            
            setQr(result.data);
            setOpen(true);
        }
        else if (confirm && value2fa) {
            //TODO: Desactivar 2fa
            setValue2fa(true);
        }

    }

    const GetNotificationsConfig = async() => {
        const notificationConfig = await NotificationService.getNotificationConfig(user.id, user.token);
        
        if(notificationConfig.data.length > 0) {
            setIsChecked(true);
            console.log(notificationConfig.data);
            setNotificationsConfig(notificationConfig.data);
        }
    }

    return (
        <div className="min-h-screen justify-center items-center base-gray pb-5 md:px-0">
            <h1 className="font-bold w-full base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-5">Perfil</h1>
            <div className="w-full flex justify-center items-center">
                <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-full p-5 md:px-10 md:mx-10 rounded-3xl shadow-md">
                    <div>
                        <div className="text-xl mt-5 mb-3 color-purple">Privacidad y seguridad</div>
                        <hr />
                        <div onClick={handleConfirm} className="mt-5 flex justify-between items-center pl-2 rounded-md hover:cursor-pointer h-12 hover:bg-gray-100"> 
                            <p className="">Doble factor de autenticación</p>
                            <Switch {...label} 
                                checked={value2fa}
                            />
                        </div>
                        {qr && <ModalQr qr={qr} open={open} username={user.username} setOpen={setOpen} isRegister={true} setValue2fa={setValue2fa} />}
                        <div className="flex justify-between items-center pl-2 rounded-md hover:cursor-pointer h-12 hover:bg-gray-100"> 
                            <p className="">Cambiar Contraseña</p>
                        </div>
                        <div className="text-xl mt-5 mb-3 color-purple">Notificaciones</div>
                        <hr />
                        <div className="flex justify-between items-center pl-2 rounded-md hover:cursor-pointer h-12 hover:bg-gray-100"> 
                                <p>Recibir notificaciones</p>
                                <Switch {...label} 
                                    checked={isChecked}
                                    onChange={handleChange}
                                />
                        </div>
                        {isChecked && (
                            <div className="mt-3 pl-5">
                                <div className="flex justify-between items-center mb-3">
                                    <p>Actividad Física</p>
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleOpen("Salud Fisica")}>
                                        <AlarmIcon />
                                    </IconButton>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <p>Salud mental</p>
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleOpen("Salud Mental")}>
                                        <AlarmIcon />
                                    </IconButton>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <p>Nutrición</p>
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleOpen("Nutricion")}>
                                        <AlarmIcon />
                                    </IconButton>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <p>Generales</p>
                                    <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleOpen("General")}>
                                        <AlarmIcon />
                                    </IconButton>
                                </div>
                            </div>
                        )}
                        <ModalNotification openDate={openDate} setOpenDate={setOpenDate} style={style} section={activeSection} notifications={notificationsConfig} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings