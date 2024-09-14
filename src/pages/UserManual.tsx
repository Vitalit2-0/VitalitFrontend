import { useEffect, useState } from "react";
import HtmlRenderer from "../components/pages/blog/HtmlRenderer"
import { a2fa, goals, login, mental, notifications, nutrition, premium, profile, recover, register, workout } from "../constants/userManual";

function UserManual() {

    const [instructions, setInstructions] = useState<string>("");

    useEffect(() => {
        setInstructions(register)
    }, [])

    return (
        <div>
            <div className="pt-32 px-10 sm:px-20 flex flex-col-reverse lg:flex-row gap-10 items-start mx-auto justify-center" >
                <div className=" max-w-[780px]">
                    <HtmlRenderer htmlString={instructions} />
                </div>
                <div className="border border-gray-300 p-10 pt-5 rounded-md lg:sticky top-10 min-w-[314px] w-full lg:w-auto">
                    <p className="text-2xl font-bold">Índice</p>
                    <ol>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(register)}
                            >Registro de usuario
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(login)}
                            >Inicio de sesión
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(recover)}
                            >Recuperar contraseña
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(workout)}
                            >Rutinas de ejercicio físico
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(mental)}
                            >Rutinas de salud mental
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(nutrition)}
                            >Crear una receta personalizada
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(goals)}
                            >Crear objetivos
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(profile)}
                            >Editción de perfil
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(premium)}
                            >Pasarte a Vitalit Premium!
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(a2fa)}
                            >Activar doble autenticación
                            </a>
                        </li>
                        <li className="list-disc">
                            <a  
                                className="underline text-purple-500"
                                onClick={() => setInstructions(notifications)}
                            >Ajustar las notificaciones
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default UserManual