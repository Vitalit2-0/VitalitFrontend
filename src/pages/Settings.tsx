import { Box, Modal, Switch, Typography } from "@mui/material";
import { useModal } from "../components/shared/PopupAlert";
import React, { useEffect, useState } from "react";
import useAuthStore from "../stores/AuthStore";
import { SendRecoverMail, UpgradeUserPlan, VerifySession, activate2fa } from "../services/AuthStateProvider";
import ModalQr from "../components/shared/Modal2fa";
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import ModalNotification from "../components/shared/ModalNotification"
import { NotificationService } from "../services/NotificationDataProvider";
import { toast } from "react-toastify";
import { CreateNotification } from "../services/ActivitiesServiceProvider";
import { GrUpgrade } from "react-icons/gr";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FaStar } from "react-icons/fa";
import NavigationManager from "../services/NavigationManager";

function Settings() {
    const { openModal } = useModal();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const user = useAuthStore((state:any) => state.user);
    const auth = useAuthStore((state:any) => state);

    const [qr, setQr] = React.useState("");
    const [value2fa, setValue2fa] = React.useState(false);
    const [product, setProduct] = React.useState({} as {title: string, price: number, quantity: number});
    const [open, setOpen] = React.useState(false);
    const [notificationsConfig, setNotificationsConfig] = React.useState([] as any);
    const [openUpgradeModal, setOpenUpgradeModal] = React.useState(false);
    const [userPlan, setUserPlan] = React.useState(user.type);

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
        console.log(userPlan);
        setUserPlan(user.type)
    }, [auth])

    useEffect(() => {
        setValue2fa(user.ft_login === true);
    }, [])

    useEffect(() => {
        GetNotificationsConfig();
    }, [])

    useEffect(() => {
        VerifyUserSession();
    }, [])

    async function VerifyUserSession() {
        const authenticated = await VerifySession(auth.user.token);
        if(!authenticated)
        {
            auth.logout();
            NavigationManager.navigateTo("/login");
        }
    }

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

    const handlePassChange = async() => {
        let confirm = await openModal('Cambiar contraseña', `¿Estás seguro de que deseas cambiar tu contraseña?`)
        
        if(confirm)
        {
            console.log(user);
            const response = await SendRecoverMail(user.email);
            console.log(response);
            if(!response.data) {
                toast.error('Error enviando el correo de recuperación');
                CreateNotification(user.token, 'Error enviando el correo de recuperación');
                return;
            }

            toast.success('Hemos enviado un correo de recuperación a tu dirección de correo electrónico');
            CreateNotification(user.token, 'Hemos enviado un correo de recuperación a tu dirección de correo electrónico');
        }
    }

    const handleUpgrade = async() => {
        setOpenUpgradeModal(true);
    }

    const UpgradePlan = async({title, price, quantity} : {title: string, price: number, quantity: number}) => {
        setProduct({title, price, quantity});
    } 

    return (
        <div className="min-h-screen justify-center items-center base-gray pb-5 md:px-0">
            <Modal
                open={openUpgradeModal}
                onClose={() => setOpenUpgradeModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='flex justify-center items-start mt-10'
            >
                <Box className="base-white p-5 w-[580px] rounded-md">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        !Mejora tu plan Vitalit!
                    </Typography>
                    <Typography id="modal-modal-description" className='max-h-[60vh] overflow-scroll container-hide-bar' sx={{ mt: 2 }}>
                        <p className='mb-5'>¡Mejora tu plan Vitalit! y accede a todas las funcionalidades de la aplicación.</p>
                        <div onClick={() => UpgradePlan({title: "Plan premium Anual", price: 45000, quantity: 1})} className="w-full my-1 border border-solid text-center border-purple-300 rounded-lg p-5 cursor-pointer hover:bg-purple-100">
                            <div className="text-center mb-4">
                                <span className="text-green-500 bg-green-200 p-2 rounded-xl">Recomendado</span>
                            </div>
                            <p className="text-lg color-purple font-bold text-center">Plan Premium Anual</p>
                            <p className=""><strong>Precio anual:</strong> 45.000 COP</p>
                            <p className=""><strong>Precio:</strong> $45.000 COP</p>
                            <p className=""><strong>Duración:</strong> 365 días</p>
                        </div>
                        <div className="flex gap-1">
                            <div onClick={() => UpgradePlan({title: "Plan premium Mensual", price: 5000, quantity: 1})} className="w-full md:w-1/2 my-1 border border-solid text-center border-purple-300 rounded-lg p-5 cursor-pointer hover:bg-purple-100">
                                <p className="text-lg color-purple font-bold text-center">Plan Premium Mensual</p>
                                <p className=""><strong>Precio anual:</strong> 60.000 COP</p>
                                <p className=""><strong>Precio:</strong> $5.000 COP</p>
                                <p className=""><strong>Duración:</strong> 30 días</p>
                            </div>
                            <div onClick={() => UpgradePlan({title: "Plan premium Prueba", price: 0.25, quantity: 1})} className="w-full md:w-1/2 my-1 border border-solid text-center border-purple-300 rounded-lg p-5 cursor-pointer hover:bg-purple-100">
                                <p className="text-lg color-purple font-bold text-center">Solo una prueba</p>
                                <p className=""><strong>Precio:</strong> $1.000 COP</p>
                                <p className=""><strong>Duración:</strong> 1 día</p>
                            </div>
                        </div>
                    </Typography>
                    <div className='w-full flex gap-2 mt-8 justify-center'>
                        {product.title && <PayPalButtons 
                            createOrder={(_, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            description: product.title,
                                            amount: {
                                                value: product.price.toString(),
                                                currency_code: 'USD',
                                            },
                                        },
                                    ],
                                    intent: "CAPTURE"
                                })
                            }}
                            onApprove={ async (_, actions) => {
                                const order = await actions.order?.capture();
                                console.log(order);
                                if(order?.status === "COMPLETED") {
                                    toast.success('Pago exitoso, gracias por mejorar tu plan Vitalit!');
                                    CreateNotification(user.token, 'Pago exitoso, gracias por mejorar tu plan Vitalit!');

                                    const response = await UpgradeUserPlan(user);

                                    console.log(response);
                                    if(Number(response.code) === 200) auth.upgrade(user, "premium");
                                    setOpenUpgradeModal(false);
                                }
                            }}
                        />}
                    </div>
                </Box>
            </Modal>
            <h1 className="font-bold w-full base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-5">Ajustes</h1>
            <div className="w-full flex justify-center items-center">
                <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-full p-5 md:px-10 md:mx-10 rounded-3xl shadow-md">
                    <div>
                        <div className="text-xl mt-5 mb-3 color-purple">Cuenta</div>
                        <hr />
                        <div className="flex justify-between items-center pl-2 rounded-md h-12"> 
                            <div className="w-full flex justify-between items-center pr-3">
                                <p className="">Tipo de cuenta</p>
                                <div className="flex justify-between gap-2 items-center">
                                    <p>{userPlan.slice(0,1).toUpperCase() + userPlan.slice(1)}</p>
                                    {userPlan !== "premium" ? <GrUpgrade className="text-2xl color-purple cursor-pointer" onClick={handleUpgrade} /> :
                                        <FaStar className="text-2xl color-purple" />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="text-xl mt-5 mb-3 color-purple">Privacidad y seguridad</div>
                        <hr />
                        <div onClick={handleConfirm} className="mt-5 flex justify-between items-center pl-2 rounded-md hover:cursor-pointer h-12 hover:bg-gray-100"> 
                            <p className="">Doble factor de autenticación</p>
                            <Switch {...label} 
                                checked={value2fa}
                            />
                        </div>
                        {qr && <ModalQr qr={qr} open={open} username={user.username} setOpen={setOpen} isRegister={true} setValue2fa={setValue2fa} />}
                        <div onClick={handlePassChange} className="flex justify-between items-center pl-2 rounded-md hover:cursor-pointer h-12 hover:bg-gray-100"> 
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