import { useEffect, useState } from "react";
import UserDataField from "../components/pages/survey/UserDataField"
import { Button } from "@mui/material";
import { useModal } from "../components/shared/PopupAlert";
import { FieldsValidator } from "../services/FieldsValidator";
import useAuthStore from "../stores/AuthStore";
import { translations } from "../services/TranslationsProvider";
import { calculateAge, calculateIMC } from "../services/FitCalcProvider";
import { getProfile, updateProfile } from "../services/ProfileController";
import { FaUser } from "react-icons/fa";
import { IoIosFemale, IoIosMale } from "react-icons/io";
import { CreateNotification, GetActivityHistory } from "../services/ActivitiesServiceProvider";
import { Create } from "../services/OpenAIService";
import { toast } from "react-toastify";
import { GetUserGoal, RegisterGoal } from "../services/GoalsServiceProvider";

function Profile() {
    const { openAddModal } = useModal()
    const user = useAuthStore((state:any) => state.user)
    
    const [editProfile, setEditProfile] = useState({disabled: true, text: "Editar perfil"})
    const [userData, setUserData] = useState<User>(user)
    const [goals, setGoals] = useState<any[]>([])
    const [activityHistory, setActivityHistory] = useState<any[]>([])

    const [lastUserData, setLastUserData] = useState(userData)

    useEffect(() => {
        getProfileData();
    }, [])

    useEffect(() => {
        getActivityHistory();
    }, [])

    useEffect(() => {
        getGoals();
    }, [])

    const getProfileData = async() => {
        const response = await getProfile(user.token, user.id);

        if(response.code !== "200")
        {
            toast.error(response.string);
            return;
        }
        
        const data = response.data;
        
        setUserData({...user, ...data})
        setLastUserData({...user, ...data});
    }

    const getGoals = async() => {
        const goals = await GetUserGoal(user.token, user.id);
        setGoals(goals.data.data);
    }

    const getActivityHistory = async() => {
        const response = await GetActivityHistory(user.token);
        
        if(response.code !== "200")
        {
            toast.error(response.string);
            return;
        }
        
        setActivityHistory(response.data.sort((a:any, b:any) => {
            const dateA = new Date(a.activity_date.split('/').reverse().join('/'));
            const dateB = new Date(b.activity_date.split('/').reverse().join('/'));
            const timeA = new Date(`1970/01/01 ${a.activity_hour}`);
            const timeB = new Date(`1970/01/01 ${b.activity_hour}`);
            const dateTimeA = new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDate(), timeA.getHours(), timeA.getMinutes());
            const dateTimeB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate(), timeB.getHours(), timeB.getMinutes());
            return dateTimeB.getTime() - dateTimeA.getTime();
        }));
    }

    const handleEditProfile = () => {
        setEditProfile({disabled: !editProfile.disabled, text: editProfile.disabled ? "Guardar cambios" : "Editar perfil"})
    }

    const handleSubmitChanges = async(e: any) => {
        e.preventDefault()
        
        if(JSON.stringify(userData) === JSON.stringify(lastUserData))
        {
            handleEditProfile();
            return;
        }   

        if (!validateUser()) return;

        handleEditProfile();
    
        const data = {
            ...userData, 
            imc: calculateIMC(Number(userData.weight), Number(userData.height)),
            age: calculateAge(userData.born_date),
            weight: Number(userData.weight),
            height: Number(userData.height),
            ft_login: user.ft_login ? 1 : 0,
            survey_answered: user.survey_answered
        }

        const reponse = await updateProfile(data, user.token)

        if(reponse.code !== "200")
        {
            toast.error(reponse.string);
            return;
        }

        toast.success("Perfil actualizado correctamente");
        CreateNotification(user.token, "Perfil actualizado correctamente");
        setUserData({...user, ...data})
        setLastUserData({...user, ...data});
    }

    function validateUser() : boolean {
        
        if(editProfile.disabled) return true;

        for (const field of Object.entries(userData)) {
            const isValid = FieldsValidator.validateField(field[0], field[1] as string);

            if (!isValid) {
                toast.error(`El campo ${translations[field[0] as keyof typeof translations]} no es válido${field[0] === "bornDate" ? ", debes ser mayor de edad" : ""}`);
                return false;
            }
        }
        
        return true;
    }

    const handlePhotoChange = () => {
        if(editProfile.disabled) return;

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.click();

        fileInput.addEventListener("change", (e) => {
            const file = (e.target as HTMLInputElement).files?.item(0);

            if (!file) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setUserData({...userData, photo: reader.result as string});
            }
        })
    }

    const handleAdd = async(type: string) => {
        const response = await openAddModal(type);
        
        if(response.confirm) {
            const createGoal = {
                type: "goal",
                description: response.description
            }
            
            console.log(createGoal);
            const goal = await Create(createGoal, user);

            //TODO: Add goal to user in service. Service not implemented yet
            if(goal.data)
            {
                const response = await RegisterGoal(user.token, goal.data);
                
                if(response.code === "200")
                {
                    toast.success("Objetivo añadido correctamente");
                    CreateNotification(user.token, "Objetivo añadido correctamente");
                    return;
                }

                toast.error("Error al añadir el objetivo");
                CreateNotification(user.token, "Error al añadir el objetivo");
            }

            toast.success("Objetivo añadido correctamente");
            CreateNotification(user.token, "Objetivo añadido correctamente");
        }
    }

    return (
        <div className="base-gray min-h-screen">
            <h1 className="font-bold w-full base-gray color-dark-cyan text-4xl pl-5 sm:pl-10 pb-10 md:pl-28 pt-10 sm:pb-10">Perfil</h1>
            <div className="md:ml-16 flex flex-col md:flex-row sm:px-5 pb-5 lg:px-10 gap-5">
                <div className="md:w-1/2 xl:w-1/3">
                    <div className="bg-white h-[660px] w-full rounded-3xl shadow-md sticky top-10">
                        <div className="w-full p-10 pt-5 flex flex-col items-center sticky">
                            <div className="flex">
                                <div className="w-1/3">
                                    <div className={`m-auto w-28 h-28 bg-gray-200 rounded-full border-solid ${!editProfile.disabled ? "hover:cursor-pointer" : ""}`} onClick={handlePhotoChange}>
                                        {userData.photo ? <img className="rounded-full" src={userData.photo ? userData.photo : "assets/user.png"} alt="" /> :
                                            <div className="h-full flex items-center justify-center">
                                                <FaUser size={56} className="m-auto" />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-2/3 ml-5">
                                    <h2 className="font-bold ml-3 mt-5 text-xl">{`${user.name ? user.name : ""} ${user.lastname ? user.lastname : ""}`}</h2>
                                    <div className="flex items-center color-purple">
                                        <UserDataField 
                                            title="" 
                                            value={userData.username ? userData.username : ""} 
                                            disabled={editProfile.disabled} 
                                            handleValueChange={setUserData}
                                            field="username"
                                            type="text"
                                        />
                                        <div>
                                            {editProfile.disabled ? (userData.gender === "M" ? <IoIosMale size={30} /> : <IoIosFemale size={30} />) : 
                                                <div className="flex">
                                                    <div>
                                                        <IoIosMale size={30} className={`${userData.gender === "M" ? "base-purple text-white" : ""} p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer`} onClick={() => setUserData({...userData, gender: "M"})}/>
                                                    </div>
                                                    <div>
                                                        <IoIosFemale size={30} className={`${userData.gender === "F" ? "base-purple text-white" : ""} p-1 rounded-md hover:bg-gray-200 hover:cursor-pointer`} onClick={() => setUserData({...userData, gender: "F"})} />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form className="w-full mt-5" onSubmit={handleSubmitChanges}>
                                <hr />
                                <UserDataField 
                                    title="Email" 
                                    value={userData.email ? userData.email : ""} 
                                    disabled={editProfile.disabled} 
                                    handleValueChange={setUserData}
                                    field="email"
                                    type="text"
                                /><hr />
                                <UserDataField 
                                    title="Altura (cm)" 
                                    value={userData.height ? userData.height.toString() : ""} 
                                    disabled={editProfile.disabled} 
                                    type="number" 
                                    handleValueChange={setUserData}
                                    field="height"
                                /><hr />
                                <UserDataField 
                                    title="Peso (kg)" 
                                    value={userData.weight ? userData.weight.toString() : ""} 
                                    type="number" 
                                    disabled={editProfile.disabled} 
                                    handleValueChange={setUserData}
                                    field="weight"
                                /><hr />
                                <UserDataField 
                                    title="IMC" 
                                    value="23.1" 
                                    type="number" 
                                    disabled={true} 
                                    field="imc"
                                /><hr />
                                <UserDataField 
                                    title="Edad" 
                                    value="23" 
                                    type="number" 
                                    disabled={true} 
                                    field="age"
                                />
                                <UserDataField 
                                    title="Cumpleaños" 
                                    value={userData.born_date} 
                                    disabled={editProfile.disabled} 
                                    handleValueChange={setUserData}
                                    field="bornDate"
                                    type="date"
                                />
                                <Button className="base-purple w-full mt-5 color-white" type="submit" >{editProfile.text}</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 xl:w-2/3 flex flex-col">
                    <div className="w-full flex flex-col lg:flex-row gap-2">
                        <div className="lg:w-1/2 relative">
                        <div className="w-8 h-8 flex items-center justify-center absolute top-5 right-5 base-gradient text-white rounded-lg font-bold text-2xl cursor-pointer" onClick={() => handleAdd("objetivo")}>+</div>
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">{goals.length}</p>
                                <p className="mt-2">Objetivo{goals.length > 1 ? "s" : ""} establecido{goals.length > 1 ? "s" : ""}</p>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">{activityHistory.length}</p>
                                <p className="mt-2">Actividades completadas</p>
                            </div>
                        </div>
                        {/* <div className="lg:w-1/3">
                            <div className="bg-white shadow-md rounded-3xl p-5">
                                <p className="color-purple text-6xl">5</p>
                                <p className="mt-2">Objetivos establecidos</p>
                            </div>
                        </div> */}
                    </div>
                    <div className="bg-white shadow-md rounded-3xl p-5 mt-5 h-full overflow-y-auto">
                        <h2 className="text-xl color-purple">Historial de actividad</h2>
                        <hr className="mt-5"/>
                        {activityHistory.length === 0 ? <div className="flex justify-center items-center min-h-16 h-full">No hay actividad hasta el momento</div> :
                            <div>
                                {
                                    Array.from(activityHistory).reverse().map((activity: any, i:number) => {
                                        return (
                                            <div className={`flex items-center min-h-16 gap-3 px-5 py-2 ${i%2===0 ? "bg-gray-100" : "bg-white"}`}>
                                                <p className="w-32 text-left">{activity.activity_date}</p>
                                                <p className="text-left w-full">{activity.activity_detail}</p>
                                                <p className="w-16 text-right">{activity.activity_hour}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile