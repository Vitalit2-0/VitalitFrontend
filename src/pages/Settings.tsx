import { Switch } from "@mui/material";
import { useModal } from "../components/PopupAlert";
import React, { useEffect } from "react";
import useAuthStore from "../stores/AuthStore";
import { activate2fa } from "../services/AuthStateProvider";
import ModalQr from "../components/ModalQr";

function Settings() {
    const { openModal } = useModal();
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const user = useAuthStore((state:any) => state.user);
    const { showNotification } = useModal();

    const [qr, setQr] = React.useState("");
    const [value2fa, setValue2fa] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setValue2fa(user.ft_login === false);
    }, [])

    const handleConfirm = async() => {
        let confirm = await openModal('Doble factor de autenticación', `¿Estás seguro de que deseas ${value2fa ? "des" : ""}activar el doble factor de autenticación?`)
        
        if(confirm && value2fa === false) 
        {
            const result = await activate2fa({username: user.username});

            if(!result.data) {
                showNotification('Error generando el código QR', 'error');
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

    return (
        <div className="flex flex-col h-screen gap-2 justify-center items-center base-gray">
            <div className="bg-white w-1/3 h-full p-10 m-10 rounded-3xl shadow-md">
                <p className="text-2xl color-purple font-bold">Ajustes</p>
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
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings